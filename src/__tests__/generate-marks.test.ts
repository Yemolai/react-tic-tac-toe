import {generateMarks} from "../domain/utils/generate-marks";

describe('generate-marks', () => {
  test('should generate 3x3 grid without players', () => {
    const marksBoard = generateMarks()
    for (let y = 0; y < 3; y += 1) {
      for (let x = 0; x < 3; x += 1) {
        const mark = marksBoard.find((mark) => mark.x === x && mark.y === y)
        expect(mark).toBeDefined()
        expect(mark!.player).not.toBeDefined()
      }
    }
  })
})
