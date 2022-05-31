import {generateMarks} from "../domain/utils/generate-marks";
import {playOnBoard} from "../domain/utils/play-on-board";
import {PLAYER_A, PLAYER_B} from "../domain/constants/players";
import {BoardMark} from "../domain/types/board-mark";

describe('play-on-board', () => {
  test('can play', () => {
    const board = generateMarks()
    expect(playOnBoard(board, PLAYER_A, { x: 0, y: 1 }).board)
      .toContainEqual({ x: 0, y: 1, player: PLAYER_A })
    expect(playOnBoard(board, PLAYER_A, { x: 1, y: 1 }).board)
      .toContainEqual({ x: 1, y: 1, player: PLAYER_A })
    expect(playOnBoard(board, PLAYER_B, { x: 1, y: 0 }).board)
      .toContainEqual({ x: 1, y: 0, player: PLAYER_B })
    expect(playOnBoard(board, PLAYER_B, { x: 2, y: 2 }).board)
      .toContainEqual({ x: 2, y: 2, player: PLAYER_B })
  })
  test('error: invalid tile', () => {
    const board: BoardMark[] = [{ x: 0, y: 0 }]
    expect(playOnBoard(board, PLAYER_A, { x: 2, y: 2 }).error).toBe('invalid_tile')
    expect(playOnBoard(board, PLAYER_A, { x: 1, y: 1 }).error).toBe('invalid_tile')
  })
  test('error: played tile', () => {
    const board: BoardMark[] = [{ x: 0, y: 0, player: PLAYER_A }, { x: 1, y: 1, player: PLAYER_B }]
    expect(playOnBoard(board, PLAYER_A, { x: 0, y: 0 }).error).toBe('played_tile')
    expect(playOnBoard(board, PLAYER_A, { x: 1, y: 1 }).error).toBe('played_tile')
  })
})
