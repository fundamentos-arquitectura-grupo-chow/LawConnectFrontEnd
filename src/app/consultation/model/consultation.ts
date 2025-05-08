import {Payment} from "../../feeing/model/payment";

export class Consultation {
  id: number;
  lawyerId: number;
  clientId: number;
  payment: Payment[];
  description: string;
  consultationType: string;
  applicationStatus: string;

  constructor(
    id: number,
    lawyerId: number,
    clientId: number,
    payment: Payment[],
    description: string,
    consultationType: string,
    applicationStatus: string
  ) {
    this.id = id;
    this.lawyerId = lawyerId;
    this.clientId = clientId;
    this.payment = payment;
    this.description = description;
    this.consultationType = consultationType;
    this.applicationStatus = applicationStatus;
  }
}
