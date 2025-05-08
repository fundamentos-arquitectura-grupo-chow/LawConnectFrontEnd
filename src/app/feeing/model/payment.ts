export class Payment {
  id: number;
  clientId: number;
  amount: string;
  status: string;
  consultationId: number;

  constructor(
    id: number,
    clientId: number,
    amount: string,
    status: string,
    consultationId: number
  ) {
    this.id = id;
    this.clientId = clientId;
    this.amount = amount;
    this.status = status;
    this.consultationId = consultationId;
  }
}
