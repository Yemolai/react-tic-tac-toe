import { useCallback, useEffect, useMemo, useState } from 'react';
import { Board } from '../components/board';
import { checkForDraw } from '../domain/conditions/check-for-draw';
import { checkForWin } from '../domain/conditions/check-for-win';
import { defaultMarksText } from '../domain/constants/default-mark-text';
import { PLAYER_A, PLAYER_B } from '../domain/constants/players';
import { generateMarks } from '../domain/utils/generate-marks';
import { sortMarks } from '../domain/utils/sort-marks';
import { BoardMark } from '../domain/types/board-mark';
import { Player } from "../domain/types/player";
import {replaceStr} from "../domain/utils/replace-str";

import getI18n from "../domain/constants/i18n";

const i18n = getI18n()

export const GamePage = (): JSX.Element => {
  const [playing, setPlaying] = useState<boolean>(false)
  const [playerTurn, setPlayerTurn] = useState<Player>(PLAYER_A)
  const [marks, setMarks] = useState<BoardMark[]>(generateMarks())

  const orderedMarks = useMemo(() => marks.slice(0).sort(sortMarks), [marks])

  const playerTurnMessage = useMemo<string>(() => {
    const markText = defaultMarksText[playerTurn]
    const dict = { player: `${playerTurn} ${markText}` }
    return replaceStr(i18n.playerTurn, dict)
  }, [playerTurn])

  const playOn = useCallback((mark: BoardMark) => {
    if (!!mark.player || playing) return
    setPlaying(true)
    const newMarks = [
      ...marks.slice(0).filter(m => m !== mark),
      {...mark, player: playerTurn},
    ]
    setMarks(newMarks)
    setPlayerTurn(prevState => prevState === PLAYER_A ? PLAYER_B : PLAYER_A)
    setPlaying(false)
  }, [marks, playerTurn, playing])

  useEffect(() => {
    const winner = checkForWin(orderedMarks)
    if (winner || checkForDraw(orderedMarks)) {
      if (winner) {
        alert(replaceStr(i18n.gameWinMessage, { player: winner }))
      } else {
        alert(i18n.gameDrawMessage)
      }
      setMarks(generateMarks())
      setPlayerTurn(PLAYER_A)
    }
  }, [orderedMarks, playerTurn])

  return (
    <div className="App" data-testid="App">
      <p>{playerTurnMessage}</p>
      <Board marks={orderedMarks} onMarkClick={playOn} />
    </div>
  );
}
