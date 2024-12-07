import './App.css';
import { Login } from './components/login';

import {
  createBrowserRouter,
  Router,
  RouterProvider
} from "react-router-dom"
import { RegisterParticipant } from './participants/RegisterParticipant';
import { CreateEvent } from './admins/CreateEvents';
import { Dashboard } from './admins/Dashboard';
import { ListUsers } from './components/ListUsers';
import { ListEvents } from './components/ListEvents';
import { ListTeams } from './components/ListTeams';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },
  {
    path: "/home",
    element: <Dashboard/>
  },
  {
    path: "/user/list",
    element: <ListUsers/>
  },
  {
    path: "/event/list",
    element: <ListEvents/>
  },
  {
    path: "/team/list",
    element: <ListTeams/>
  },
  {
    path: "/register",
    element: <RegisterParticipant/>
  },
  {
    path: "/recover-password",
    element: <div>Hola desde pocoyo</div>
  },
  {
    path: "/create/event",
    element: <CreateEvent/>
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
