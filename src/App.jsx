import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutGuest from "./components/layouts/LayoutGuest";
import HomeScreen from "./pages/User/home/HomeScreen";
import LoginScreen from "./pages/auth/LoginScreen";
import RegisterScreen from "./pages/auth/RegisterScreen";
import MyProfile from "./pages/User/profile/MyProfile";
import TransactionHistory from "./pages/User/transactions/TransactionHistory";
import FavoriteList from "./pages/User/favorites/FavoritesList";
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
        path: "/my-profile",
        element: <MyProfile />,
      },
      {
        path: "/my-transactions",
        element: <TransactionHistory />,
      },
      {
        path: "/my-favorite",
        element: <FavoriteList />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
