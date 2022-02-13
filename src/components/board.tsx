import {useCallback} from "react";
import {BoardMark} from "../domain/types/board-mark";
import {Player} from "../domain/types/player";
import { defaultMarksText } from "../domain/utils/default-mark-text";

export type BoardProps = {
  marks: BoardMark[]
  marksText?: Record<Player, string>
  onMarkClick?: (mark: BoardMark) => void
}

export const Board = (props: BoardProps): JSX.Element => {
  const { marks, onMarkClick, marksText = defaultMarksText } = props
  const createClickHandlerFor = useCallback((mark: BoardMark) => {
    return () => onMarkClick?.(mark)
  }, [onMarkClick])

  return <div className="Board" data-testid="Board">
        {marks.map((boardMark) => {
          const { player } = boardMark
          const handleClick = createClickHandlerFor(boardMark)
          return (
            <div
              className="BoardMark"
              key={`x${boardMark.x}, y${boardMark.y}`}
              data-testid={`x${boardMark.x}, y${boardMark.y}`}
              onClick={handleClick}
            >
              {player ? marksText[player] : ' '}
            </div>
          )
        })}
      </div>
}
