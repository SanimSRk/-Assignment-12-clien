import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import Home from '../Pages/Home/Homes/Home';
import Registration from '../Compment/FormReleted/Registration';
import Login from '../Compment/FormReleted/Login';
import Dashboard from '../Pages/Home/Dashboard/DashboardLayout/Dashboard';
import CreatorHome from '../Pages/Home/Dashboard/CreatorDashboard/CreatorHome';
import AddTask from '../Pages/Home/Dashboard/CreatorDashboard/AddTask/AddTask';
import Mytask from '../Pages/Home/Dashboard/CreatorDashboard/MyTask/Mytask';
import PurchaseCoin from '../Pages/Home/Dashboard/CreatorDashboard/Purchase/PurchaseCoin';
import Payments from '../Pages/Home/Dashboard/CreatorDashboard/Payments/Payments';

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
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'creatorHome',
        element: <CreatorHome></CreatorHome>,
      },
      {
        path: 'addTasks',
        element: <AddTask></AddTask>,
      },
      {
        path: 'myTasks',
        element: <Mytask></Mytask>,
      },
      {
        path: 'purchas',
        element: <PurchaseCoin></PurchaseCoin>,
      },
      {
        path: 'paymentsHostry',
        element: <Payments></Payments>,
      },
    ],
  },
]);
