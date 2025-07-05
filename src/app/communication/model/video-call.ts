import {Consultation} from "../../consultation/model/consultation";

export class VideoCallResource {
  id: number;
  consultation: Consultation;
  description: string;
  status: string;

  constructor(id: number, consultation: Consultation, description: string, status: string) {
    this.id = id;
    this.consultation = consultation;
    this.description = description;
    this.status = status;
  }
}
