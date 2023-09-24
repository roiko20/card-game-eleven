import React from 'react';
import GameBoard from './components/GameBoard';
import './style.css';
import { ThemeProvider } from 'styled-components';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <h1 className='text-4xl text-center mb-8'>Eleven Card Game</h1> */}
      <GameBoard />
    </ThemeProvider>
  );
}

export default App;
