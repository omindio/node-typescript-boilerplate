import Joi, { Schema, ValidationResult } from 'joi';

import { UserDTO, Roles as Role } from './user.dto';

export class UserValidation {
  private uuid: Schema;
  private firstName: Schema;
  private lastName: Schema;
  private email: Schema;
  private password: Schema;
  private isActive: Schema;
  private isVerified: Schema;
  private phone: Schema;
  private role: Schema;
  private twoFaEnabled: Schema;

  findOneByUuid = async (user: UserDTO): Promise<ValidationResult> => {
    const schema = Joi.object()
      .keys({
        uuid: this.uuid.required(),
        firstName: this.firstName.optional(),
        lastName: this.lastName.optional(),
        email: this.email.optional(),
        password: this.password.optional(),
        isActive: this.isActive.optional(),
        isVerified: this.isVerified.optional(),
        phone: this.phone.optional(),
        role: this.role.optional(),
        twoFaEnabled: this.twoFaEnabled.optional()
      })
      .options({ abortEarly: false });
    return schema.validate(user);
  };

  register = async (user: UserDTO): Promise<ValidationResult> => {
    const schema = Joi.object()
      .keys({
        uuid: this.uuid.optional(),
        firstName: this.firstName.optional(),
        lastName: this.lastName.optional(),
        email: this.email.optional(),
        password: this.password.required(),
        isActive: this.isActive.optional(),
        isVerified: this.isVerified.optional(),
        phone: this.phone.required(),
        role: this.role.optional(),
        twoFaEnabled: this.twoFaEnabled.optional()
      })
      .options({ abortEarly: false });
    return schema.validate(user);
  };

  constructor() {
    this.uuid = Joi.string().guid();
    this.firstName = Joi.string().min(3).max(50);
    this.lastName = Joi.string().min(3).max(50);
    this.email = Joi.string().email().lowercase().min(4).max(62);
    this.password = Joi.string().min(8).strip();
    this.isActive = Joi.boolean();
    this.isVerified = Joi.boolean();
    this.phone = Joi.string().pattern(
      /^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/
    );
    this.role = Joi.string().valid(Role.User, Role.Admin).default(Role.User);
    this.twoFaEnabled = Joi.boolean();
  }
}
