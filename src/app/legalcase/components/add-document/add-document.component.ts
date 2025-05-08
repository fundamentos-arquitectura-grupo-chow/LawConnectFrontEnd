import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentsService } from '../../services/documents.service';
import { SendDocument } from '../../model/send-document';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent {
  title: string = '';
  description: string = '';
  type: number = 0; // Default type
  status: number = 1; // Default status
  isSubmitting: boolean = false; // Flag to prevent multiple submissions

  documentTypes = [
    { value: 0, label: 'ACUERDO' },
    { value: 1, label: 'ACUERDO_DE_CONSEJO_DIRECTIVO' },
    { value: 2, label: 'CASACION' },
    { value: 3, label: 'CONTRATO' },
    { value: 4, label: 'CONVENIO' },
    { value: 5, label: 'DECISION' },
    { value: 6, label: 'DECRETO_DE_URGENCIA' },
    { value: 7, label: 'DECRETO_LEGISLATIVO' },
    { value: 8, label: 'DECRETO_LEY' },
    { value: 9, label: 'DECRETO_SUPREMO' },
    { value: 10, label: 'DIRECTIVA' },
    { value: 11, label: 'EXPEDIENTE' },
    { value: 12, label: 'RESOLUCION' },
    { value: 13, label: 'RESOLUCION_ADMINISTRATIVA' },
    { value: 14, label: 'RESOLUCION_DE_CONSEJO_DIRECTIVO' },
    { value: 15, label: 'RESOLUCION_DE_CONTRALORIA' },
    { value: 16, label: 'RESOLUCION_DE_GERENCIA' },
    { value: 17, label: 'RESOLUCION_DE_GERENCIA_GENERAL' },
    { value: 18, label: 'RESOLUCION_DE_PRESIDENCIA' },
    { value: 19, label: 'RESOLUCION_DE_PRESIDENCIA_DEL_CONSEJO_DIRECTIVO' },
    { value: 20, label: 'RESOLUCION_DE_PRESIDENCIA_EJECUTIVA' },
    { value: 21, label: 'RESOLUCION_DE_SECRETARIA_EJECUTIVA' },
    { value: 22, label: 'RESOLUCION_DE_SUPERINTENDENCIA' },
    { value: 23, label: 'RESOLUCION_DIRECTORAL' },
    { value: 24, label: 'RESOLUCION_JEFATURAL' },
    { value: 25, label: 'RESOLUCION_MINISTERIAL' },
    { value: 26, label: 'RESOLUCION_SUPREMA' }
  ];

  constructor(
    private dialogRef: MatDialogRef<AddDocumentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { legalCaseId: number },
    private documentsService: DocumentsService
  ) {}

  accept() {
    if (this.isSubmitting) {
      return;
    }
    this.isSubmitting = true;
    const document = new SendDocument(this.title, this.description, this.type, this.status, this.data.legalCaseId);
    this.documentsService.addDocumentItem(document).subscribe(() => {
      this.isSubmitting = false;
    }, () => {
      this.isSubmitting = false;
    });
    this.dialogRef.close('confirm');
  }

  cancel() {
    this.dialogRef.close('cancel');
  }
}
