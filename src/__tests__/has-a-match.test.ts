import {BoardMark} from "../domain/types/board-mark";
import {hasAMatch} from "../domain/utils/has-a-match";

describe('has-a-match', () => {
  test('player A have a match', () => {
    const marks: BoardMark[] = [
      { y: 0, x: 0, player: 'A' },
      { y: 0, x: 1, player: 'A' },
      { y: 0, x: 2, player: 'A' },
    ]
    expect(hasAMatch('A', marks)).toBeTruthy()
  })
  test('player A does not have a match', () => {
    const marks: BoardMark[] = [
      { y: 0, x: 0, player: 'B' },
      { y: 0, x: 1, player: 'A' },
      { y: 0, x: 2 },
    ]
    expect(hasAMatch('A', marks)).toBeFalsy()
  })
  test('player B have a match', () => {
    const marks: BoardMark[] = [
      { y: 2, x: 2, player: 'B' },
      { y: 2, x: 1, player: 'B' },
      { y: 2, x: 0, player: 'B' },
    ]
    expect(hasAMatch('B', marks)).toBeTruthy()
  })
  test('player B does not have a match', () => {
    const marks: BoardMark[] = [
      { y: 0, x: 0 },
      { y: 0, x: 1, player: 'A' },
      { y: 0, x: 2 },
    ]
    expect(hasAMatch('B', marks)).toBeFalsy()
  })
})
