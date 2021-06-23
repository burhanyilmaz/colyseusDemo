import { Schema, type } from '@colyseus/schema';

export class Player extends Schema {
  @type('number')
  repCount: number = 0;

  @type('string')
  id: string | undefined;
}
