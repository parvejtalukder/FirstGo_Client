import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root/Root";
import Home from "../pages/Home/Home/Home";
import Error from "../pages/Error/Error";
import Coverage from "../pages/Coverage/Coverage";

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
]);