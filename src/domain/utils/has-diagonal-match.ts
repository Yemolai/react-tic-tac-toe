import { BoardMark } from "../types/board-mark";
import { Player } from "../types/player";
import { hasAMatch } from "./has-a-match";

export const hasDiagonalMatch = (player: Player, marks: BoardMark[]): boolean => {
  const firstDiagonal: BoardMark[] = marks.filter(({ x, y }) => x === y)
  const secondDiagonal: BoardMark[] = marks.filter(({ x, y }) => ((x * -1) - y) === -2)

  return hasAMatch(player, firstDiagonal) || hasAMatch(player, secondDiagonal)
}
