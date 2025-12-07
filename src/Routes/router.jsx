import { createBrowserRouter } from "react-router";
import Home from "../Layouts/AuthLayout/AuthLayout";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import Login from "../Auth/Login/Login";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Register from "../Auth/Register/Register";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import AddedBook from "../pages/AddedBook/AddedBook";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      
      
    ],
  },

  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register,
      }
    ]
  },

  {
    path: '/',
    Component: Dashboard,
    children:[
      {
        path: 'dashboard/addbook',
        Component: AddedBook,
      }
    ]

  }

]);
