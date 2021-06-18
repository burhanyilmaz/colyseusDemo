import { Room, Server } from 'colyseus';
import { createServer } from 'http';
import express from 'express';

class MyRoom extends Room {
  onCreate() {
    this.onMessage('up', (client, message) => {
      client.send('up', { message, date: new Date() });
    });
    this.onMessage('*', (client, type, message) => {
      console.log(client.sessionId, 'sent', type, message);
    });
  }
}

const port = Number(process.env.PORT) || 3030;

const app = express();
app.use(express.json());

const gameServer = new Server({
  server: createServer(app),
});

gameServer.define('room1', MyRoom);

gameServer.listen(port);
