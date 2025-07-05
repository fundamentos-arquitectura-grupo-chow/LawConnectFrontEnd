import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentsService } from '../../services/documents.service';
import { SendDocument } from '../../model/send-document';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, take } from 'rxjs/operators';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent implements OnInit {
  documentForm!: FormGroup;
  isSubmitting: boolean = false;
  submitError: string = '';
  formSubmitted = false;

  documentTypes = [
    {value: 0, label: 'ACUERDO'},
    {value: 1, label: 'ACUERDO_DE_CONSEJO_DIRECTIVO'},
    {value: 2, label: 'CASACION'},
    {value: 3, label: 'CONTRATO'},
    {value: 4, label: 'CONVENIO'},
    {value: 5, label: 'DECISION'},
    {value: 6, label: 'DECRETO_DE_URGENCIA'},
    {value: 7, label: 'DECRETO_LEGISLATIVO'},
    {value: 8, label: 'DECRETO_LEY'},
    {value: 9, label: 'DECRETO_SUPREMO'},
    {value: 10, label: 'DIRECTIVA'},
    {value: 11, label: 'EXPEDIENTE'},
    {value: 12, label: 'RESOLUCION'},
    {value: 13, label: 'RESOLUCION_ADMINISTRATIVA'},
    {value: 14, label: 'RESOLUCION_DE_CONSEJO_DIRECTIVO'},
    {value: 15, label: 'RESOLUCION_DE_CONTRALORIA'},
    {value: 16, label: 'RESOLUCION_DE_GERENCIA'},
    {value: 17, label: 'RESOLUCION_DE_GERENCIA_GENERAL'},
    {value: 18, label: 'RESOLUCION_DE_PRESIDENCIA'},
    {value: 19, label: 'RESOLUCION_DE_PRESIDENCIA_DEL_CONSEJO_DIRECTIVO'},
    {value: 20, label: 'RESOLUCION_DE_PRESIDENCIA_EJECUTIVA'},
    {value: 21, label: 'RESOLUCION_DE_SECRETARIA_EJECUTIVA'},
    {value: 22, label: 'RESOLUCION_DE_SUPERINTENDENCIA'},
    {value: 23, label: 'RESOLUCION_DIRECTORAL'},
    {value: 24, label: 'RESOLUCION_JEFATURAL'},
    {value: 25, label: 'RESOLUCION_MINISTERIAL'},
    {value: 26, label: 'RESOLUCION_SUPREMA'}
  ];

  constructor(
    private dialogRef: MatDialogRef<AddDocumentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { legalCaseId: number },
    private documentsService: DocumentsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.documentForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      type: [0, Validators.required]
    });

    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick().subscribe(() => {
      if (!this.isSubmitting) {
        this.dialogRef.close('cancel');
      }
    });
  }

  accept() {
    if (this.isSubmitting || this.documentForm.invalid || this.formSubmitted) {
      this.documentForm.markAllAsTouched();
      return;
    }

    this.formSubmitted = true;
    this.isSubmitting = true;
    this.submitError = '';

    const formValues = this.documentForm.value;
    const document = new SendDocument(
      formValues.title,
      formValues.description,
      formValues.type,
      1, // Status: PENDING (1 según backend)
      this.data.legalCaseId
    );

    // Usar timeout para asegurar que no se cierra demasiado rápido el diálogo
    this.documentsService.addDocumentItem(document)
      .pipe(
        take(1),
        finalize(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Documento creado exitosamente:', response);
          // Usar setTimeout para evitar que el diálogo se cierre antes de que termine la animación
          setTimeout(() => {
            this.dialogRef.close('confirm');
          }, 300);
        },
        error: (error) => {
          this.formSubmitted = false;
          this.submitError = 'Error al guardar el documento. Inténtelo de nuevo.';
          console.error('Error al crear documento:', error);
        }
      });
  }

  cancel() {
    if (!this.isSubmitting) {
      this.dialogRef.close('cancel');
    }
  }
}
