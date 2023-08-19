import { Application } from 'express';

import { Api } from '@/core/interfaces/api';

import { userRoutes } from './user.routes';

export default class UserApi implements Api {
  private express: Application;

  init = async (): Promise<void> => {
    await this.loadRoutes();
    await this.seed();
  };

  loadRoutes = async (): Promise<void> => {
    this.express.use('/users', userRoutes.routes);
  };

  seed = async (): Promise<void> => {};

  constructor(express: Application) {
    this.express = express;
  }
}
