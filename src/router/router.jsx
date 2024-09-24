import { createBrowserRouter } from "react-router-dom";
import SignInPage from "../pages/auth/SignInPage";

const router = createBrowserRouter([
  {
    path : '/',
    element: <SignInPage/>
  }
])

export default router;