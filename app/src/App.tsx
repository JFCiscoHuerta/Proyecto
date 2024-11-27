import './App.css';
import { Login } from './components/login';

import {
  createBrowserRouter,
  Router,
  RouterProvider
} from "react-router-dom"
import { RegisterParticipant } from './participants/RegisterParticipant';
import { CreateEvent } from './admins/CreateEvents';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
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
    path: "/register-event",
    element: <CreateEvent/>
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
