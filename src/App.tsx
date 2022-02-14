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
  const positions: Position[] = [0, 1, 2];
  const rows: BoardMark[][] = positions.map(index => board.filter(({ x }) => x === index));
  const columns: BoardMark[][] = positions.map(index => board.filter(({ y }) => y === index));

  const hasPlayerAMatch = hasPlayerMatch('A', rows, columns);

  if (hasPlayerAMatch) {
    return 'A';
  }

  const hasPlayerBMatch = hasPlayerMatch('B', rows, columns);

  if (hasPlayerBMatch) {
    return 'B';
  }
  
  return null
}

const hasPlayerMatch = (player: Player, rows: BoardMark[][], columns: BoardMark[][]): boolean => {
  const hasPlayerMatchARow: boolean = hasPlayerMatchARowOrAColumn(player, rows);
  const hasPlayerMatchAColumn: boolean = hasPlayerMatchARowOrAColumn(player, columns);

  return hasPlayerMatchARow || hasPlayerMatchAColumn
}

const hasPlayerMatchARowOrAColumn = (player: Player, rowsOrColumns: BoardMark[][]): boolean => {
  return rowsOrColumns.some(rowOrColumn => hasAMatch(player, rowOrColumn));
}

const hasPlayerMatchAnyDiagonal = (player: Player, rows: BoardMark[][]): boolean => {
  const topLeftToBottomRightDiagonalBoardMarks: BoardMark[] = [
    {x: 0, y: 0},
    {x: 1, y: 1},
    {x: 2, y: 2}
  ]
  
  const bottomLeftToTopRightDiagonalBoardMarks: BoardMark[] = [
    {x: 2, y: 0},
    {x: 1, y: 1},
    {x: 0, y: 2}
  ]

  const upperLeftToBottomRightDiagonal: BoardMark[] = getDiagonalBoardMarks(player, rows, topLeftToBottomRightDiagonalBoardMarks);
  const bottomLeftToTopRightDiagonal: BoardMark[] = getDiagonalBoardMarks(player, rows, bottomLeftToTopRightDiagonalBoardMarks);

  return hasAMatch(player, upperLeftToBottomRightDiagonal) || hasAMatch(player, bottomLeftToTopRightDiagonal)
}

const getDiagonalBoardMarks = (player: Player, rows: BoardMark[][], diagonalRule: BoardMark[]): BoardMark[] => {
  return rows.map(row => {
    return row.find(boardMark => diagonalRule.some(diagonalMark => diagonalMark.x === boardMark.x && diagonalMark.y === boardMark.y))
  }) as BoardMark[];
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
    <div className="App" data-testid="App">
      <p>Player {playerTurn} {playerMark[playerTurn]} turn:</p>
      <div className="Board" data-testid="Board">
        {orderedMarks.map((boardMark) => {
          const { player } = boardMark
          return (
            <div
              className="BoardMark"
              key={`x${boardMark.x}, y${boardMark.y}`}
              data-testid={`x${boardMark.x}, y${boardMark.y}`}
              onClick={() => playOn(boardMark)}
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
