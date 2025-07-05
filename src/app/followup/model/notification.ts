export class Notification {
  id: number;
  title: string;
  description: string;
  clientId: number;
  consultationId: number;

  constructor(id: number, title: string, description: string, clientId: number, consultationId: number) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.clientId = clientId;
    this.consultationId = consultationId;
  }
}
