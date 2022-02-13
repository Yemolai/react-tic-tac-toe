import React from 'react';
import { render, screen, within } from '@testing-library/react';
import App from './App';

describe("App component", () => {
  test('should render the App', () => {
    render(<App />);
    const appElement = screen.getByTestId(/App/i);
  
    expect(appElement).toBeInTheDocument();
  });

  test('should render the board', () => {
    render(<App />);
    const boardElement = screen.getByTestId(/Board/i);
  
    expect(boardElement).toBeInTheDocument();
  });

  test('should render the board with the className Board', () => {
    render(<App />);
    const boardElement = screen.getByTestId(/Board/i);
  
    expect(boardElement).toHaveClass("Board");
  });

  test('should render the board with 9 board marks', () => {
    render(<App />);
    const boardElement = screen.getByTestId(/Board/i);
    const boardMarks = boardElement.childNodes
  
    expect(boardMarks.length).toBe(9);
  });

  test('should set Player A with the first turn', () => {
    render(<App />);

    const title = screen.getByText("Player A ❌ turn:")
    
    expect(title).toBeInTheDocument();
  });

})

