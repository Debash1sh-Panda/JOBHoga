import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/home/Home'
import Browse from './components/browse/Browse'
import Jobs from './components/jobs/Jobs'
import ViewProfile from './components/profile/ViewProfile'
import JobDescription from './components/jobs/JobDescription'
import Companies from './components/admin section/Companies'
import CreateCompanies from './components/admin section/CreateCompanies'
import CreateCompaniesDetails from './components/admin section/CreateCompaniesDetails'

const appRouter = createBrowserRouter([

  //client
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <Signup/>
  },
  {
    path: '/jobs',
    element: <Jobs/>
  },
  {
    path: '/job/description/:id',
    element: <JobDescription/>
  },
  {
    path: '/browse',
    element: <Browse/>
  },
  {
    path: '/profile',
    element: <ViewProfile/>
  },

  //admin
  {
    path: '/admin/companies',
    element: <Companies/>
  },
  {
    path: '/admin/companies/create',
    element: <CreateCompanies/>
  },
  {
    path: '/admin/companies/create/:id',
    element: <CreateCompaniesDetails/>
  },

])
function App() {
  
  return (
    <>
    <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
