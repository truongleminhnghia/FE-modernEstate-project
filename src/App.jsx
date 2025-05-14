import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutGuest from "./components/layouts/LayoutGuest";
import HomeScreen from "./pages/Home/HomeScreen";
import BuyAndSellProperty from "./pages/BuyAndSellProperty";
import LeaseProperty from "./pages/LeaseProperty";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <LayoutGuest />,
    children: [
      {
        path: "/",
        element: <HomeScreen />,
      },
      {
        path: "/mua-ban-can-ho",
        element: <BuyAndSellProperty />,
      },
      {
        path: "/cho-thue-can-ho",
        element: <LeaseProperty />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
