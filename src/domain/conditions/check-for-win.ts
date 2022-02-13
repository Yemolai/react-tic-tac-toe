import { BoardMark } from "../types/board-mark"
import { Player } from "../types/player"
import { Position } from "../types/position"
import { hasAMatch } from "../utils/has-a-match"

export const checkForWin = (board: BoardMark[]): Player | null => {
  const positions: Position[] = [0, 1, 2]
  const rows: BoardMark[][] = positions.map(index => board.filter(({ x }) => x === index))
  const columns: BoardMark[][] = positions.map(index => board.filter(({ y }) => y === index))
  const playerAHaveARow = rows.some(row => hasAMatch('A', row))
  const playerAHaveACol = columns.some(col => hasAMatch('A', col))
  if (playerAHaveARow || playerAHaveACol) {
    return 'A'
  }
  const playerBHaveARow = rows.some(row => hasAMatch('B', row))
  const playerBHaveACol = columns.some(col => hasAMatch('B', col))
  if (playerBHaveARow || playerBHaveACol) {
    return 'B'
  }
  return null
}
