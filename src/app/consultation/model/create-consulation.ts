export class CreateConsultation {
  lawyerId: number;
  clientId: number;
  description: string;
  Currency: number;
  type: number;
  title: string;

  constructor(
    lawyerId: number,
    clientId: number,
    description: string,
    Currency: number,
    type: number,
    title: string
  ) {
    this.lawyerId = lawyerId;
    this.clientId = clientId;
    this.description = description;
    this.Currency = Currency;
    this.type = type;
    this.title = title;
  }
}
