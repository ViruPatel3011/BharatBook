export interface IRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  birthDate: string;
  gender: string;
}

export class RegisterForm implements IRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  birthDate: string;
  gender: string;

  constructor(init?: IRegisterForm) {
    this.firstName = init?.firstName ?? "";
    this.lastName = init?.lastName ?? "";
    this.email = init?.email ?? "";
    this.password = init?.password ?? "";
    this.confirmPassword = init?.confirmPassword ?? "";
    this.phoneNumber = init?.phoneNumber ?? "";
    this.birthDate = init?.birthDate ?? "";
    this.gender = init?.gender ?? "";
  }
}
