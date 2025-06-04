import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import LayoutGuest from "./components/layouts/LayoutGuest";
import HomeScreen from "./pages/User/home/HomeScreen";
import LoginScreen from "./pages/auth/LoginScreen";
import RegisterScreen from "./pages/auth/RegisterScreen";
import VerifySuccess from './pages/auth/VerifySuccess';
// import CustomerProfile from "./pages/User/profile/CustomerProfile";
import TransactionHistory from "./pages/User/transactions/TransactionHistory";
import FavoriteList from "./pages/User/favorites/FavoritesList";
import BrokerProfile from "./pages/Broker/profile/BrokerProfile";
import BrokerTransactionHistory from "./pages/Broker/transaction/BrokerTransactionHistory";
import BrokerWatchedApartments from "./pages/Broker/favorite/BrokerWatchedApartments";
import MyProfile from "./pages/User/profile/MyProfile";
import Introduction from "./pages/publics/Introduction";
import News from "./pages/publics/News";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import NewsDetail from "./pages/publics/NewsDetail";
import OwnerTransactions from "./pages/Owner/OwnerTransactions";
import OwnerFavorites from "./pages/Owner/OwnerFavorites";
import OwnerInfo from "./pages/Owner/OwnerInfo";
import AdminLayout from "./components/ui/layouts/admin/AdminLayout";
import ListingManagement from "./pages/staff/listings/ListingManagement";
import TransactionManagement from "./pages/admins/transactions/TransactionManagement";
import DashboardPage from "./pages/admins/dashboard/DashboardPage";
import AdminProfile from "./pages/admins/profile/AdminProfile";
import StaffLayout from "./components/ui/layouts/staff/StaffLayout";
import ServiceManagementPage from "./pages/staff/listings/services/ServiceManagement";
import ApartmentsPage from "./pages/ApartmentsPage/ApartmentsPage";
import ApartmentDetailsPage from "./pages/ApartmentDetailsPage/ApartmentDetailsPage";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage/ProjectDetailsPage";
import CheckEmailNotice from './pages/auth/CheckEmailNotice';
import NotFound from './pages/auth/NotFound';
import UserManagement from "./pages/admins/users/UserManagement";
import ServicePage from "./pages/services/ServicePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutGuest />,
    children: [
      {
        path: "/",
        element: <HomeScreen />,
      },
      {
        path: "/login",
        element: <LoginScreen />,
      },
      {
        path: "/can-ho",
        element: <ApartmentsPage />,
      },
      {
        path: "/can-ho/:id",
        element: <ApartmentDetailsPage />,
      },
      {
        path: "/register",
        element: <RegisterScreen />,
      },
      {
        path: "/information",
        element: <Introduction />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/user-profile",
        element: <MyProfile />,
      },
      {
        path: "/user-transactions",
        element: <TransactionHistory />,
      },
      {
        path: "/user-favorite",
        element: <FavoriteList />,
      },
      {
        path: "/broker-profile",
        element: <BrokerProfile />,
      },
      {
        path: "/broker-transaction",
        element: <BrokerTransactionHistory />,
      },
      {
        path: "/broker-favorite",
        element: <BrokerWatchedApartments />,
      },
      {
        path: "/news-detail",
        element: <NewsDetail />,
      },
      {
        path: "/owner-transactions",
        element: <OwnerTransactions />,
      },
      {
        path: "/owner-favorites",
        element: <OwnerFavorites />,
      },
      {
        path: "/owner-profile",
        element: <OwnerInfo />,
      },
      {
        path: "/du-an",
        element: <ProjectsPage />,
      },
      {
        path: "/du-an/:id",
        element: <ProjectDetailsPage />,
      },
      {
        path: "/verify-success",
        element: <VerifySuccess />,
      },
      {
        path: "/check-email-notice",
        element: <CheckEmailNotice />,
      },
      {
        path: "/services",
        element: <ServicePage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute
        element={<AdminLayout/>}
        // allowedRoles={["ROLE_ADMIN"]}       
      />
    ),
    children: [
      {
        index: true, 
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "users",
        element: <UserManagement />,
      },
      {
        path: "transactions",
        element: <TransactionManagement />,
      },
      {
        path: "profile",
        element: <AdminProfile />,
      }
    ],
  },
  {
    path: "/staff",
    element: <StaffLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "listings",
        element: <ListingManagement />,
      },
      {
        path: "services",
        element: <ServiceManagementPage />,
      }
    ]
  }
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
