//
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
//
// GENERATED USING @colyseus/schema 1.0.25
//

import { Schema, type, ArraySchema, MapSchema, DataChange } from '@colyseus/schema';

export class Player extends Schema {
  @type('number') public repCount!: number;
  @type('string') public id!: string;
}
