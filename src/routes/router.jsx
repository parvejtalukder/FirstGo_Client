import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root/Root";
import Home from "../pages/Home/Home/Home";
import Error from "../pages/Error/Error";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layouts/Auth/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import BeARider from "../pages/BeARider/BeARider";
import SendAPercel from "../pages/SendAPercel/SendAPercel";
// import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error></Error>,
    Component: Root,
    children: [
        {index: true, Component: Home},
        {
          path: "be-rider",
          element: <PrivateRoute><BeARider></BeARider></PrivateRoute>
        },
        {
          path: "send-percel",
          element: <PrivateRoute><SendAPercel></SendAPercel></PrivateRoute>
        }
        ,
        {
          path: "/coverage", 
          Component: Coverage,
          loader: () => fetch("/locations.json").then(res => res.json())
        }
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login
      },
      {
        path: "/register",
        Component: Register
      }
    ]
  }
]);