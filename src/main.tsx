import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import GamePageRoute from './pages/GamePageRoute.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/games/:gameId',
    element: <GamePageRoute />,
    errorElement: <div className="text-center py-20">Game not found. <a href="/" className="text-blue-600">Back to home</a></div>,
  },
  {
    path: '*',
    element: <App />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
