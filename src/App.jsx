import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutGuest from "./components/layouts/LayoutGuest";
import ApartmentsPage from "./pages/ApartmentsPage/ApartmentsPage";
import LeaseProperty from "./pages/LeaseProperty";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomeScreen from "./pages/User/home/HomeScreen";
import ApartmentDetailsPage from "./pages/ApartmentDetailsPage/ApartmentDetailsPage";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage/ProjectDetailsPage";

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
        element: <ApartmentsPage />,
      },
      {
        path: "/mua-ban-can-ho/:id",
        element: <ApartmentDetailsPage />,
      },
      {
        path: "/cho-thue-can-ho",
        element: <LeaseProperty />,
      },
      {
        path: "/du-an",
        element: <ProjectsPage />,
      },
      {
        path: "/du-an/:id",
        element: <ProjectDetailsPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
