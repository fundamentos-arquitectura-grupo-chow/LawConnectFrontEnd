import {Consultation} from "../../consultation/model/consultation";
import {MessageResource} from "./message";

export class ChatRoomResource {
  id: number;
  consultation: Consultation;
  status: string;
  messages: MessageResource[];

  constructor(id: number, consultation: Consultation, status: string, messages: MessageResource[]) {
    this.id = id;
    this.consultation = consultation;
    this.status = status;
    this.messages = messages;
  }
}
