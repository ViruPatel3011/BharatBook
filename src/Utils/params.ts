export interface IRegister {
  UserId: number;
  FirstName: string;
  LastName: string;
  PhoneNumber: number;
  CityId?: number;
  CountryId?: number;
  Password?: string;
  Email: string;
  BirthDate: string;
  Address?: string | null;
  ProfileText?: string | null;
  UserProfile?: string | null;
}
