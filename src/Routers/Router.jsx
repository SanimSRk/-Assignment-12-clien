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
      // >>>>>>>>>>>>>tasks creator dashboard section>>>>>>>>>>>>>
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
      //>>>>>>>>>>>>>worker dashboard section>>>>>>>>>>>>>
      {
        path: 'workerHome',
        element: <WorkerHomes></WorkerHomes>,
      },
      {
        path: 'taskList',
        element: <TaskList></TaskList>,
      },

      {
        path: 'my-submission',
        element: <MySubmissions></MySubmissions>,
      },
      {
        path: 'withdrawals',
        element: <Withdrawals></Withdrawals>,
      },
      {
        path: 'tasksDeatils/:id',
        element: <TasksDeatils></TasksDeatils>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/tasksDeatils/${params?.id}`),
      },
      //>>>>>>>>>>>>>admin dashboard section>>>>>>>>>>>>>
      {
        path: 'adminHome',
        element: <AdminHomex></AdminHomex>,
      },
      {
        path: 'manageUser',
        element: <ManegeUser></ManegeUser>,
      },
      {
        path: 'manegaTasks',
        element: <ManageTasks></ManageTasks>,
      },
      {
        path: 'update-tasks/:id',
        element: <UpdateTasks></UpdateTasks>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/updateTasks/${params.id}`),
      },
    ],
  },
]);
