import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AddEmployee, AdminPanel, Auth, Home, ListEmployee } from "./components/index.js";

const router = createBrowserRouter([
   {
      path: "/",
      element: <App />,
      errorElement: <div>error</div>,
      children: [
         { path: "/", element: <AdminPanel /> },
         { path: "/login", element: <Auth /> },
         { path: "/home", element: <Home /> },
         { path: "/list", element: <ListEmployee /> },
         { path: "/add/:id", element: <AddEmployee /> },
      ],
   },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <Provider store={store}>
         <RouterProvider router={router}>
            <App />
         </RouterProvider>
      </Provider>
   </React.StrictMode>
);
