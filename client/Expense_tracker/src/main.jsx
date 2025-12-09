import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Navigate } from "react-router-dom";
import "./index.css";
import { TransactionContextProvider } from "./context/transactionContext.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { ToastContainer } from "react-toastify";
import Income from "./components/Income.jsx";
import Expense from "./components/Expense.jsx";
import ViewTransaction from "./components/ViewTransaction.jsx";
import PublicRoute from "./ProtectedRoute/PublicRoute.jsx";
import Authentication from "./pages/Authentication.jsx";
const route = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/authentication",
    element: (
      <PublicRoute>
        <Authentication />
      </PublicRoute>
    ),
  },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
  { path: "", element: <Navigate to="/app/dashboard" replace /> },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "income",
        element: <Income />,
      },
      {
        path: "expense",
        element: <Expense />,
      },
      {
        path: "viewTransaction",
        element: <ViewTransaction />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TransactionContextProvider>
      <RouterProvider router={route} />
      <ToastContainer autoClose={2000} />
    </TransactionContextProvider>
  </StrictMode>
);
