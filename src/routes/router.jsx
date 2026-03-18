import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root/Root";
import Home from "../pages/Home/Home/Home";
import Error from "../pages/Error/Error";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layouts/Auth/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error></Error>,
    Component: Root,
    children: [
        {index: true, Component: Home},
        {
          path: "/coverage", 
          Component: Coverage,
          loader: () => fetch("/locations.json").then(res => res.json())
        }
        // {errorElement: <p>404</p>}
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