import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import TheGuestLayout from "./layouts/TheGuest.jsx";
import TheHomePage from "./pages/TheHomePage.jsx";
import TheSignUpPage from "./pages/TheSignUpPage.jsx";
import TheSignInPage from "./pages/TheSignInPage.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";

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
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
