import { BoardMark } from "../types/board-mark";
import { Player } from "../types/player";
import { hasAMatch } from "./has-a-match";

export const hasPlayerMatchARowOrAColumn = (player: Player, rowsOrColumns: BoardMark[][]): boolean => {
  return rowsOrColumns.some(rowOrColumn => hasAMatch(player, rowOrColumn));
}