import { BoardMark } from "../types/board-mark"
import { Player } from "../types/player"
import { Position } from "../types/position"
import { hasPlayerMatch } from "../utils/has-player-match"

export const checkForWin = (board: BoardMark[]): Player | null => {
  const positions: Position[] = [0, 1, 2];
  const rows: BoardMark[][] = positions.map(index => board.filter(({ x }) => x === index));
  const columns: BoardMark[][] = positions.map(index => board.filter(({ y }) => y === index));

  const hasPlayerAMatch = hasPlayerMatch('A', rows, columns);

  if (hasPlayerAMatch) {
    return 'A';
  }

  const hasPlayerBMatch = hasPlayerMatch('B', rows, columns);

  if (hasPlayerBMatch) {
    return 'B';
  }
  
  return null
}
