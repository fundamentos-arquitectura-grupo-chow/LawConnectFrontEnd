export class SendDocument {
  title: string;
  description: string;
  type: number;
  status: number;
  legalCaseId: number;

  constructor(
    title: string,
    description: string,
    type: number,
    status: number,
    legalCaseId: number
  ) {
    this.title = title;
    this.description = description;
    this.type = type;
    this.status = status;
    this.legalCaseId = legalCaseId;
  }
}
