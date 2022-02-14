import { Player } from "./player";
import { Position } from "./position";

export type BoardMark = {
  player?: Player
  x: Position,
  y: Position,
}
