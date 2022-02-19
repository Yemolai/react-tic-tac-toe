import { Link } from "react-router-dom"

export const LandingPage = (): JSX.Element => {
  return <>
    <h1>Tic tac toe</h1>
    <p>How you want to play?</p>
    <nav>
      <Link to="/solo">Play Solo</Link> | {' '}
      <Link to="/online">Play Online</Link>
    </nav>
  </>
}
