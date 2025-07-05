import { Profile } from './profile';

export class Lawyer {
  id: number;
  profile: Profile;
  lawyerTypes: string[];
  prices: number;

  constructor() {
    this.id = 0;
    this.profile = new Profile();
    this.lawyerTypes = [];
    this.prices = 0;
  }
}
