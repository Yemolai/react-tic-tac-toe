import React from 'react';
import { render, screen, within } from '@testing-library/react';
import App from './App';

describe("App component", () => {
  beforeEach(() => render(<App />))

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
    const boardMarks = boardElement.childNodes
  
    expect(boardMarks.length).toBe(9);
  });

  test('should render board marks with the className BoardMark', () => {
    const boardElement = screen.getByTestId(/Board/i);
    const boardMarks = boardElement.childNodes;
  
    Array.from(boardMarks, boardMark =>  expect(boardMark).toHaveClass("BoardMark"));
  });

  test('should set Player A with the first turn', () => {
    const title = screen.getByText("Player A ❌ turn:")
    
    expect(title).toBeInTheDocument();
  });

})

