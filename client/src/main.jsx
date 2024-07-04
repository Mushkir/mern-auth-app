import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import TheGuestLayout from "./layouts/TheGuest.jsx";
import TheHomePage from "./pages/TheHomePage.jsx";
import TheSignUpPage from "./pages/TheSignUpPage.jsx";
import TheSignInPage from "./pages/TheSignInPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TheGuestLayout />,
    children: [
      {
        path: "/",
        element: <TheHomePage />,
      },
      {
        path: "/sign-up",
        element: <TheSignUpPage />,
      },
      {
        path: "/sign-in",
        element: <TheSignInPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
