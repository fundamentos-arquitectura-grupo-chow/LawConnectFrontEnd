export class CreateConsultation {
  lawyerId: number;
  clientId: number;
  description: string;
  currency: number;
  type: number;
  title: string;

  constructor(
    lawyerId: number,
    clientId: number,
    description: string,
    currency: number,
    type: number,
    title: string
  ) {
    this.lawyerId = lawyerId;
    this.clientId = clientId;
    this.description = description;
    this.currency = currency;
    this.type = type;
    this.title = title;
  }
}
