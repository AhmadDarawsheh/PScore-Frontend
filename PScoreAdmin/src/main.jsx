import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./index.css";
import {
  createBrowserRouter,
  Link,
  Outlet,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import AdminRoot from "./routes/AdminRoot.jsx";
import Dashboard from "./components/Dashboard.jsx";
import {
  SidebarBottomData,
  SidebarTopData,
} from "./lib/constants/navigation.jsx";
import MainRoot from "./routes/MainRoot.jsx";
import Login from "./components/mainPage/Login.jsx";
import Main from "./components/mainPage/Main.jsx";
import { AuthProvider } from "./contexts/AuthContext";

const SidebarData = [...SidebarTopData, ...SidebarBottomData];

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRoot />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminRoot />,
    children: SidebarData.map((item) => ({
      path: item.path,
      element: <>{item.component}</>,
    })),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
