import { BoardMark } from "../types/board-mark";

export const getDiagonalBoardMarks = (rows: BoardMark[][], diagonalRule: BoardMark[]): BoardMark[] => {
  return rows.map(row => {
    return row.find(boardMark => diagonalRule.some(diagonalMark => diagonalMark.x === boardMark.x && diagonalMark.y === boardMark.y))
  }) as BoardMark[];
}