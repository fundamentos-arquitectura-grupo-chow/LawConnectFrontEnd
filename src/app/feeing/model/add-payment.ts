export class AddPaymentResource {
  consultationId: number;
  amount: number;
  currency: number;

  constructor(consultationId: number, amount: number,
    currency: number
  ) {
    this.consultationId = consultationId;
    this.amount = amount;
    this.currency = currency;
  }
}
