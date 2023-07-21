import 'module-alias/register';

import Express from '@loaders/express';

const app = new Express();

app.init();

// const server = http.createServer(app.express);

// server.listen(process.env.APP_PORT);

// console.log(`App runing localhost:${process.env.APP_PORT}`);
