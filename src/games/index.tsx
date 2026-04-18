import React from 'react';
import SnakeGame from './snake/Game';
import InvadorsGame from './invadors/Game';
import TetrisGame from './tetris/Game';
import Game2048 from './2048/Game';
import FlappyBirdGame from './flappy-bird/Game';
import SlimyGame from './slimy/Game';

export const GAME_COMPONENTS: Record<string, React.FC> = {
  snake: SnakeGame,
  invadors: InvadorsGame,
  tetris: TetrisGame,
  '2048': Game2048,
  'flappy-bird': FlappyBirdGame,
  slimy: SlimyGame,
};
