import {Consultation} from "../../consultation/model/consultation";
import {Document} from "./document";

export class LegalCase {
  id: number;
  title: string;
  description: string;
  status: string;
  consultationId: Consultation;
  documents: Document[];

  constructor(
    id: number,
    title: string,
    description: string,
    status: string,
    consultationId: Consultation,
    documents: Document[]
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.consultationId = consultationId;
    this.documents = documents;
  }
}
