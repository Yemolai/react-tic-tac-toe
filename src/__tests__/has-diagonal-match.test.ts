import {PLAYER_A, PLAYER_B} from "../domain/constants/players";
import { generateMarks } from "../domain/utils/generate-marks";
import { hasDiagonalMatch } from "../domain/utils/has-diagonal-match";
import { playOnBoard } from "../domain/utils/play-on-board";

describe('has-diagonal-match', () => {
  test('player A firstDiagonal', () => {
    let board = generateMarks()

    board = playOnBoard(board, PLAYER_A, { y: 0, x: 0 }).board
    expect(hasDiagonalMatch(PLAYER_A, board)).toBeFalsy()
    expect(hasDiagonalMatch(PLAYER_B, board)).toBeFalsy()
    board = playOnBoard(board, PLAYER_B, { y: 1, x: 0 }).board
    expect(hasDiagonalMatch(PLAYER_A, board)).toBeFalsy()
    expect(hasDiagonalMatch(PLAYER_B, board)).toBeFalsy()
    board = playOnBoard(board, PLAYER_A, { y: 1, x: 1 }).board
    expect(hasDiagonalMatch(PLAYER_A, board)).toBeFalsy()
    expect(hasDiagonalMatch(PLAYER_B, board)).toBeFalsy()
    board = playOnBoard(board, PLAYER_B, { y: 1, x: 2 }).board
    expect(hasDiagonalMatch(PLAYER_A, board)).toBeFalsy()
    expect(hasDiagonalMatch(PLAYER_B, board)).toBeFalsy()
    board = playOnBoard(board, PLAYER_A, { y: 2, x: 2 }).board
    expect(hasDiagonalMatch(PLAYER_B, board)).toBeFalsy()
    expect(hasDiagonalMatch(PLAYER_A, board)).toBeTruthy()
  })

  test('player A secondDiagonal', () => {
    let board = generateMarks()

    board = playOnBoard(board, PLAYER_A, { y: 0, x: 2 }).board
    expect(hasDiagonalMatch(PLAYER_A, board)).toBeFalsy()
    expect(hasDiagonalMatch(PLAYER_B, board)).toBeFalsy()
    board = playOnBoard(board, PLAYER_B, { y: 1, x: 0 }).board
    expect(hasDiagonalMatch(PLAYER_A, board)).toBeFalsy()
    expect(hasDiagonalMatch(PLAYER_B, board)).toBeFalsy()
    board = playOnBoard(board, PLAYER_A, { y: 1, x: 1 }).board
    expect(hasDiagonalMatch(PLAYER_A, board)).toBeFalsy()
    expect(hasDiagonalMatch(PLAYER_B, board)).toBeFalsy()
    board = playOnBoard(board, PLAYER_B, { y: 1, x: 2 }).board
    expect(hasDiagonalMatch(PLAYER_A, board)).toBeFalsy()
    expect(hasDiagonalMatch(PLAYER_B, board)).toBeFalsy()
    board = playOnBoard(board, PLAYER_A, { y: 2, x: 0 }).board
    expect(hasDiagonalMatch(PLAYER_B, board)).toBeFalsy()
    expect(hasDiagonalMatch(PLAYER_A, board)).toBeTruthy()

    expect(hasDiagonalMatch(PLAYER_A, board)).toBeTruthy()
  })

  test('player B firstDiagonal', () => {
    let board = generateMarks()

    board = playOnBoard(board, PLAYER_A, { y: 0, x: 1 }).board
    expect(hasDiagonalMatch(PLAYER_A, board)).toBeFalsy()
    expect(hasDiagonalMatch(PLAYER_B, board)).toBeFalsy()
    board = playOnBoard(board, PLAYER_B, { y: 0, x: 0 }).board
    expect(hasDiagonalMatch(PLAYER_A, board)).toBeFalsy()
    expect(hasDiagonalMatch(PLAYER_B, board)).toBeFalsy()
    board = playOnBoard(board, PLAYER_A, { y: 1, x: 0 }).board
    expect(hasDiagonalMatch(PLAYER_A, board)).toBeFalsy()
    expect(hasDiagonalMatch(PLAYER_B, board)).toBeFalsy()
    board = playOnBoard(board, PLAYER_B, { y: 1, x: 1 }).board
    expect(hasDiagonalMatch(PLAYER_A, board)).toBeFalsy()
    expect(hasDiagonalMatch(PLAYER_B, board)).toBeFalsy()
    board = playOnBoard(board, PLAYER_A, { y: 1, x: 2 }).board
    expect(hasDiagonalMatch(PLAYER_A, board)).toBeFalsy()
    expect(hasDiagonalMatch(PLAYER_B, board)).toBeFalsy()
    board = playOnBoard(board, PLAYER_B, { y: 2, x: 2 }).board
    expect(hasDiagonalMatch(PLAYER_A, board)).toBeFalsy()
    expect(hasDiagonalMatch(PLAYER_B, board)).toBeTruthy()
  })

  test('player B secondDiagonal', () => {
    let board = generateMarks()

    board = playOnBoard(board, PLAYER_A, { y: 0, x: 1 }).board
    expect(hasDiagonalMatch(PLAYER_A, board)).toBeFalsy()
    expect(hasDiagonalMatch(PLAYER_B, board)).toBeFalsy()
    board = playOnBoard(board, PLAYER_B, { y: 0, x: 2 }).board
    expect(hasDiagonalMatch(PLAYER_A, board)).toBeFalsy()
    expect(hasDiagonalMatch(PLAYER_B, board)).toBeFalsy()
    board = playOnBoard(board, PLAYER_A, { y: 1, x: 0 }).board
    expect(hasDiagonalMatch(PLAYER_A, board)).toBeFalsy()
    expect(hasDiagonalMatch(PLAYER_B, board)).toBeFalsy()
    board = playOnBoard(board, PLAYER_B, { y: 1, x: 1 }).board
    expect(hasDiagonalMatch(PLAYER_A, board)).toBeFalsy()
    expect(hasDiagonalMatch(PLAYER_B, board)).toBeFalsy()
    board = playOnBoard(board, PLAYER_A, { y: 1, x: 2 }).board
    expect(hasDiagonalMatch(PLAYER_A, board)).toBeFalsy()
    expect(hasDiagonalMatch(PLAYER_B, board)).toBeFalsy()
    board = playOnBoard(board, PLAYER_B, { y: 2, x: 0 }).board
    expect(hasDiagonalMatch(PLAYER_A, board)).toBeFalsy()
    expect(hasDiagonalMatch(PLAYER_B, board)).toBeTruthy()
  })
});
