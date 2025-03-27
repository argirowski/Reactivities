import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetailsPage from "../../features/activities/details/ActivityDetailsPage";
import TestErrors from "../../features/errors/TestErrors";
import NotFound from "../../features/errors/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "activities", element: <ActivityDashboard /> },
      { path: "activities/:id", element: <ActivityDetailsPage /> },
      { path: "add", element: <ActivityForm key="add" /> }, // The key is added to force the component to re-render when the route changes
      { path: "edit/:id", element: <ActivityForm key="edit" /> }, // The key is added to force the component to re-render when the route changes
      { path: "errors", element: <TestErrors /> },
      { path: "not-found", element: <NotFound /> },
    ],
  },
]);
