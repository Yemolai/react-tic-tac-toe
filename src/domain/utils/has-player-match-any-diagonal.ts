import { BoardMark } from "../types/board-mark";
import { Player } from "../types/player";
import { getDiagonalBoardMarks } from "./get-diagonal-board-marks";
import { hasAMatch } from "./has-a-match";

export const hasPlayerMatchAnyDiagonal = (player: Player, rows: BoardMark[][]): boolean => {
  const topLeftToBottomRightDiagonalBoardMarks: BoardMark[] = [
    {x: 0, y: 0},
    {x: 1, y: 1},
    {x: 2, y: 2}
  ]
  
  const bottomLeftToTopRightDiagonalBoardMarks: BoardMark[] = [
    {x: 2, y: 0},
    {x: 1, y: 1},
    {x: 0, y: 2}
  ]

  const upperLeftToBottomRightDiagonal: BoardMark[] = getDiagonalBoardMarks(rows, topLeftToBottomRightDiagonalBoardMarks);
  const bottomLeftToTopRightDiagonal: BoardMark[] = getDiagonalBoardMarks(rows, bottomLeftToTopRightDiagonalBoardMarks);

  return hasAMatch(player, upperLeftToBottomRightDiagonal) || hasAMatch(player, bottomLeftToTopRightDiagonal)
}