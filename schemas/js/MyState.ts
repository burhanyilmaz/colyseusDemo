//
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
//
// GENERATED USING @colyseus/schema 1.0.25
//

import { Schema, type, ArraySchema, MapSchema, DataChange } from '@colyseus/schema';
import { Player } from './Player';

export class MyState extends Schema {
  @type({ map: Player }) public players: MapSchema<Player> = new MapSchema<Player>();
}
