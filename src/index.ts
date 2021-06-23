import { Client, Room, Server } from 'colyseus';
import { createServer } from 'http';
import express from 'express';
import { monitor } from '@colyseus/monitor';
import basicAuth from 'express-basic-auth';
import { MyState } from './state/State';
import { Player } from './state/Player';

const basicAuthMiddleware = basicAuth({
  users: {
    admin: 'admin',
  },
  challenge: true,
});

class MyRoom extends Room {
  LOBBY_CHANNEL = '$mylobby';
  DEFAULT_SEAT_RESERVATION_TIME = 1500;
  seatReservationTime = 10000;

  async generateRoomId(customId) {
    const currentIds = await this.presence.smembers(this.LOBBY_CHANNEL);
    if (!currentIds.includes(customId)) {
      this.roomId = customId;
    } else {
      this.presence.srem(this.LOBBY_CHANNEL, this.roomId);
    }
    await this.presence.sadd(this.LOBBY_CHANNEL, this.roomId);
  }

  async onDispose() {
    await this.presence.srem(this.LOBBY_CHANNEL, this.roomId);
    await this.disconnect();
  }
  async onCreate(data) {
    console.log('room created.', this.seatReservationTime);
    this.setState(new MyState());
    await this.generateRoomId(data.channel);

    this.onMessage('up', (client, message) => {
      console.log(this.state);
      console.log(message);
      this.broadcast('up', { message, date: new Date() });
    });

    this.onMessage('repCount', (client, data) => {
      const player = this.state.players.get(client.sessionId);
      player.repCount += 1;
      player.id = client.id;
      console.log(data);
    });
  }

  onJoin(client: Client, options: any) {
    this.state.players.set(client.sessionId, new Player());
  }

  onLeave(client) {
    if (this.state.players.has(client.sessionId)) {
      this.state.players.delete(client.sessionId);
    }
  }
}

const port = Number(process.env.PORT) || 3032;

const app = express();
app.use(express.json());
app.use(
  '/colyseus',
  basicAuthMiddleware,
  monitor({
    columns: [
      'roomId',
      'name',
      'clients',
      { metadata: 'spectators' }, // display 'spectators' from metadata
      'locked',
      'elapsedTime',
    ],
  }),
);

const gameServer = new Server({
  server: createServer(app),
});

gameServer.define('room1', MyRoom);

gameServer.listen(port);
