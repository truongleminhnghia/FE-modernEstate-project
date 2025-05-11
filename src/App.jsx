import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import LayoutGuest from "./components/layouts/LayoutGuest";


const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutGuest />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App
