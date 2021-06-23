import { MapSchema, Schema } from '@colyseus/schema';
import createContext from '../CreateContext';
import { Player } from './Player';

export const type = createContext();

export class MyState extends Schema {
  @type({ map: Player })
  players = new MapSchema<Player>();
}
