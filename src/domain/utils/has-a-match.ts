import { BoardMark } from "../types/board-mark";
import { Player } from "../types/player";

// eslint-disable-next-line eqeqeq
export const hasAMatch = (player: Player, marks: BoardMark[]) => marks.every(({ player: p }) => {
  return p && player.toString() == p.toString()
})
