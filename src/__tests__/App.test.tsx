import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from '../App';

const APP_TEST_ID: RegExp = /App/i;
const BOARD_TEST_ID: RegExp = /Board/i;

const PLAYER_A_TURN_BOARD_TITLE: string = 'Player A ❌ turn:';
const PLAYER_B_TURN_BOARD_TITLE: string = 'Player B ⭕ turn:';

const DRAW_MESSAGE: string = `Game over! No one win. It's a DRAW!`;
const PLAYER_A_WIN_ALERT_TITLE: string = `Player A won! Congrats!`;
const PLAYER_B_WIN_ALERT_TITLE: string = `Player B won! Congrats!`;

const FIRST_ROW_MARKS: RegExp[] = [/x0, y0/i, /x0, y1/i, /x0, y2/i];
const SECOND_ROW_MARKS: RegExp[] = [/x1, y0/i, /x1, y1/i, /x1, y2/i];
const THIRD_ROW_MARKS: RegExp[] = [/x2, y0/i, /x2, y1/i, /x2, y2/i];

const FIRST_COLUMN_MARKS: RegExp[] = [/x0, y0/i, /x0, y1/i, /x0, y2/i];
const SECOND_COLUMN_MARKS: RegExp[] = [/x1, y0/i, /x1, y1/i, /x1, y2/i];
const THIRD_COLUMN_MARKS: RegExp[] = [/x2, y0/i, /x2, y1/i, /x2, y2/i];

const DIAGONAL_FROM_X0_Y0_MARK: RegExp[] = [/x0, y0/i, /x1, y1/i, /x2, y2/i];
const DIAGONAL_FROM_X2_Y0_MARK: RegExp[] = [/x2, y0/i, /x1, y1/i, /x0, y2/i];

