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
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import TheProfilePage from "./pages/TheProfilePage.jsx";
import ThePrivateRoute from "./components/ThePrivateRoute.jsx";

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
      {
        path: "*",
        element: <ThePrivateRoute />,
        children: [
          {
            path: "profile",
            element: <TheProfilePage />,
          },
        ],
      },
    ],
  },
]);

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
