import * as path from 'path';
import * as fs from 'fs';

import { Application } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

class Swagger {
  private express: Application;
  constructor(express: Application) {
    this.express = express;
  }

  public init(): void {
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

  private loadJSONDocs(options: any) {
    const jsonsInDir = fs
      .readdirSync(path.join(process.cwd(), '/src/api/docs'))
      .filter((file) => path.extname(file) === '.json');
    jsonsInDir.forEach((file) => {
      const fileDataBuffer = fs.readFileSync(
        path.join(process.cwd(), `/src/api/docs/${file}`)
      );
      const fileDataJSON = JSON.parse(fileDataBuffer.toString());

      options.definition.paths = {
        ...options.definition.paths,
        ...fileDataJSON.paths
      };
      options.definition.components.schemas = {
        ...options.definition.components.schemas,
        ...fileDataJSON.components.schemas
      };
      options.definition.components.requestBodies = {
        ...options.definition.components.requestBodies,
        ...fileDataJSON.components.requestBodies
      };
      options.definition.components.securitySchemes = {
        ...options.definition.components.securitySchemes,
        ...fileDataJSON.components.securitySchemes
      };
    });
    return options;
  }
}

export default Swagger;
