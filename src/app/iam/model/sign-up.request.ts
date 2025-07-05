export class SignUpRequest {
  public email: string;
  public password: string;
  public roles: string[];
  public firstName: string;
  public lastName: string;
  public phoneNumber: string;
  public address: string;
  public dni: string;
  public image_url: string;

  constructor(email: string, password: string, roles: string[], firstName: string, lastName: string, phoneNumber: string, address: string, dni: string, image_url: string) {
    this.email = email;
    this.password = password;
    this.roles = roles;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.dni = dni;
    this.image_url = image_url;
  }
}
