import { BoardMark } from '../domain/types/board-mark';
import {sortMarks} from "../domain/utils/sort-marks";

describe('sort-marks', () => {
  test('should properly order a 2x2 array of marks', () => {
    const marks: BoardMark[] = [
      { x: 1, y: 0},
      { x: 1, y: 1},
      { x: 0, y: 0},
      { x: 0, y: 1}
    ]
    const orderedMarks = marks.slice(0).sort(sortMarks)
    expect(orderedMarks[0]).toEqual({ y: 0, x: 0 })
    expect(orderedMarks[1]).toEqual({ y: 0, x: 1 })
    expect(orderedMarks[2]).toEqual({ y: 1, x: 0 })
    expect(orderedMarks[3]).toEqual({ y: 1, x: 1 })
  })
  test('should properly order a 3x3 array of marks', () => {
    const marks: BoardMark[] = [
      { y: 1, x: 2 },
      { y: 0, x: 1 },
      { y: 1, x: 1 },
      { y: 0, x: 0 },
      { y: 2, x: 2 },
      { y: 1, x: 0 },
      { y: 2, x: 0 },
      { y: 2, x: 1 },
      { y: 0, x: 2 },
    ]
    const orderedMarks = marks.slice(0).sort(sortMarks)
    expect(orderedMarks[0]).toEqual({ y: 0, x: 0 })
    expect(orderedMarks[1]).toEqual({ y: 0, x: 1 })
    expect(orderedMarks[2]).toEqual({ y: 0, x: 2 })
    expect(orderedMarks[3]).toEqual({ y: 1, x: 0 })
    expect(orderedMarks[4]).toEqual({ y: 1, x: 1 })
    expect(orderedMarks[5]).toEqual({ y: 1, x: 2 })
    expect(orderedMarks[6]).toEqual({ y: 2, x: 0 })
    expect(orderedMarks[7]).toEqual({ y: 2, x: 1 })
    expect(orderedMarks[8]).toEqual({ y: 2, x: 2 })
  })
})
