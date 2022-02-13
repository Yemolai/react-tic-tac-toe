import { BoardMark } from "../types/board-mark";

export const generateMarks = (): BoardMark[] => new Array(9).fill(0).map((_, idx) => ({
  x: idx % 3,
  y: Math.floor(idx / 3)
} as BoardMark))
