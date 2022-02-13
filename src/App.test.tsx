import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from './App';

describe("App component", () => {
  beforeEach(() => render(<App />))

  /**
   * Testing the App, Board and its Marks rendering
   */
  test('should render the App', () => {
    const appElement = screen.getByTestId(/App/i);
  
    expect(appElement).toBeInTheDocument();
  });

  test('should render the App with the className App', () => {
    const boardElement = screen.getByTestId(/App/i);
  
    expect(boardElement).toHaveClass("App");
  });

  test('should render the board', () => {
    const boardElement = screen.getByTestId(/Board/i);
  
    expect(boardElement).toBeInTheDocument();
  });

  test('should render the board with the className Board', () => {
    const boardElement = screen.getByTestId(/Board/i);
  
    expect(boardElement).toHaveClass("Board");
  });

  test('should render the board with 9 board marks', () => {
    const boardElement = screen.getByTestId(/Board/i);
    const boardMarks = boardElement.childNodes;
  
    expect(boardMarks.length).toBe(9);
  });

  test('should render board marks with the className BoardMark', () => {
    const boardElement = screen.getByTestId(/Board/i);
    const boardMarks = boardElement.childNodes;
  
    Array.from(boardMarks, boardMark =>  expect(boardMark).toHaveClass("BoardMark"));
  });

  /**
   * Testing the Tic Tac Toe rules
   */
  test('should set Player A with the first turn', () => {
    const title = screen.getByText("Player A ❌ turn:")
    
    expect(title).toBeInTheDocument();
  });

  test('should set Player B with the second turn', () => {
    const firstBoardMark = screen.getByTestId(/x0, y0/i);
    let playerATurnTitle = screen.queryByText("Player A ❌ turn:")
    let playerBTurnTitle = screen.queryByText("Player B ⭕ turn:")

    expect(playerATurnTitle).toBeInTheDocument();
    expect(playerBTurnTitle).not.toBeInTheDocument();

    userEvent.click(firstBoardMark);

    playerATurnTitle = screen.queryByText("Player A ❌ turn:")
    playerBTurnTitle = screen.queryByText("Player B ⭕ turn:")
    
    expect(playerBTurnTitle).toBeInTheDocument();
    expect(playerATurnTitle).not.toBeInTheDocument();
  });

  test('should Player A win when filling the first row', () => {
    const winAlert = jest.spyOn(window, 'alert').mockImplementation();
    const playerAPlays = [/x0, y0/i, /x0, y1/i, /x0, y2/i]
    const playerBPlays = [/x1, y0/i, /x1, y1/i]

    simulatePlayersPlaying(playerAPlays, playerBPlays);

    expect(winAlert).toHaveBeenCalledTimes(1);
    expect(winAlert).toHaveBeenCalledWith(expect.stringMatching(`Player A won! Congrats!`));
  });

  test('should Player A win when filling the second row', () => {
    const winAlert = jest.spyOn(window, 'alert').mockImplementation();
    const playerAPlays = [/x1, y0/i, /x1, y1/i, /x1, y2/i]
    const playerBPlays = [/x0, y0/i, /x0, y1/i]

    simulatePlayersPlaying(playerAPlays, playerBPlays);

    expect(winAlert).toHaveBeenCalledTimes(1);
    expect(winAlert).toHaveBeenCalledWith(expect.stringMatching(`Player A won! Congrats!`));
  });

  test('should Player A win when filling the third row', () => {
    const winAlert = jest.spyOn(window, 'alert').mockImplementation();
    const playerAPlays = [/x2, y0/i, /x2, y1/i, /x2, y2/i]
    const playerBPlays = [/x1, y0/i, /x1, y1/i]

    simulatePlayersPlaying(playerAPlays, playerBPlays);

    expect(winAlert).toHaveBeenCalledTimes(1);
    expect(winAlert).toHaveBeenCalledWith(expect.stringMatching(`Player A won! Congrats!`));
  });

  test('should Player B win when filling the first row', () => {
    const winAlert = jest.spyOn(window, 'alert').mockImplementation();
    const playerAPlays = [/x1, y0/i, /x2, y1/i, /x2, y2/i]
    const playerBPlays = [/x0, y0/i, /x0, y1/i, /x0, y2/i]

    simulatePlayersPlaying(playerAPlays, playerBPlays);

    expect(winAlert).toHaveBeenCalledTimes(1);
    expect(winAlert).toHaveBeenCalledWith(expect.stringMatching(`Player B won! Congrats!`));
  });

  test('should Player B win when filling the second row', () => {
    const winAlert = jest.spyOn(window, 'alert').mockImplementation();
    const playerAPlays = [/x0, y0/i, /x2, y1/i, /x0, y2/i]
    const playerBPlays = [/x1, y0/i, /x1, y1/i, /x1, y2/i]

    simulatePlayersPlaying(playerAPlays, playerBPlays);

    expect(winAlert).toHaveBeenCalledTimes(1);
    expect(winAlert).toHaveBeenCalledWith(expect.stringMatching(`Player B won! Congrats!`));
  });

  test('should Player B win when filling the third row', () => {
    const winAlert = jest.spyOn(window, 'alert').mockImplementation();
    const playerAPlays = [/x1, y0/i, /x0, y1/i, /x1, y2/i]
    const playerBPlays = [/x2, y0/i, /x2, y1/i, /x2, y2/i]

    simulatePlayersPlaying(playerAPlays, playerBPlays);

    expect(winAlert).toHaveBeenCalledTimes(1);
    expect(winAlert).toHaveBeenCalledWith(expect.stringMatching(`Player B won! Congrats!`));
  });
})

const simulatePlayersPlaying = (playerAPlays: RegExp[], playerBPlays: RegExp[]) => {
  let boardMark;

  playerAPlays.forEach((playerAPlay, index) => {
    boardMark = screen.getByTestId(playerAPlay);
    userEvent.click(boardMark);

    if (playerBPlays[index] !== undefined) {
      boardMark = screen.getByTestId(playerBPlays[index]);
      userEvent.click(boardMark);
    }
  });
}