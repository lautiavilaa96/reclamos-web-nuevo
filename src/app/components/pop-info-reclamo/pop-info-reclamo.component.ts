import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ArtefactosModalComponent } from '../artefactos-modal/artefactos-modal.component';

export interface DialogReclamoData {
    titulo: string;
    subtitulo: string;
    items: { texto: string; tieneHtml?: boolean }[];
}

@Component({
    selector: 'app-pop-info-reclamo',
    templateUrl: './pop-info-reclamo.component.html',
    styleUrls: ['./pop-info-reclamo.component.css']
})
export class PopInfoReclamoComponent {
    constructor(
        public dialogRef: MatDialogRef<PopInfoReclamoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogReclamoData,
        private dialog: MatDialog
    ) {}
    
    abrirModalArtefactos(): void {
        const artefactosRef = this.dialog.open(ArtefactosModalComponent, {
            width: '100vw',
            maxWidth: '550px',
            maxHeight: '90vh',
            panelClass: 'responsive-dialog'
        });
        
        artefactosRef.afterClosed().subscribe((resultadoTexto) => {
            if (resultadoTexto) {
                // Cierra el popup informativo pasando el texto capturado
                this.dialogRef.close(resultadoTexto);
            }
        });
    }
    
    cerrar(): void {
        this.dialogRef.close(null);
    }
}