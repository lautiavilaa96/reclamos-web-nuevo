    import { Component, OnInit } from '@angular/core';
    import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
    import { MatDialogRef } from '@angular/material/dialog';
    
    @Component({
        selector: 'app-artefactos-modal',
        templateUrl: './artefactos-modal.component.html',
        styleUrls: ['./artefactos-modal.component.css']
    })
    export class ArtefactosModalComponent implements OnInit {
        artefactosForm!: FormGroup;
        
        listaBase: string[] = [
            'Heladera', 'Freezer', 'Lavarropas', 'Secarropas', 
            'Bomba de agua', 'Microondas', 'Televisor', 'Computadora', 
            'Aire acondicionado', 'Caloventor', 'Horno eléctrico', 
            'Estufa de cuarzo', 'Termotanque eléctrico', 'Calefón eléctrico', 'Calefón ducha'
        ];
        
        constructor(
            private fb: FormBuilder,
            private dialogRef: MatDialogRef<ArtefactosModalComponent>
        ) {}
        
        ngOnInit(): void {
            this.artefactosForm = this.fb.group({
                items: this.fb.array(this.listaBase.map(nombre => this.crearGrupoArtefacto(nombre))),
                otros: this.fb.array([
                    this.crearGrupoArtefacto(''),
                    this.crearGrupoArtefacto('')
                ])
            });
        }
        
        crearGrupoArtefacto(nombre: string): FormGroup {
            return this.fb.group({
                nombre: [nombre],
                cantidad: [''],
                horas: ['']
            });
        }
        
        get items(): FormArray {
            return this.artefactosForm.get('items') as FormArray;
        }
        
        get otros(): FormArray {
            return this.artefactosForm.get('otros') as FormArray;
        }
        
        guardar(): void {
            const values = this.artefactosForm.value;
            let itemsTexto = '';
            let contador = 0;
            
            const procesarLista = (list: any[]) => {
                list.forEach(item => {
                    if (item.nombre && item.cantidad && item.horas) {
                        contador++;
                        itemsTexto += `Artefacto: ${item.nombre}\nCantidad: ${item.cantidad}\nHoras de uso por día: ${item.horas}\n\n`;
                    }
                });
            };
            
            procesarLista(values.items);
            procesarLista(values.otros);
            
            if (contador === 0) {
                this.dialogRef.close(null);
            } else {
                // Se coloca la cabecera y espacio en blanco arriba de todo
                const textoResultado = 
                `DETALLE SU RECLAMO:
                
                
                
                
                
                
                
        Artefactos eléctricos:
        _______________________
        ${itemsTexto.trim()}`;
                
                this.dialogRef.close(textoResultado);
            }
        }
        
        cancelar(): void {
            this.dialogRef.close(null);
        }
    }