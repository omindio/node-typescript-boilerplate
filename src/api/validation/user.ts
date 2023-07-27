import Joi, { Schema, ValidationResult } from 'joi';

import UserDTO from '@dto/user';

class UserValidation {
  private id: Schema;
  private firstName: Schema;
  private lastName: Schema;
  private email: Schema;
  private password: Schema;
  private isActive: Schema;
  private isVerified: Schema;

  find = async (user: UserDTO): Promise<ValidationResult> => {
    const schema = Joi.object()
      .keys({
        id: this.id.optional(),
        firstName: this.firstName.optional(),
        lastName: this.lastName.optional(),
        email: this.email.optional(),
        password: this.password.optional(),
        isActive: this.isActive.optional(),
        isVerified: this.isVerified.optional()
      })
      .options({ abortEarly: false });
    return schema.validate(user);
  };

  constructor() {
    this.id = Joi.string().guid();
    this.firstName = Joi.string().min(3).max(50);
    this.lastName = Joi.string().min(3).max(50);
    this.email = Joi.string().email().lowercase().min(4).max(62);
    this.password = Joi.string().min(8).strip();
    this.isActive = Joi.boolean();
    this.isVerified = Joi.boolean();
  }
}

export default UserValidation;
