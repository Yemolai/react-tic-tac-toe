import { generateMarks } from '../utils/generate-marks'
import { checkForDraw } from './check-for-draw'
import { PLAYER_A, PLAYER_B } from '../constants/players'

describe('check-for-draw', () => {
  test('full board is a draw', () => {
    const board = generateMarks().map(mark => {
      return {
        ...mark,
        player: (mark.x + mark.y) % 2 === 0 ? PLAYER_A : PLAYER_B
      }
    })
    expect(checkForDraw(board)).toBeTruthy()
  })
  test('empty board is not a draw', () => {
    const board = generateMarks()
    expect(checkForDraw(board)).toBeFalsy()
  })
  test('half full board is not a draw', () => {
    const board = generateMarks().map(mark => {
      if (mark.x > 1 && mark.y > 1) return mark
      return {
        ...mark,
        player: (mark.x + mark.y) % 2 === 0 ? PLAYER_A : PLAYER_B
      }
    })
    expect(checkForDraw(board)).toBeFalsy()
  })
})
