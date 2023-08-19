export const Roles = {
  Admin: 'admin',
  User: 'user'
};

export type userType = {
  uuid?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  isActive?: boolean;
  isVerified?: boolean;
  phone?: string;
  twoFaEnabled?: boolean;
  role?: 'admin' | 'user' | undefined;
};

export class UserDTO {
  readonly uuid?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly email?: string;
  readonly password?: string;
  readonly isActive?: boolean;
  readonly isVerified?: boolean;
  readonly phone?: string;
  readonly role?: string;
  readonly twoFaEnabled?: boolean;

  constructor(user: userType) {
    this.uuid = user.uuid;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.isActive = user.isActive;
    this.isVerified = user.isVerified;
    this.phone = user.phone;
    this.role = user.role;
    this.twoFaEnabled = user.twoFaEnabled;
  }
}
