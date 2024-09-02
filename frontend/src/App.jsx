import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./components/shared/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/home/Home";
import Browse from "./components/browse/Browse";
import Jobs from "./components/jobs/Jobs";
import ViewProfile from "./components/profile/ViewProfile";
import JobDescription from "./components/jobs/JobDescription";
import Companies from "./components/adminSection/Companies";
import CreateCompanies from "./components/adminSection/CreateCompanies";
import CreateCompaniesDetails from "./components/adminSection/CreateCompaniesDetails";
import AdminJob from "./components/adminSection/AdminJob";
import CreateJobDetails from "./components/adminSection/CreateJobDetails";
import CreateJob from "./components/adminSection/CreateJob";
import Applicants from "./components/adminSection/Applicants";
import ProtectedRoute from "./utils/protectedRoute";

const appRouter = createBrowserRouter([
  //client
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: (
      <ProtectedRoute>
        <Jobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/job/description/:id",
    element: (
      <ProtectedRoute>
        <JobDescription />
      </ProtectedRoute>
    ),
  },
  {
    path: "/browse",
    element: (
      <ProtectedRoute>
        <Browse />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: <ViewProfile />,
  },

  //admin
  {
    path: "/admin/companies",
    element: <Companies />,
  },
  {
    path: "/admin/companies/create",
    element: <CreateCompanies />,
  },
  {
    path: "/admin/companies/create/:id",
    element: <CreateCompaniesDetails />,
  },
  {
    path: "/admin/job",
    element: <AdminJob />,
  },
  {
    path: "/admin/job/create/:id",
    element: <CreateJobDetails />,
  },
  {
    path: "/admin/job/create",
    element: <CreateJob />,
  },
  {
    path: "/admin/job/:id/applicants",
    element: <Applicants />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
