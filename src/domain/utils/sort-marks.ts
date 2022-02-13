import { BoardMark } from "../types/board-mark";

export const sortMarks = ({ x: x1, y: y1 }: BoardMark, { x: x2, y: y2 }: BoardMark): number => ((y1 - y2) * 3) + (x1 - x2)
