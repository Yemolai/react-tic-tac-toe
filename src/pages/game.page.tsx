import { useCallback, useEffect, useMemo, useState } from 'react';
import { Board } from '../components/board';
import { checkForDraw } from '../domain/conditions/check-for-draw';
import { checkForWin } from '../domain/conditions/check-for-win';
import { defaultMarksText } from '../domain/utils/default-mark-text';
import { generateMarks } from '../domain/utils/generate-marks';
import { sortMarks } from '../domain/utils/sort-marks';
import { BoardMark } from '../domain/types/board-mark';

export const GamePage = (): JSX.Element => {
  const [playing, setPlaying] = useState<boolean>(false)
  const [playerTurn, setPlayerTurn] = useState<'A' | 'B'>('A')
  const [marks, setMarks] = useState<BoardMark[]>(generateMarks())

  const orderedMarks = useMemo(() => marks.slice(0).sort(sortMarks), [marks])

  const playOn = useCallback((mark: BoardMark) => {
    if (!!mark.player || playing) return
    setPlaying(true)
    const newMarks = [
      ...marks.slice(0).filter(m => m !== mark),
      {...mark, player: playerTurn},
    ]
    setMarks(newMarks)
    setPlayerTurn(prevState => prevState === 'A' ? 'B' : 'A')
    setPlaying(false)
  }, [marks, playerTurn, playing])

  useEffect(() => {
    const winner = checkForWin(orderedMarks)
    if (winner || checkForDraw(orderedMarks)) {
      if (winner) {
        alert(`Player ${winner} won! Congrats!`)
      } else {
        alert(`Game over! No one win. It's a DRAW!`)
      }
      setMarks(generateMarks())
      setPlayerTurn('A')
    }
  }, [orderedMarks, playerTurn])

  return (
    <div className="App" data-testid="App">
      <p>Player {playerTurn} {defaultMarksText[playerTurn]} turn:</p>
      <Board marks={orderedMarks} onMarkClick={playOn} />
    </div>
  );
}
