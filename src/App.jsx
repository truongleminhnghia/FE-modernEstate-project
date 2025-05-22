import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutGuest from "./components/layouts/LayoutGuest";
import HomeScreen from "./pages/User/home/HomeScreen";
import LoginScreen from "./pages/auth/LoginScreen";
import RegisterScreen from "./pages/auth/RegisterScreen";
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
import HiAdmin from "./pages/admins/HiAdmin";
import LayoutEmployee from "./components/layouts/LayoutEmployee";
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
        path: "/register",
        element: <RegisterScreen />,
      },
      {
        path: "/gio-thieu",
        element: <Introduction />,
      },
      {
        path: "/news",
        element: <News/>,
      },
      {
        path: "/my-profile",
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
      }
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute element={<LayoutEmployee />} allowedRoles={["ROLE_ADMIN"]} />
    ),
    children: [
      {
        path: 'admin',
        element: <HiAdmin/>
      },
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
