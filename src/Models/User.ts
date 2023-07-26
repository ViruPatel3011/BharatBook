export interface IUser {
  address?: string | null;
  avatar: string;
  birthDate?: string | null;
  cityId: number | null;
  countryId: number | null;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: number;
  profileText?: string | null;
  userId: number;
  userProfile?: string | null;
}

export class User implements IUser {
  address?: string | null;
  avatar: string;
  birthDate?: string | null;
  cityId: number | null;
  countryId: number | null;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: number;
  profileText?: string | null;
  userId: number;
  userProfile?: string | null;

  constructor(init?: IUser) {
    this.address = init?.address ?? "";
    this.avatar = init?.avatar ?? "";
    this.birthDate = init?.birthDate ?? "";
    this.cityId = init?.cityId ?? 0;
    this.countryId = init?.countryId ?? 0;
    this.email = init?.email ?? "";
    this.firstName = init?.firstName ?? "";
    this.lastName = init?.lastName ?? "";
    this.password = init?.password ?? "";
    this.phoneNumber = init?.phoneNumber ?? 0;
    this.profileText = init?.profileText ?? "";
    this.userId = init?.userId ?? 0;
    this.userProfile = init?.userProfile ?? "";
  }
}
