import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import * as bodyParser from 'body-parser';

import { GameServer } from './index';

const app: express.Express = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,DELETE,POST')
  return next();
});

// Point static path to dist
app.use(express.static(path.join(__dirname, '../../dist')));

// Catch all other routes and return the index file
app.get('*', (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

// Get port from environment and store in Express.
const port = process.env.PORT || '3000';
app.set('port', port);

const server: http.Server = http.createServer(app);
server.listen(port, () => console.log(`Server running on localhost:${port}`));

const gameServer = new GameServer(server);
gameServer.run();
