import * as path from 'path';
import * as fs from 'fs';

import { Application } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { Loader } from '@/core/interfaces/loader';

class Swagger implements Loader {
  private express: Application;
  private docFiles: string[] = [];

  constructor(express: Application) {
    this.express = express;
  }

  init(): void {
    const options = this.loadJSONDocs({
      failOnErrors: true,
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'REST API Documentation',
          version: '1.0.0',
          description: ''
        },
        schemes: ['http', 'https'],
        components: {
          schemas: {},
          requestBodies: {},
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer'
            }
          }
        },
        paths: {}
      },
      apis: []
    });

    const swaggerSpec = swaggerJSDoc(options as any);

    this.express.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  private loadRecursiveFolder(dir: any) {
    fs.readdirSync(dir).forEach((file: any) => {
      const absolutePath = path.join(dir, file);
      if (fs.statSync(absolutePath).isDirectory()) {
        return this.loadRecursiveFolder(absolutePath);
      } else if (path.extname(file) === '.json') {
        return this.docFiles.push(absolutePath);
      }
    });
  }

  private loadJSONDocs(options: any) {
    this.loadRecursiveFolder(path.join(process.cwd(), '/src/api'));
    this.docFiles.forEach((absolutePathFile) => {
      const fileDataBuffer = fs.readFileSync(absolutePathFile);
      const fileDataJSON = JSON.parse(fileDataBuffer.toString());

      options.definition.paths = {
        ...options.definition.paths,
        ...fileDataJSON.paths
      };

      if (fileDataJSON.components) {
        if (fileDataJSON.components.schemas) {
          options.definition.components.schemas = {
            ...options.definition.components.schemas,
            ...fileDataJSON.components.schemas
          };
        }

        if (fileDataJSON.components.requestBodies) {
          options.definition.components.requestBodies = {
            ...options.definition.components.requestBodies,
            ...fileDataJSON.components.requestBodies
          };
        }

        if (fileDataJSON.components.securitySchemes) {
          options.definition.components.securitySchemes = {
            ...options.definition.components.securitySchemes,
            ...fileDataJSON.components.securitySchemes
          };
        }
      }
    });

    return options;
  }
}

export default Swagger;
