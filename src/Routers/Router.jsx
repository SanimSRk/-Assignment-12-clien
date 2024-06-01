import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import Home from '../Pages/Home/Homes/Home';
import Registration from '../Compment/FormReleted/Registration';
import Login from '../Compment/FormReleted/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/register',
        element: <Registration></Registration>,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
    ],
  },
]);
