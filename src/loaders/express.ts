import http from 'http';

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import { errorHandler } from '@lib/exceptions/errorHandler';
import { userRoutes } from '@routes/user';
import { env } from '@/env';

class Express {
  public express: Application;
  public server: http.Server;

  constructor() {
    this.express = express();
    this.server = http.createServer(this.express);
    this.loadRoutes();
    this.loadMiddlewares();
  }

  private loadMiddlewares(): void {
    this.express.use(cors());
    this.express.use(helmet());

    // extended=false is a configuration option that tells the parser to use the classic encoding. When using it, values can be only strings or arrays.
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(bodyParser.json());

    this.express.disable('x-powered-by');

    this.express.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        errorHandler.handleError(err, res);
      }
    );
  }

  private loadRoutes(): void {
    this.express.get('/health', (req: Request, res: Response) => {
      res.status(200).json('Application works!');
    });

    this.express.use('/users', userRoutes.routes);
  }

  public init(): any {
    this.server.listen(env.app.port);
    console.log(`Application started on port ${env.app.port}!`);
  }
}

export default Express;
