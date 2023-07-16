import { createBrowserRouter } from 'react-router-dom';
import Register from '../pages/authentication/Register';
import Login from '../pages/authentication/Login';
import Layout from '../Layout';
import Home from '../pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);
