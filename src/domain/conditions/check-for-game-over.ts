import { PLAYER_A, PLAYER_B } from "../constants/players"
import { BoardMark } from "../types/board-mark"
import { hasAMatch } from "../utils/has-a-match"
import { GameOptions } from "../types/game-options"
import { Player } from "../types/player"
import { Position } from "../types/position"
import { checkForDraw } from "./check-for-draw";
import {hasDiagonalMatch} from "../utils/has-diagonal-match";

export const checkForGameOver = (board: BoardMark[], options?: GameOptions): Player | 'draw' | null => {
  const positions: Position[] = [0, 1, 2];
  const rows: BoardMark[][] = positions.map(index => board.filter(({ x }) => x === index));
  const columns: BoardMark[][] = positions.map(index => board.filter(({ y }) => y === index));

  const hasPlayerAMatch =
    rows.some(row => hasAMatch(PLAYER_A, row)) ||
    columns.some(column => hasAMatch(PLAYER_A, column)) ||
    (options?.diagonals && hasDiagonalMatch(PLAYER_A, board))

  if (hasPlayerAMatch) {
    return 'A';
  }

  const hasPlayerBMatch =
    rows.some(row => hasAMatch(PLAYER_B, row)) ||
    columns.some(column => hasAMatch(PLAYER_B, column)) ||
    (options?.diagonals && hasDiagonalMatch(PLAYER_B, board))

  if (hasPlayerBMatch) {
    return 'B';
  }

  return checkForDraw(board) ? 'draw' : null
}
