import { BoardMark } from "../types/board-mark"
import { Player } from "../types/player"
import { Position } from "../types/position"
import { hasAMatch } from "../utils/has-a-match"
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



const hasPlayerMatchAnyDiagonal = (player: Player, rows: BoardMark[][]): boolean => {
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

  const upperLeftToBottomRightDiagonal: BoardMark[] = getDiagonalBoardMarks(player, rows, topLeftToBottomRightDiagonalBoardMarks);
  const bottomLeftToTopRightDiagonal: BoardMark[] = getDiagonalBoardMarks(player, rows, bottomLeftToTopRightDiagonalBoardMarks);

  return hasAMatch(player, upperLeftToBottomRightDiagonal) || hasAMatch(player, bottomLeftToTopRightDiagonal)
}

const getDiagonalBoardMarks = (player: Player, rows: BoardMark[][], diagonalRule: BoardMark[]): BoardMark[] => {
  return rows.map(row => {
    return row.find(boardMark => diagonalRule.some(diagonalMark => diagonalMark.x === boardMark.x && diagonalMark.y === boardMark.y))
  }) as BoardMark[];
}
