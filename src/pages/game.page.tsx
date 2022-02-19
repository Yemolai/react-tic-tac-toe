import { useCallback, useEffect, useMemo, useState } from 'react';
import { Board } from '../components/board';
import { checkForGameOver } from '../domain/conditions/check-for-game-over';
import { defaultMarksText } from '../domain/constants/default-mark-text';
import { PLAYER_A, PLAYER_B } from '../domain/constants/players';
import { generateMarks } from '../domain/utils/generate-marks';
import { sortMarks } from '../domain/utils/sort-marks';
import { BoardMark } from '../domain/types/board-mark';
import { Player } from "../domain/types/player";
import { GameOptions } from '../domain/types/game-options';
import { playOnBoard } from "../domain/utils/play-on-board";
import { SOLO_STORAGE_KEY } from "../domain/constants/solo-storage-key";

export const GamePage = (): JSX.Element => {
  const [playing, setPlaying] = useState<boolean>(false)
  const [playerTurn, setPlayerTurn] = useState<Player>(PLAYER_A)
  const [marks, setMarks] = useState<BoardMark[]>(generateMarks())
  const [options, setOptions] = useState<GameOptions>({ diagonals: true })

  const orderedMarks = useMemo(() => marks.slice(0).sort(sortMarks), [marks])
  const startedPlaying = useMemo(() => marks.some(({ player }) => player), [marks])

  useEffect(() => {
    const rawOptions = localStorage.getItem(SOLO_STORAGE_KEY) || '{}'
    try {
      const savedOptions: GameOptions = JSON.parse(rawOptions)
      setOptions(savedOptions)
    } catch (err) {
      console.warn('Incompatible saved options format')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(SOLO_STORAGE_KEY, JSON.stringify(options))
  }, [options])

  const handleToggleDiagonal = useCallback(() => {
    if (startedPlaying) return
    setOptions(prevOptions => ({ ...prevOptions, diagonals: !prevOptions?.diagonals }))
  }, [startedPlaying, setOptions])

  const playOn = useCallback((mark: BoardMark) => {
    if (playing) return
    setPlaying(true)
    const play = playOnBoard(marks, playerTurn, mark)
    if (!play.error) {
      setMarks(play.board)
      setPlayerTurn(prevState => prevState === PLAYER_A ? PLAYER_B : PLAYER_A)
    }
    setPlaying(false)
  }, [marks, playerTurn, playing])

  useEffect(() => {
    switch (checkForGameOver(orderedMarks, options)) {
      case PLAYER_A:
        alert(`Player A won! Congrats!`)
        break;
      case PLAYER_B:
        alert(`Player B won! Congrats!`)
        break;
      case 'draw':
        alert(`Game over! No one win. It's a DRAW!`)
        break;
      default:
        return
    }
    setMarks(generateMarks())
    setPlayerTurn(PLAYER_A)
  }, [orderedMarks, playerTurn, options])

  return (
    <div className="App" data-testid="App">
      <div className="header-line">
        <p><b>Tic Tac Toe</b> Solo Game</p>
        <p>Player {playerTurn} {defaultMarksText[playerTurn]} turn:</p>
        <p className="diagonal-option-toggle">
          <input type="checkbox" disabled={startedPlaying} onClick={handleToggleDiagonal} checked={!!options?.diagonals} />
          <span>Allow Diagonal Win</span>
        </p>
      </div>
      <Board marks={orderedMarks} onMarkClick={playOn} />
    </div>
  );
}
