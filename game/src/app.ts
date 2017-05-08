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
app.use(express.static(__dirname));

// Catch all other routes and return the index file
app.get('*', (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

// Get port from environment and store in Express.
const port = process.env.PORT || '3000';
app.set('port', port);

const host = '0.0.0.0';
const server: http.Server = http.createServer(app);
server.listen(port, host, () => console.log(`Server running on ${host}:${port}`));

const gameServer = new GameServer(server);
gameServer.run();
