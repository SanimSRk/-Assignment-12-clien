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
import WorkerHomes from '../Pages/Home/Dashboard/WorkerDashboard/WorkerHome/WorkerHomes';
import MySubmissions from '../Pages/Home/Dashboard/WorkerDashboard/MySubmissions/MySubmissions';
import TaskList from '../Pages/Home/Dashboard/WorkerDashboard/TaskList/TaskList';
import Withdrawals from '../Pages/Home/Dashboard/WorkerDashboard/Withdrawals/Withdrawals';
import TasksDeatils from '../Pages/Home/Dashboard/WorkerDashboard/TaskList/TasksDeatils';
import AdminHomex from '../Pages/Home/Dashboard/AdminDashbord/AdminHome/AdminHomex';
import ManegeUser from '../Pages/Home/Dashboard/AdminDashbord/ManegeUser/ManegeUser';
import ManageTasks from '../Pages/Home/Dashboard/AdminDashbord/ManageTasks/ManageTasks';
import UpdateTasks from '../Pages/Home/Dashboard/WorkerDashboard/TaskList/UpdateTasks';
import PaymentsHistory from '../Pages/Home/Dashboard/CreatorDashboard/PaymentHostary/PaymentsHistory';
import PrivtedRouted from '../Compment/PrivtedRouted/PrivtedRouted';
import NotFounds from '../Compment/NotFoundPages/NotFounds';

export const router = createBrowserRouter([
  {
    path: '/',

    element: <MainLayout></MainLayout>,
    errorElement: <NotFounds></NotFounds>,
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
    errorElement: <NotFounds></NotFounds>,
    element: (
      <PrivtedRouted>
        <Dashboard></Dashboard>
      </PrivtedRouted>
    ),
    children: [
      // >>>>>>>>>>>>>tasks creator dashboard section>>>>>>>>>>>>>
      {
        path: 'creatorHome',
        element: (
          <PrivtedRouted>
            <CreatorHome></CreatorHome>
          </PrivtedRouted>
        ),
      },
      {
        path: 'addTasks',
        element: (
          <PrivtedRouted>
            <AddTask></AddTask>
          </PrivtedRouted>
        ),
      },
      {
        path: 'myTasks',
        element: (
          <PrivtedRouted>
            <Mytask></Mytask>
          </PrivtedRouted>
        ),
      },
      {
        path: 'purchas',
        element: (
          <PrivtedRouted>
            {' '}
            <PurchaseCoin></PurchaseCoin>
          </PrivtedRouted>
        ),
      },

      //>>>>>>>>>>>>>worker dashboard section>>>>>>>>>>>>>
      {
        path: 'workerHome',
        element: (
          <PrivtedRouted>
            <WorkerHomes></WorkerHomes>
          </PrivtedRouted>
        ),
      },
      {
        path: 'taskList',
        element: (
          <PrivtedRouted>
            <TaskList></TaskList>
          </PrivtedRouted>
        ),
      },

      {
        path: 'my-submission',
        element: (
          <PrivtedRouted>
            <MySubmissions></MySubmissions>
          </PrivtedRouted>
        ),
      },
      {
        path: 'withdrawals',
        element: (
          <PrivtedRouted>
            <Withdrawals></Withdrawals>
          </PrivtedRouted>
        ),
      },
      {
        path: 'tasksDeatils/:id',
        element: (
          <PrivtedRouted>
            <TasksDeatils></TasksDeatils>
          </PrivtedRouted>
        ),
        loader: ({ params }) =>
          fetch(
            `https://assignment-12-server-eight-alpha.vercel.app/tasksDeatils/${params?.id}`
          ),
      },
      //>>>>>>>>>>>>>admin dashboard section>>>>>>>>>>>>>
      {
        path: 'adminHome',
        element: (
          <PrivtedRouted>
            <AdminHomex></AdminHomex>
          </PrivtedRouted>
        ),
      },
      {
        path: 'manageUser',
        element: (
          <PrivtedRouted>
            <ManegeUser></ManegeUser>
          </PrivtedRouted>
        ),
      },
      {
        path: 'manegaTasks',
        element: (
          <PrivtedRouted>
            <ManageTasks></ManageTasks>
          </PrivtedRouted>
        ),
      },
      {
        path: 'update-tasks/:id',
        element: (
          <PrivtedRouted>
            <UpdateTasks></UpdateTasks>
          </PrivtedRouted>
        ),
        loader: ({ params }) =>
          fetch(
            `https://assignment-12-server-eight-alpha.vercel.app/updateTasks/${params.id}`
          ),
      },
      {
        path: 'payments/:id',
        element: (
          <PrivtedRouted>
            <Payments></Payments>
          </PrivtedRouted>
        ),
        loader: ({ params }) =>
          fetch(
            `https://assignment-12-server-eight-alpha.vercel.app/buy-cartId/${params.id}`
          ),
      },
      {
        path: 'paymentHistorys',
        element: (
          <PrivtedRouted>
            <PaymentsHistory></PaymentsHistory>
          </PrivtedRouted>
        ),
      },
    ],
  },
]);
