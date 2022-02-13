import React, {useCallback, useEffect} from 'react';
import './App.css';

type Position = 0 | 1 | 2

type Player = 'A' | 'B'

type BoardMark = {
  player?: Player
  x: Position,
  y: Position,
}

const playerMark: Record<Player, string> = {
  A: '❌',
  B: '⭕'
}

const generateMarks = (): BoardMark[] => new Array(9).fill(0).map((_, idx) => ({
  x: idx % 3,
  y: Math.floor(idx / 3)
} as BoardMark))

const sortByXAndY = ({ x: x1, y: y1 }: BoardMark, { x: x2, y: y2 }: BoardMark): number => ((y1 - y2) * 3) + (x1 - x2)

// eslint-disable-next-line eqeqeq
const hasAMatch = (player: Player, marks: BoardMark[]) => marks.every(({ player: p }) => p && player.toString() == p.toString())

const checkWinningCondition = (board: BoardMark[]): Player | null => {
  const positions: Position[] = [0, 1, 2]
  const rows: BoardMark[][] = positions.map(index => board.filter(({ x }) => x === index))
  const columns: BoardMark[][] = positions.map(index => board.filter(({ y }) => y === index))
  const playerAHaveARow = rows.some(row => hasAMatch('A', row))
  const playerAHaveACol = columns.some(col => hasAMatch('A', col))
  if (playerAHaveARow || playerAHaveACol) {
    return 'A'
  }
  const playerBHaveARow = rows.some(row => hasAMatch('B', row))
  const playerBHaveACol = columns.some(col => hasAMatch('B', col))
  if (playerBHaveARow || playerBHaveACol) {
    return 'B'
  }
  return null
}

const checkGameOverCondition = (board: BoardMark[]): boolean => {
  return board.every(({ player }) => !!player)
}

function App() {
  const [playing, setPlaying] = React.useState<boolean>(false)
  const [playerTurn, setPlayerTurn] = React.useState<'A' | 'B'>('A')
  const [marks, setMarks] = React.useState<BoardMark[]>(generateMarks())
  const orderedMarks = React.useMemo(() => marks.slice(0).sort(sortByXAndY), [marks])
  const playOn = useCallback((mark: BoardMark) => {
    if (!!mark.player || playing) return
    setPlaying(true)
    const newMarks = [...marks.slice(0).filter(m => m !== mark), {...mark, player: playerTurn}]
    setMarks(newMarks)
    setPlayerTurn(prevState => prevState === 'A' ? 'B' : 'A')
    setPlaying(false)
  }, [marks, playerTurn, playing])
  useEffect(() => {
    const winner = checkWinningCondition(orderedMarks)
    if (winner || checkGameOverCondition(orderedMarks)) {
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
    <div className="App" data-testId="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p>Player {playerTurn} {playerMark[playerTurn]} turn:</p>
      <div className="Board" data-testId="Board">
        {orderedMarks.map((boardMark) => {
          const { player } = boardMark
          return (
            <div
              onClick={() => playOn(boardMark)}
              style={{
                width: 'calc(calc(100% / 3) - 5px)',
                height: 'calc(calc(100% / 3) - 5px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '-2px',
                border: 'rgba(0, 0, 0, 0.5) 2px solid',
                fontSize: 'calc(var(--square-size, 600px) / 15)'
              }}
            >
              {player ? playerMark[player] : ' '}
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
