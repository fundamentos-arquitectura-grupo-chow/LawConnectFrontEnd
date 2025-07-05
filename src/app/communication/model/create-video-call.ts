export class CreateVideoCallResource {
  consultationId: number;
  description: string;
  location: string;

  constructor(consultationId: number, description: string, location: string) {
    this.consultationId = consultationId;
    this.description = description;
    this.location = location;
  }
}
