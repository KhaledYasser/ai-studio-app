/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * React Router Configuration for Game Pages
 * This file sets up URL-based routing for each game's dedicated page
 * 
 * Usage:
 * 1. Install React Router: npm install react-router-dom
 * 2. Replace your main.tsx with content from main-with-router.tsx
 * 3. Use this as your RouterProvider config
 */

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import GamePageRoute from './pages/GamePageRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/games/:gameId',
    element: <GamePageRoute />,
    errorElement: <div className="text-center py-20">Game not found. <a href="/" className="text-blue-600">Back to home</a></div>,
  },
  // Individual game routes (optional - for direct links)
  {
    path: '/games/invadors',
    element: <GamePageRoute />,
  },
  {
    path: '/games/2048',
    element: <GamePageRoute />,
  },
  {
    path: '/games/flappy-bird',
    element: <GamePageRoute />,
  },
  {
    path: '/games/snake',
    element: <GamePageRoute />,
  },
  {
    path: '/games/tetris',
    element: <GamePageRoute />,
  },
  {
    path: '/games/slimy',
    element: <GamePageRoute />,
  },
]);

export function RootRouter() {
  return <RouterProvider router={router} />;
}
