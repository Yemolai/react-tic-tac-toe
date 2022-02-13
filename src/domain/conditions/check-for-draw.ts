import { BoardMark } from "../types/board-mark"

export const checkForDraw = (board: BoardMark[]): boolean => {
  return board.every(({ player }) => !!player)
}
