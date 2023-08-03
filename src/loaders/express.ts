import http from 'http';

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import { Loader } from '@/interfaces/loader';
import { errorHandler } from '@/lib/exceptions/errorHandler';
import { env } from '@/env';

class Express implements Loader {
  public app: Application;
  public server: http.Server;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
  }

  loadMiddlewares(): void {
    this.app.use(cors());
    this.app.use(helmet());

    // extended=false is a configuration option that tells the parser to use the classic encoding. When using it, values can be only strings or arrays.
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());

    this.app.disable('x-powered-by');

    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        errorHandler.handleError(err, res);
      }
    );
  }

  loadRoutes(): void {
    this.app.get('/health', (req: Request, res: Response) => {
      res.status(200).json('Application works!');
    });
  }

  init(): void {
    this.server.listen(env.app.port);
    console.log(`Application started on port ${env.app.port}!`);
  }
}

export default Express;
