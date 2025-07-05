export class Document {
  id: number;
  title: string;
  type: string;
  description: string;
  legalCaseId: number;
  status: string;

  constructor(
    id: number,
    title: string,
    type: string,
    description: string,
    legalCaseId: number,
    status: string
  ) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.description = description;
    this.legalCaseId = legalCaseId;
    this.status = status;
  }
}