describe("App component", () => {
  const setup = () => render(<App />)
  /**
   * Testing the App, Board and its Marks rendering
   */
  test('should render the App', () => {
    setup();
    const appElement = screen.getByTestId(APP_TEST_ID);

    expect(appElement).toBeInTheDocument();
  });

  test('should render the App with the className App', () => {
    setup();
    const boardElement = screen.getByTestId(APP_TEST_ID);

    expect(boardElement).toHaveClass("App");
  });

  test('should render the board', () => {
    setup();
    const boardElement = screen.getByTestId(BOARD_TEST_ID);

    expect(boardElement).toBeInTheDocument();
  });

  test('should render the board with the className Board', () => {
    setup();
    const boardElement = screen.getByTestId(BOARD_TEST_ID);

    expect(boardElement).toHaveClass("Board");
  });

  test('should render the board with 9 board marks', () => {
    setup();
    const boardElement = screen.getByTestId(BOARD_TEST_ID);
    const boardMarks = boardElement.childNodes;

    expect(boardMarks.length).toBe(9);
  });

  test('should render board marks with the className BoardMark', () => {
    setup();
    const boardElement = screen.getByTestId(BOARD_TEST_ID);
    const boardMarks = boardElement.childNodes;

    Array.from(boardMarks, boardMark =>  expect(boardMark).toHaveClass("BoardMark"));
  });

  /**
   * Testing the Tic Tac Toe rules
   */
  test('should set Player A with the first turn', () => {
    setup();
    const title = screen.getByText(PLAYER_A_TURN_BOARD_TITLE);

    expect(title).toBeInTheDocument();
  });

  test('should set Player B with the second turn', () => {
    setup();
    const firstBoardMark = screen.getByTestId(/x0, y0/i);
    let playerATurnTitle = screen.queryByText(PLAYER_A_TURN_BOARD_TITLE);
    let playerBTurnTitle = screen.queryByText(PLAYER_B_TURN_BOARD_TITLE);

    expect(playerATurnTitle).toBeInTheDocument();
    expect(playerBTurnTitle).not.toBeInTheDocument();

    userEvent.click(firstBoardMark);

    playerATurnTitle = screen.queryByText(PLAYER_A_TURN_BOARD_TITLE);
    playerBTurnTitle = screen.queryByText(PLAYER_B_TURN_BOARD_TITLE);

    expect(playerBTurnTitle).toBeInTheDocument();
    expect(playerATurnTitle).not.toBeInTheDocument();
  });

  test('should an alert appear and Player A and Player B draw', () => {
    setup();
    const drawAlert = jest.spyOn(window, 'alert').mockImplementation();
    const playerAPlays = [/x0, y0/i, /x1, y1/i, /x0, y1/i, /x2, y0/i, /x1, y2/i];
    const playerBPlays = [/x1, y0/i, /x2, y2/i, /x0, y2/i, /x2, y1/i];

    simulatePlayersPlaying(playerAPlays, playerBPlays);

    expect(drawAlert).toHaveBeenCalledTimes(1);
    expect(drawAlert).toHaveBeenCalledWith(expect.stringMatching(DRAW_MESSAGE));
  });

  test('should an alert appear and Player A win when he/she marks the first row', () => {
    setup();
    const winAlert = jest.spyOn(window, 'alert').mockImplementation();
    const playerAPlays = FIRST_ROW_MARKS;
    const playerBPlays = [/x1, y0/i, /x1, y1/i];

    simulatePlayersPlaying(playerAPlays, playerBPlays);

    expect(winAlert).toHaveBeenCalledTimes(1);
    expect(winAlert).toHaveBeenCalledWith(expect.stringMatching(PLAYER_A_WIN_ALERT_TITLE));
  });

  test('should an alert appear and Player A win when he/she marks the second row', () => {
    setup();
    const winAlert = jest.spyOn(window, 'alert').mockImplementation();
    const playerAPlays = SECOND_ROW_MARKS;
    const playerBPlays = [/x0, y0/i, /x0, y1/i];

    simulatePlayersPlaying(playerAPlays, playerBPlays);

    expect(winAlert).toHaveBeenCalledTimes(1);
    expect(winAlert).toHaveBeenCalledWith(expect.stringMatching(PLAYER_A_WIN_ALERT_TITLE));
  });

  test('should an alert appear and Player A win when he/she marks the third row', () => {
    setup();
    const winAlert = jest.spyOn(window, 'alert').mockImplementation();
    const playerAPlays = THIRD_ROW_MARKS;
    const playerBPlays = [/x1, y0/i, /x1, y1/i];

    simulatePlayersPlaying(playerAPlays, playerBPlays);

    expect(winAlert).toHaveBeenCalledTimes(1);
    expect(winAlert).toHaveBeenCalledWith(expect.stringMatching(PLAYER_A_WIN_ALERT_TITLE));
  });

  test('should an alert appear and Player B win when he/she marks the first row', () => {
    setup();
    const winAlert = jest.spyOn(window, 'alert').mockImplementation();
    const playerAPlays = [/x1, y0/i, /x2, y1/i, /x2, y2/i];
    const playerBPlays = FIRST_ROW_MARKS;

    simulatePlayersPlaying(playerAPlays, playerBPlays);

    expect(winAlert).toHaveBeenCalledTimes(1);
    expect(winAlert).toHaveBeenCalledWith(expect.stringMatching(PLAYER_B_WIN_ALERT_TITLE));
  });

  test('should an alert appear and Player B win when he/she marks the second row', () => {
    setup();
    const winAlert = jest.spyOn(window, 'alert').mockImplementation();
    const playerAPlays = [/x0, y0/i, /x2, y1/i, /x0, y2/i];
    const playerBPlays = [/x1, y0/i, /x1, y1/i, /x1, y2/i];

    simulatePlayersPlaying(playerAPlays, playerBPlays);

    expect(winAlert).toHaveBeenCalledTimes(1);
    expect(winAlert).toHaveBeenCalledWith(expect.stringMatching(PLAYER_B_WIN_ALERT_TITLE));
  });

  test('should an alert appear and Player B win when he/she marks the third row', () => {
    setup();
    const winAlert = jest.spyOn(window, 'alert').mockImplementation();
    const playerAPlays = [/x1, y0/i, /x0, y1/i, /x1, y2/i];
    const playerBPlays = THIRD_ROW_MARKS;

    simulatePlayersPlaying(playerAPlays, playerBPlays);

    expect(winAlert).toHaveBeenCalledTimes(1);
    expect(winAlert).toHaveBeenCalledWith(expect.stringMatching(PLAYER_B_WIN_ALERT_TITLE));
  });

  test('should an alert appear and Player A win when he/she marks the first column', () => {
    setup();
    const winAlert = jest.spyOn(window, 'alert').mockImplementation();
    const playerAPlays = FIRST_COLUMN_MARKS;
    const playerBPlays = [/x1, y0/i, /x1, y1/i];

    simulatePlayersPlaying(playerAPlays, playerBPlays);

    expect(winAlert).toHaveBeenCalledTimes(1);
    expect(winAlert).toHaveBeenCalledWith(expect.stringMatching(PLAYER_A_WIN_ALERT_TITLE));
  });

  test('should an alert appear and Player A win when he/she marks the second column', () => {
    setup();
    const winAlert = jest.spyOn(window, 'alert').mockImplementation();
    const playerAPlays = SECOND_COLUMN_MARKS;
    const playerBPlays = [/x0, y0/i, /x0, y1/i];

    simulatePlayersPlaying(playerAPlays, playerBPlays);

    expect(winAlert).toHaveBeenCalledTimes(1);
    expect(winAlert).toHaveBeenCalledWith(expect.stringMatching(PLAYER_A_WIN_ALERT_TITLE));
  });

  test('should an alert appear and Player A win when he/she marks the third column', () => {
    setup();
    const winAlert = jest.spyOn(window, 'alert').mockImplementation();
    const playerAPlays = THIRD_COLUMN_MARKS;
    const playerBPlays = [/x1, y0/i, /x1, y1/i];

    simulatePlayersPlaying(playerAPlays, playerBPlays);

    expect(winAlert).toHaveBeenCalledTimes(1);
    expect(winAlert).toHaveBeenCalledWith(expect.stringMatching(PLAYER_A_WIN_ALERT_TITLE));
  });

  test('should an alert appear and Player B win when he/she marks the first column', () => {
    setup();
    const winAlert = jest.spyOn(window, 'alert').mockImplementation();
    const playerAPlays = [/x1, y0/i, /x2, y1/i, /x1, y2/i]
    const playerBPlays = FIRST_ROW_MARKS;

    simulatePlayersPlaying(playerAPlays, playerBPlays);

    expect(winAlert).toHaveBeenCalledTimes(1);
    expect(winAlert).toHaveBeenCalledWith(expect.stringMatching(PLAYER_B_WIN_ALERT_TITLE));
  });

  test('should an alert appear and Player B win when he/she marks the second column', () => {
    setup();
    const winAlert = jest.spyOn(window, 'alert').mockImplementation();
    const playerAPlays = [/x0, y0/i, /x0, y1/i, /x2, y2/i];
    const playerBPlays = SECOND_COLUMN_MARKS;

    simulatePlayersPlaying(playerAPlays, playerBPlays);

    expect(winAlert).toHaveBeenCalledTimes(1);
    expect(winAlert).toHaveBeenCalledWith(expect.stringMatching(PLAYER_B_WIN_ALERT_TITLE));
  });

  test('should an alert appear and Player B win when he/she marks the third column', () => {
    setup();
    const winAlert = jest.spyOn(window, 'alert').mockImplementation();
    const playerAPlays = [/x0, y0/i, /x0, y1/i, /x1, y2/i];
    const playerBPlays = THIRD_ROW_MARKS;

    simulatePlayersPlaying(playerAPlays, playerBPlays);

    expect(winAlert).toHaveBeenCalledTimes(1);
    expect(winAlert).toHaveBeenCalledWith(expect.stringMatching(PLAYER_B_WIN_ALERT_TITLE));
  });

   /**
   * These tests below about must be disabled before deciding how the rule of winning through diagonal
   * board marks will be displayed on the screen.
   * 
   */
  // test('should an alert appear and Player A win when he/she marks a diagonal starting at the x0, y0', () => {
  //   const winAlert = jest.spyOn(window, 'alert').mockImplementation();
  //   const playerAPlays = DIAGONAL_FROM_X0_Y0_MARK;
  //   const playerBPlays = [/x0, y1/i, /x0, y2/i];

  //   simulatePlayersPlaying(playerAPlays, playerBPlays);

  //   expect(winAlert).toHaveBeenCalledTimes(0);
  // });

 
  // test('should an alert appear and Player A win when he/she marks a diagonal starting at the x0, y0', () => {
  //   const winAlert = jest.spyOn(window, 'alert').mockImplementation();
  //   const playerAPlays = DIAGONAL_FROM_X0_Y0_MARK;
  //   const playerBPlays = [/x0, y1/i, /x0, y2/i];

  //   simulatePlayersPlaying(playerAPlays, playerBPlays);

  //   expect(winAlert).toHaveBeenCalledTimes(1);
  //   expect(winAlert).toHaveBeenCalledWith(expect.stringMatching(PLAYER_A_WIN_ALERT_TITLE));
  // });

  // test('should an alert appear and Player A win when he/she marks a diagonal starting at the x2, y0', () => {
  //   const winAlert = jest.spyOn(window, 'alert').mockImplementation();
  //   const playerAPlays = DIAGONAL_FROM_X2_Y0_MARK;
  //   const playerBPlays = [/x0, y1/i, /x0, y0/i];

  //   simulatePlayersPlaying(playerAPlays, playerBPlays);

  //   expect(winAlert).toHaveBeenCalledTimes(1);
  //   expect(winAlert).toHaveBeenCalledWith(expect.stringMatching(PLAYER_A_WIN_ALERT_TITLE));
  // });

  // test('should an alert appear and Player B win when he/she marks a diagonal starting at the x0, y0', () => {
  //   const winAlert = jest.spyOn(window, 'alert').mockImplementation();
  //   const playerAPlays = [/x0, y1/i, /x0, y2/i, /x1, y0/i];
  //   const playerBPlays = DIAGONAL_FROM_X0_Y0_MARK;

  //   simulatePlayersPlaying(playerAPlays, playerBPlays);

  //   expect(winAlert).toHaveBeenCalledTimes(1);
  //   expect(winAlert).toHaveBeenCalledWith(expect.stringMatching(PLAYER_B_WIN_ALERT_TITLE));
  // });

  // test('should an alert appear and Player B win when he/she marks a diagonal starting at the x2, y0', () => {
  //   const winAlert = jest.spyOn(window, 'alert').mockImplementation();
  //   const playerAPlays = [/x0, y1/i, /x0, y0/i, /x1, y0/i];
  //   const playerBPlays = DIAGONAL_FROM_X2_Y0_MARK;

  //   simulatePlayersPlaying(playerAPlays, playerBPlays);

  //   expect(winAlert).toHaveBeenCalledTimes(1);
  //   expect(winAlert).toHaveBeenCalledWith(expect.stringMatching(PLAYER_B_WIN_ALERT_TITLE));
  // });
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
