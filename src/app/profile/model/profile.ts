export class Profile {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  name: Name;
  email: Email;
  image_url: string;
  phoneNumber: string;
  address: string;
  dni: string;

  constructor() {
    this.id = 0;
    this.createdAt = '';
    this.updatedAt = '';
    this.userId = 0;
    this.name = new Name();
    this.email = new Email();
    this.image_url = '';
    this.phoneNumber = '';
    this.address = '';
    this.dni = '';
  }
}
export class Name {
  firstName: string;
  lastName: string;
  fullName: string;

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.fullName = '';
  }
}

export class Email {
  address: string;

  constructor() {
    this.address = '';
  }
}
