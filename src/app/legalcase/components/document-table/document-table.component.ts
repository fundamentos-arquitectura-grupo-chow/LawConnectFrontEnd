import { Component, Input, OnInit } from '@angular/core';
import { DocumentsService } from '../../services/documents.service';
import { SendDocument } from '../../model/send-document';

@Component({
  selector: 'app-document-table',
  templateUrl: './document-table.component.html',
  styleUrls: ['./document-table.component.css']
})
export class DocumentTableComponent implements OnInit {
  @Input() legalCaseId!: number;
  documents: SendDocument[] = [];

  constructor(private documentsService: DocumentsService) {}

  ngOnInit() {
    this.loadDocuments();
  }

  loadDocuments() {
    this.documentsService.getAllDocumentItemsByLegalCaseId(this.legalCaseId).subscribe(docs => {
      this.documents = docs;
    });
  }
}
