import { createBrowserRouter } from "react-router-dom";
import SignInPage from "../pages/auth/SignInPage";
import ThemeLayout from "../theme/ThemeLayout";

const router = createBrowserRouter([
  {
    element: <ThemeLayout/>,
    children: [
      {
        path : '/',
        element: <SignInPage/>
      }
    ]
  }
])

export default router;