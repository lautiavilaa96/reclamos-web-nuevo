import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopInfoReclamoComponent, DialogReclamoData } from '../../pop-info-reclamo/pop-info-reclamo.component';
import { CheckboxService } from '../../../services/checkbox.service';
import { PopResarcimientoComponent } from '../pop-resarcimiento/pop-resarcimiento.component';

@Component({
    selector: 'app-resarcimiento',
    templateUrl: './resarcimiento.component.html',
    styleUrls: ['./resarcimiento.component.css']
})
export class ResarcimientoComponent implements OnInit {
    
    @Input() errorFacturacion: boolean = false;
    @Input() fraude: boolean = false;
    @Input() resarcimiento: boolean = false;
    @Input() suspencionSuministro: boolean = false;
    @Input() malaAtencionComercial: boolean = false;
    @Input() negativaConexion: boolean = false;
    @Input() inconvenienteTension: boolean = false;
    @Input() facturaFueraDeTermino: boolean = false;
    
    @Output() checkboxChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() artefactosCargados: EventEmitter<string> = new EventEmitter<string>();
    
    constructor(public dialog: MatDialog, private checkboxService: CheckboxService) { }
    
    ngOnInit(): void {
        this.actualizarEstadoCheckbox();
    }
    
    checkboxChanged(checkboxName: string, event: any) {
        const isChecked = event.target.checked;
        this.checkboxChange.emit({ [checkboxName]: isChecked });
        this.actualizarEstadoCheckbox();
        
        if (isChecked) {
            this.abrirPopupPorTipo(checkboxName);
        }
    }
    
    private actualizarEstadoCheckbox() {
        this.checkboxService.setCheckboxState(
            this.errorFacturacion ||
            this.fraude ||
            this.resarcimiento ||
            this.suspencionSuministro ||
            this.malaAtencionComercial ||
            this.negativaConexion ||
            this.inconvenienteTension ||
            this.facturaFueraDeTermino
        );
    }
    
    abrirPopupPorTipo(tipo: string) {
        let data: DialogReclamoData | null = null;
        
        switch (tipo) {
            case 'errorFacturacion':
                data = {
                    titulo: 'Errores de Facturación',
                    subtitulo: 'Primero debés reclamar ante tu distribuidora eléctrica. Si ya lo hiciste, adjuntá:',
                    items: [
                        { texto: 'Constancia del reclamo original.' },
                        { texto: 'Factura del servicio a reclamar.' },
                        { texto: 'Detalle de artefactos eléctricos y sus horas de uso diario.', tieneHtml: true },
                        { texto: 'Foto del medidor.' }
                    ]
                };
                break;
                
            case 'fraude':
                data = {
                    titulo: 'Fraude',
                    subtitulo: 'Primero debés hacer el reclamo ante tu distribuidora eléctrica. Si ya lo hiciste, adjuntá:',
                    items: [
                        { texto: 'Constancia del reclamo original.' },
                        { texto: 'Factura o liquidación reclamada.' },
                        { texto: 'Detalle de artefactos eléctricos y sus horas de uso diario.', tieneHtml: true },
                        { texto: 'Acta de constatación y otros antecedentes.' }
                    ]
                };
                break;

            case 'suspencionSuministro': 
                data = {
                    titulo: 'Suspensión del Suministro',
                    subtitulo: 'Recordá que primero debés comunicarte con tu distribuidora eléctrica para que envíen una cuadrilla a tu domicilio. Si la suspensión NO se debió a cuestiones técnicas y resultó indebida, adjuntá:',
                    items: [
                        { texto: 'Factura del suministro.' },
                        { texto: 'Reclamo previo ante la Distribuidora.' },
                        { texto: 'Demás antecedentes que tengas de tu reclamo.' }
                    ]
                };
                break;
                
            case 'malaAtencionComercial':
                data = {
                    titulo: 'Mala Atención Comercial',
                    subtitulo: 'Ante problemas con facturas o pagos, primero debés reclamar ante tu distribuidora. Si ya lo hiciste, adjuntá:',
                    items: [
                        { texto: 'Factura de suministro.' },
                        { texto: 'Constancia o antecedentes de tu reclamo.' }
                    ]
                };
                break;
                
            case 'negativaConexion':
                data = {
                    titulo: 'Negativa en la Conexión',
                    subtitulo: 'Te sugerimos reclamar primero ante tu distribuidora. Si ya lo hiciste, adjuntá:',
                    items: [
                        { texto: 'Escritura, boleto o certificación que acredite la tenencia legal del inmueble.' },
                        { texto: 'Certificado de domicilio municipal (si es un loteo en desarrollo).' },
                        { texto: 'Datos de un vecino cercano con servicio (opcional, para ayudar a ubicarnos).' }
                    ]
                };
                break;
                
            case 'inconvenienteTension':
                data = {
                    titulo: 'Problemas de Tensión o Cortes',
                    subtitulo: 'Frente a cortes o baja tensión, primero comunicate con tu distribuidora para que envíen una cuadrilla. Si el problema persiste, adjuntá:',
                    items: [
                        { texto: 'Factura de suministro.' },
                        { texto: 'Detalle de tu reclamo previo ante la distribuidora.' }
                    ]
                };
                break;
        }
        
        if (data) {
            const dialogRef = this.dialog.open(PopInfoReclamoComponent, {
                width: '90vw',
                maxWidth: '480px',
                data: data
            });
            
            dialogRef.afterClosed().subscribe((textoArtefactos: string | null) => {
                if (textoArtefactos) {
                    this.artefactosCargados.emit(textoArtefactos);
                }
            });
        }
    }
    
    openDialog() {
        const dialogRef = this.dialog.open(PopResarcimientoComponent, {
            disableClose: true,
            width: '95vw',
            maxWidth: '600px',
            maxHeight: '90vh',
            panelClass: 'resarcimiento-dialog-panel'
        });
        
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // Lógica tras cerrar si corresponde
            }
        });
    }
}