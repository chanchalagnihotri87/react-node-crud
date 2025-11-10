import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AddStudentPage from "./pages/student/AddStudentPage";
import EditStudentPage from "./pages/student/EditStudentPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },
      {
        path: "/add-student",
        element: <AddStudentPage></AddStudentPage>,
      },
      {
        path: "/edit-student/:studentId",
        element: <EditStudentPage></EditStudentPage>,
      },
      {
        path: "/login",
        element: <LoginPage></LoginPage>,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
