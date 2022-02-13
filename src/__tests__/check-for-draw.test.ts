import { generateMarks } from '../domain/utils/generate-marks'
import { checkForDraw } from '../domain/conditions/check-for-draw'
import { PLAYER_A, PLAYER_B } from '../domain/constants/players'

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
