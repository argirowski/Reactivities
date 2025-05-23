import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetailsPage from "../../features/activities/details/ActivityDetailsPage";
import TestErrors from "../../features/errors/TestErrors";
import NotFound from "../../features/errors/NotFound";
import Counter from "../../features/counter/Counter";
import ServerError from "../../features/errors/ServerError";
import LogInForm from "../../features/account/LogInForm";
import RegisterForm from "../../features/account/RegisterForm";
import RequireAuth from "./RequireAuth";
import ProfilePage from "../../features/profiles/ProfilePage";
import ChangePasswordForm from "../../features/account/ChangePasswordForm";
import VerifyEmail from "../../features/account/VerifyEmail";
import ForgotPasswordForm from "../../features/account/ForgotPasswordForm";
import ResetPasswordForm from "../../features/account/ResetPasswordForm";
import AuthCallBack from "../../features/account/AuthCallBack";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />, // Wrap the routes that require authentication with RequireAuth
        children: [
          { path: "activities", element: <ActivityDashboard /> },
          { path: "activities/:id", element: <ActivityDetailsPage /> },
          { path: "add", element: <ActivityForm key="add" /> }, // The key is added to force the component to re-render when the route changes
          { path: "edit/:id", element: <ActivityForm key="edit" /> }, // The key is added to force the component to re-render when the route changes
          { path: "profiles/:id", element: <ProfilePage /> },
          { path: "change-password", element: <ChangePasswordForm /> },
        ],
      },
      { path: "", element: <HomePage /> },

      { path: "errors", element: <TestErrors /> },
      { path: "counter", element: <Counter /> },
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
      { path: "login", element: <LogInForm /> },
      { path: "register", element: <RegisterForm /> },
      { path: "confirm-email", element: <VerifyEmail /> },
      { path: "forgot-password", element: <ForgotPasswordForm /> },
      { path: "reset-password", element: <ResetPasswordForm /> },
      { path: "auth-callback", element: <AuthCallBack /> },
      { path: "*", element: <Navigate replace to="/not-found" /> }, // Redirect to NotFound for any other routes, the * wildcard matches all paths
    ],
  },
]);
