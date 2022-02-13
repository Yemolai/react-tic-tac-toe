import React from 'react';
import { render, screen } from '@testing-library/react';
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

  test('should set Player A with the first turn', () => {
    render(<App />);

    const title = screen.getByText("Player A ❌ turn:")
    
    expect(title).toBeInTheDocument();
  });

})

