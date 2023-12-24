import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import ErrorPage from "./Components/ErrorPage.jsx";
import SecondPage from "./Components/SecondPage.jsx";
import Login from "./Components/Login.jsx";
import Signup from "./Components/Signup.jsx";

import "./styles/main.css";
import UserProfile from "./Components/UserProfile.jsx";
import UserStatistic from "./Components/UserStatistic.jsx";
import Quize from "./Components/Quize/Quize.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "main/",
    element: (
      <div>
        <SecondPage></SecondPage>
      </div>
    ),
  },
  {
    path: "main/quize",
    element: (
      <div>
        <Quize></Quize>
      </div>
    ),
  },
  {
    path: "main/userstat",
    element: (
      <div>
        <UserStatistic></UserStatistic>
      </div>
    ),
  },
  {
    path: "main/userprofile",
    element: (
      <div>
        <UserProfile></UserProfile>
      </div>
    ),
  },
  {
    path: "login/",
    element: (
      <div>
        <Login></Login>
      </div>
    ),
  },
  {
    path: "signup/",
    element: (
      <div>
        <Signup></Signup>
      </div>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
