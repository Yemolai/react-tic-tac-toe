import { BoardMark } from "../types/board-mark";
import { Player } from "../types/player";

export const hasAMatch = (player: Player, marks: BoardMark[]) => marks.every(({ player: p }) => {
  // eslint-disable-next-line eqeqeq
  return p && player.toString() == p.toString()
})
