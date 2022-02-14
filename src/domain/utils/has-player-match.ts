import { BoardMark } from "../types/board-mark";
import { Player } from "../types/player";
import { hasPlayerMatchARowOrAColumn } from "./has-player-match-row-or-column";

export const hasPlayerMatch = (player: Player, rows: BoardMark[][], columns: BoardMark[][]): boolean => {
  const hasPlayerMatchARow: boolean = hasPlayerMatchARowOrAColumn(player, rows);
  const hasPlayerMatchAColumn: boolean = hasPlayerMatchARowOrAColumn(player, columns);

  return hasPlayerMatchARow || hasPlayerMatchAColumn
}
