import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutGuest from "./components/layouts/LayoutGuest";
import HomeScreen from "./pages/User/home/HomeScreen";
import LoginScreen from "./pages/auth/LoginScreen";
import RegisterScreen from "./pages/auth/RegisterScreen";
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
