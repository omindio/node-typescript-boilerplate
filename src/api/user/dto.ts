export const Roles = {
  Admin: 'Admin',
  User: 'User'
};

export type userType = {
  id?: string | number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  isActive?: boolean;
  isVerified?: boolean;
  phone?: string;
  role?: 'admin' | 'user' | undefined;
};

class UserDTO {
  public readonly id?: string | number;
  public readonly firstName?: string;
  public readonly lastName?: string;
  public readonly email?: string;
  public readonly password?: string;
  public readonly isActive?: boolean;
  public readonly isVerified?: boolean;
  public readonly phone?: string;
  public readonly role?: string;

  constructor(user: userType) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.isActive = user.isActive;
    this.isVerified = user.isVerified;
    this.phone = user.phone;
    this.role = user.role;
  }
}

export default UserDTO;
