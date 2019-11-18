import express from 'express';
import next from 'next';
import compression from 'compression';
import useragent from 'express-useragent';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { routes } from '../routes';
dotenv.config();

const port = parseInt(process.env.PORT, 10) || 3001;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);

app.prepare().then(() => {
  const server = express();

  server.disable('x-powered-by');
  server.use(compression());
  server.use(helmet());
  server.use(useragent.express());

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.use(handle).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
