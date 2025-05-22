import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutGuest from "./components/layouts/LayoutGuest";
import HomeScreen from "./pages/User/home/HomeScreen";
import LoginScreen from "./pages/auth/LoginScreen";
import RegisterScreen from "./pages/auth/RegisterScreen";
import CustomerProfile from "./pages/User/profile/CustomerProfile";
import TransactionHistory from "./pages/User/transactions/TransactionHistory";
import FavoriteList from "./pages/User/favorites/FavoritesList";
import BrokerProfile from "./pages/Broker/profile/BrokerProfile";
import BrokerTransactionHistory from "./pages/Broker/transaction/BrokerTransactionHistory";
import BrokerWatchedApartments from "./pages/Broker/favorite/BrokerWatchedApartments";
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
        path: "/user-profile",
        element: <CustomerProfile />,
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
