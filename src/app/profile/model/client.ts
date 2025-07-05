import { Profile } from './profile';

export class Client {
  id: number;
  profile: Profile;
  consultationCount: number;
  paidServices: number;

  constructor() {
    this.id = 0;
    this.profile = new Profile();
    this.consultationCount = 0;
    this.paidServices = 0;
  }
}
