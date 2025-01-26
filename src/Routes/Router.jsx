import { createBrowserRouter, createHashRouter } from 'react-router-dom'
import Home from '../Home/Home'
import ErrorPage from '../Pages/ErrorPage/ErrorPage'
import Login from '../Pages/Login'
import Registration from '../Pages/Registration'
import PlantDetails from '../Details/BloodDetails'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
// import AddPlant from '../'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import Profile from '../pages/Dashboard/Common/Profile'
import Statistics from '../Pages/Dashboard/Common/Statics'
import MainLayout from '../layouts/MainLayout'
// import MyInventory from '../pages/Dashboard/Seller/MyInventory'
// import ManageOrders from '../pages/Dashboard/Seller/ManageOrders'
// import MyOrders from '../pages/Dashboard/Customer/MyOrders'
import BloodDetails from '../Details/BloodDetails'
import AddBloodForm from '../Form/AddBloodForm'
// import  from '../Pages/Dashboard/Customer/My-donation-request'
import MyDonationRequests  from '../Pages/Dashboard/Customer/MyDonationRequests'
import AllBloodDonateRequest from '../Pages/Dashboard/Admin/AllBloodDonateRequest'
import ContentManagementPage from '../Pages/Dashboard/Admin/ContentManagementPage '
import AddBlogPage from '../Pages/Dashboard/Admin/AddBlogPage'
import DonorDashboard from '../Pages/Dashboard/Customer/DonorDashboard'
import VolunteerDashboard from '../Pages/Dashboard/Volentiar/VolunteerDashboard'
import Search from '../Home/Search'
import PublishedBlogs from '../Home/PublishedBlogs'
import BlogDetails from '../Home/BlogDetails'
import BloodDonateRequestsPublic from '../Home/BloodDonateRequestsPublic'
import DonationRequestsDetails from '../Home/DonationRequestsDetails'
import FundingPage from '../Home/FundingPage'

export const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/plant/:id',
        element: <BloodDetails />,
      },
      {
        path:'donation-request-details/:id',
        element: (
          <PrivateRoute>
            <DonationRequestsDetails />
          </PrivateRoute>
        ),
      },
      {
        path:'funding-page',
        element: (
          <PrivateRoute>
            <FundingPage />
          </PrivateRoute>
        ),
      },
      { path: '/blood-donate-requests', element: <BloodDonateRequestsPublic /> },
      { path: '/search', element: <Search /> },
      { path: '/blogs', element: <PublishedBlogs /> },
      { path: '/blog-details/:id', element: <BlogDetails /> },
      { path: '/blog-details', element: <BlogDetails /> },
    ],
  },
  { path: '/login', element: <Login /> },
  
  { path: '/signup', element: <Registration /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: 'add-requests',
        element: (
          <PrivateRoute>
            <AddBloodForm />
          </PrivateRoute>
        ),
      },
     
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'My-donation-request',
        element: (
          <PrivateRoute>
            <MyDonationRequests  />
          </PrivateRoute>
        ),
      },
      {
        path: 'ContentManagementPage',
        element: (
          <PrivateRoute>
            <ContentManagementPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'all-blood-donation-request',
      
        element:   <PrivateRoute>
          <AllBloodDonateRequest />
        </PrivateRoute>,

      },
      {
        path: 'add-blog',
      
        element:   <PrivateRoute>
          <AddBlogPage />
        </PrivateRoute>,

      },
      {
        path: 'dashboard-donor',
      
        element:   <PrivateRoute>
          <DonorDashboard />
        </PrivateRoute>,

      },
      {
        path:'Volunteer-Dashboard',
      
        element:<PrivateRoute>
          <VolunteerDashboard />
        </PrivateRoute>,

      },
    ],
  },
])