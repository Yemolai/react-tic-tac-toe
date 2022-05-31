import { BoardMark } from '../domain/types/board-mark'
import { PLAYER_A, PLAYER_B } from '../domain/constants/players'
import {checkForGameOver} from "../domain/conditions/check-for-game-over";

describe('check-for-win', () => {
  test('first row player A win', () => {
    const board: BoardMark[] = [
      { y: 0, x: 0, player: PLAYER_A },
      { y: 0, x: 1, player: PLAYER_A },
      { y: 0, x: 2, player: PLAYER_A },
      { y: 1, x: 0 },
      { y: 1, x: 1, player: PLAYER_B },
      { y: 1, x: 2 },
      { y: 2, x: 0 },
      { y: 2, x: 1, player: PLAYER_B },
      { y: 2, x: 2 },
    ]
    expect(checkForGameOver(board)).toBe(PLAYER_A)
  })
  test('first row player B win', () => {
    const board: BoardMark[] = [
      { y: 0, x: 0, player: PLAYER_B },
      { y: 0, x: 1, player: PLAYER_B },
      { y: 0, x: 2, player: PLAYER_B },
      { y: 1, x: 0 },
      { y: 1, x: 1, player: PLAYER_A },
      { y: 1, x: 2 },
      { y: 2, x: 0 },
      { y: 2, x: 1, player: PLAYER_A },
      { y: 2, x: 2, player: PLAYER_A },
    ]
    expect(checkForGameOver(board)).toBe(PLAYER_B)
  })
  test('second row player A win', () => {
    const board: BoardMark[] = [
      { y: 0, x: 0 },
      { y: 0, x: 1 },
      { y: 0, x: 2, player: PLAYER_B },
      { y: 1, x: 0, player: PLAYER_A },
      { y: 1, x: 1, player: PLAYER_A },
      { y: 1, x: 2, player: PLAYER_A },
      { y: 2, x: 0 },
      { y: 2, x: 1, player: PLAYER_B },
      { y: 2, x: 2 },
    ]
    expect(checkForGameOver(board)).toBe(PLAYER_A)
  })
  test('second row player B win', () => {
    const board: BoardMark[] = [
      { y: 0, x: 0, player: PLAYER_A },
      { y: 0, x: 1 },
      { y: 0, x: 2, player: PLAYER_A },
      { y: 1, x: 0, player: PLAYER_B },
      { y: 1, x: 1, player: PLAYER_B },
      { y: 1, x: 2, player: PLAYER_B },
      { y: 2, x: 0 },
      { y: 2, x: 1, player: PLAYER_A },
      { y: 2, x: 2 },
    ]
    expect(checkForGameOver(board)).toBe(PLAYER_B)
  })
  test('third row player A win', () => {
    const board: BoardMark[] = [
      { y: 0, x: 0 },
      { y: 0, x: 1 },
      { y: 0, x: 2, player: PLAYER_B },
      { y: 1, x: 0 },
      { y: 1, x: 1, player: PLAYER_B },
      { y: 1, x: 2 },
      { y: 2, x: 0, player: PLAYER_A },
      { y: 2, x: 1, player: PLAYER_A },
      { y: 2, x: 2, player: PLAYER_A },
    ]
    expect(checkForGameOver(board)).toBe(PLAYER_A)
  })
  test('third row player B win', () => {
    const board: BoardMark[] = [
      { y: 0, x: 0, player: PLAYER_A },
      { y: 0, x: 1 },
      { y: 0, x: 2, player: PLAYER_A },
      { y: 1, x: 0 },
      { y: 1, x: 1 },
      { y: 1, x: 2, player: PLAYER_A },
      { y: 2, x: 0, player: PLAYER_B },
      { y: 2, x: 1, player: PLAYER_B },
      { y: 2, x: 2, player: PLAYER_B },
    ]
    expect(checkForGameOver(board)).toBe(PLAYER_B)
  })
  test('first col player A win', () => {
    const board: BoardMark[] = [
      { x: 0, y: 0, player: PLAYER_A },
      { x: 0, y: 1, player: PLAYER_A },
      { x: 0, y: 2, player: PLAYER_A },
      { x: 1, y: 0 },
      { x: 1, y: 1, player: PLAYER_B },
      { x: 1, y: 2 },
      { x: 2, y: 0 },
      { x: 2, y: 1, player: PLAYER_B },
      { x: 2, y: 2 },
    ]
    expect(checkForGameOver(board)).toBe(PLAYER_A)
  })
  test('first col player B win', () => {
    const board: BoardMark[] = [
      { x: 0, y: 0, player: PLAYER_B },
      { x: 0, y: 1, player: PLAYER_B },
      { x: 0, y: 2, player: PLAYER_B },
      { x: 1, y: 0 },
      { x: 1, y: 1, player: PLAYER_A },
      { x: 1, y: 2 },
      { x: 2, y: 0 },
      { x: 2, y: 1, player: PLAYER_A },
      { x: 2, y: 2, player: PLAYER_A },
    ]
    expect(checkForGameOver(board)).toBe(PLAYER_B)
  })
  test('second col player A win', () => {
    const board: BoardMark[] = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2, player: PLAYER_B },
      { x: 1, y: 0, player: PLAYER_A },
      { x: 1, y: 1, player: PLAYER_A },
      { x: 1, y: 2, player: PLAYER_A },
      { x: 2, y: 0 },
      { x: 2, y: 1, player: PLAYER_B },
      { x: 2, y: 2 },
    ]
    expect(checkForGameOver(board)).toBe(PLAYER_A)
  })
  test('second col player B win', () => {
    const board: BoardMark[] = [
      { x: 0, y: 0, player: PLAYER_A },
      { x: 0, y: 1 },
      { x: 0, y: 2, player: PLAYER_A },
      { x: 1, y: 0, player: PLAYER_B },
      { x: 1, y: 1, player: PLAYER_B },
      { x: 1, y: 2, player: PLAYER_B },
      { x: 2, y: 0 },
      { x: 2, y: 1, player: PLAYER_A },
      { x: 2, y: 2 },
    ]
    expect(checkForGameOver(board)).toBe(PLAYER_B)
  })
  test('third col player A win', () => {
    const board: BoardMark[] = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2, player: PLAYER_B },
      { x: 1, y: 0 },
      { x: 1, y: 1, player: PLAYER_B },
      { x: 1, y: 2 },
      { x: 2, y: 0, player: PLAYER_A },
      { x: 2, y: 1, player: PLAYER_A },
      { x: 2, y: 2, player: PLAYER_A },
    ]
    expect(checkForGameOver(board)).toBe(PLAYER_A)
  })
  test('third col player B win', () => {
    const board: BoardMark[] = [
      { y: 0, x: 0, player: PLAYER_A },
      { y: 0, x: 1 },
      { y: 0, x: 2, player: PLAYER_A },
      { y: 1, x: 0 },
      { y: 1, x: 1 },
      { y: 1, x: 2, player: PLAYER_A },
      { y: 2, x: 0, player: PLAYER_B },
      { y: 2, x: 1, player: PLAYER_B },
      { y: 2, x: 2, player: PLAYER_B },
    ]
    expect(checkForGameOver(board)).toBe(PLAYER_B)
  })
})
