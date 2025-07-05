import {Consultation} from "../../consultation/model/consultation";

export class AppointmentResource {
  id: number;
  description: string;
  consultation: Consultation;
  location: string;
  status: string;

  constructor(id: number, description: string, consultation: Consultation, location: string, status: string) {
    this.id = id;
    this.description = description;
    this.consultation = consultation;
    this.location = location;
    this.status = status;
  }
}
