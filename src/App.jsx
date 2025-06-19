import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import LayoutGuest from "./components/layouts/LayoutGuest";
import HomeScreen from "./pages/User/home/HomeScreen";
import LoginScreen from "./pages/auth/LoginScreen";
import RegisterScreen from "./pages/auth/RegisterScreen";
import VerifySuccess from './pages/auth/VerifySuccess';
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
import ApartmentDetail from "./pages/ApartmentsPage/ApartmentDetail";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage/ProjectDetailsPage";
import CheckEmailNotice from './pages/auth/CheckEmailNotice';
import NotFound from './pages/auth/NotFound';
import ServicePage from "./pages/services/ServicePage";
import ProjectManagement from "./pages/staff/listings/ProjectManagement";
import NewsManagement from "./pages/staff/listings/NewsManagement";
import UserManagement from "./pages/admins/users/UserManagement"; 
import { ROLES } from './constants/roles';
import ForgotPassword from "./pages/auth/ForgotPassword";
import MarketAnalysis from "./pages/User/marketAnalysis/MarketAnalysis";
// import Packages from "./pages/package/Packages";

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
        path: "/can-ho/detail",
        element: <ApartmentDetail />,
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
        path: "/market-analysis",
        element: <MarketAnalysis />,
      },
      // {
      //   path: "/packages",
      //   element: <Packages />,
      // },
      {
        path: "/news",
        element: <News />,
      }, 
      {
        path: "/user-profile",
        element: (
          <ProtectedRoute
            element={<MyProfile />}
            allowedRoles={[ROLES.USER]}
          />
        ),
      },
      {
        path: "/user-transactions",
        element: (
          <ProtectedRoute
            element={<TransactionHistory />}
            allowedRoles={[ROLES.USER]}
          />
        ),
      },
      {
        path: "/user-favorite",
        element: (
          <ProtectedRoute
            element={<FavoriteList />}
            allowedRoles={[ROLES.BROKER]}
          />
        ),
      },
      {
        path: "/broker-profile",
        element: (
          <ProtectedRoute
            element={<BrokerProfile />}
            allowedRoles={[ROLES.BROKER]}
          />
        ),
      },
      {
        path: "/broker-transaction",
        element: (
          <ProtectedRoute
            element={<BrokerTransactionHistory />}
            allowedRoles={[ROLES.BROKER]}
          />
        ),
      },
      {
        path: "/broker-favorite",
        element: (
          <ProtectedRoute
            element={<BrokerWatchedApartments />}
            allowedRoles={[ROLES.BROKER]}
          />
        ),
      },
      {
        path: "/news-detail",
        element: <NewsDetail />,
      },
      {
        path: "/owner-transactions",
        element: (
          <ProtectedRoute
            element={<OwnerTransactions />}
            allowedRoles={[ROLES.OWNER]}
          />
        ),
      },
      {
        path: "/owner-favorites",
        element: (
          <ProtectedRoute
            element={<OwnerFavorites />}
            allowedRoles={[ROLES.OWNER]}
          />
        ),
      },
      {
        path: "/owner-profile",
        element: (
          <ProtectedRoute
            element={<OwnerInfo />}
            allowedRoles={[ROLES.OWNER]}
          />
        ),
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
        path: "/forgot-password",
        element: <ForgotPassword />,
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
        allowedRoles={[ROLES.ADMIN]}
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
    element: (
      <ProtectedRoute
        element={<StaffLayout />}
        allowedRoles={[ROLES.STAFF]}
      />
    ),
    children: [
      {
        index: true,
        element: <Navigate to="listings" replace />, 
      },
      {
        path: "listings",
        element: <ListingManagement />,
      },
      {
        path: "services",
        element: <ServiceManagementPage />,
      },
      {
        path: "projects",
        element: <ProjectManagement />,
      },
      {
        path: "news",
        element: <NewsManagement />,
      }
    ]
  }
]);


function App() {
  return <RouterProvider router={router} />;
}


export default App;