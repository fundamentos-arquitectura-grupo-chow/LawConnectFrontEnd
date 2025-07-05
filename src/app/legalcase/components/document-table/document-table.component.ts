import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocumentsService } from '../../services/documents.service';
import { SendDocument } from '../../model/send-document';
import { take } from 'rxjs/operators';
import { DocumentStatus } from '../../model/document-status';

@Component({
  selector: 'app-document-table',
  templateUrl: './document-table.component.html',
  styleUrls: ['./document-table.component.css']
})
export class DocumentTableComponent implements OnInit {
  @Input() legalCaseId!: number;
  @Input() showUploadButton: boolean = false;
  @Input() canUpdateStatus: boolean = false; // Nuevo input para controlar acciones
  @Output() uploadClick = new EventEmitter<void>();

  documents: any[] = [];
  pagedDocuments: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  isUpdatingStatus: boolean = false;
  DocumentStatus = DocumentStatus;
  lastUpdatedDocumentId: number | null = null;

  constructor(private documentsService: DocumentsService) {}

  ngOnInit() {
    this.loadDocuments();
  }

  loadDocuments() {
    if (!this.legalCaseId) {
      console.error('No se proporcionó legalCaseId');
      return;
    }

    this.documentsService.getAllDocumentItemsByLegalCaseId(this.legalCaseId).subscribe({
      next: (docs) => {
        console.log('Documentos cargados:', docs);
        this.documents = docs || [];
        this.totalPages = Math.max(1, Math.ceil(this.documents.length / this.pageSize));
        this.changePage(1);
      },
      error: (error) => {
        console.error('Error al cargar documentos:', error);
        this.documents = [];
        this.pagedDocuments = [];
        this.totalPages = 1;
      }
    });
  }

  getStatusNumber(statusText: string): number {
    switch (statusText) {
      case 'PENDING': return DocumentStatus.PENDING;
      case 'COMPLETED': return DocumentStatus.COMPLETED;
      case 'DENIED': return DocumentStatus.DENIED;
      case 'IN_REVIEW': return DocumentStatus.IN_REVIEW;
      default: return 0;
    }
  }

  updateStatus(documentId: number, newStatus: number) {
    if (this.isUpdatingStatus) return;

    this.isUpdatingStatus = true;
    this.lastUpdatedDocumentId = documentId; // Marcar cuál se está actualizando

    this.documentsService.updateDocumentStatus(documentId, newStatus)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          console.log('Estado actualizado correctamente:', response);
          this.loadDocuments();
          this.isUpdatingStatus = false;
          setTimeout(() => this.lastUpdatedDocumentId = null, 2000); // Limpiar después de 2 segundos
        },
        error: (error) => {
          console.error('Error al actualizar estado:', error);
          this.isUpdatingStatus = false;
          this.lastUpdatedDocumentId = null;
        }
      });
  }

  changePage(page: number) {
    if (page < 1 || (page > this.totalPages && this.totalPages > 0)) {
      return;
    }

    this.currentPage = page;

    if (this.documents.length === 0) {
      this.pagedDocuments = [];
      return;
    }

    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.documents.length);
    this.pagedDocuments = this.documents.slice(startIndex, endIndex);
  }

  getStatusClass(status: string): string {
    return status || '';
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'PENDING': return 'Pendiente';
      case 'COMPLETED': return 'Completado';
      case 'DENIED': return 'Rechazado';
      case 'IN_REVIEW': return 'En revisión';
      default: return 'Desconocido';
    }
  }

  onUploadClick() {
    this.uploadClick.emit();
  }
}
