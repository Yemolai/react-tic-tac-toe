import { BoardMark } from "../types/board-mark";
import { Player } from "../types/player";
import { Position } from "../types/position";

export const playOnBoard = (
  board: BoardMark[],
  player: Player,
  position: { x: Position, y: Position },
): { error?: string, board: BoardMark[] } => {
  const previousMark = board.find(({ x, y }) => position.x === x && position.y === y)
  if (!previousMark) return { board, error: 'invalid_tile' }
  if (previousMark.player) return { board, error: 'used_tile' }
  return {
    board: [
      ...board.filter(mark => mark !== previousMark),
      { ...previousMark, player },
    ]
  }
}
