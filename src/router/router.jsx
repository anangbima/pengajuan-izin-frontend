import { createBrowserRouter } from "react-router-dom";
import SignInPage from "../pages/auth/SignInPage";
import ThemeLayout from "../theme/ThemeLayout";
import AuthLayout from "../components/layouts/AuthLayout";
import AdminLayout from "../components/layouts/AdminLayout";
import VerifikatorLayout from "../components/layouts/VerifikatorLayout";
import UserLayout from "../components/layouts/UserLayout";
import SignUpPage from "../pages/auth/SignUpPage";
import NotVerifyPage from "../pages/auth/NotVerifyPage";
import IndexAdminPage from "../pages/admin/IndexAdminPage";
import UserAdminPage from "../pages/admin/UserAdminPage";
import IzinAdminPage from "../pages/admin/IzinAdminPage";
import IndexVerifikatorPage from "../pages/verifikator/IndexVerifikatorPage";
import UserVerifikatorPage from "../pages/verifikator/UserVerifikatorPage";
import IzinVerifikatorPage from "../pages/verifikator/IzinVerifikatorPage";
import IndexUserPage from "../pages/user/IndexUserPage";
import IzinUserPage from "../pages/user/IzinUserPage";

const router = createBrowserRouter([
  {
    element: <ThemeLayout/>,
    children: [
      {
        path : '/',
        element : <AuthLayout/>,
        children : [
          {
            index: true,
            element: <SignInPage/>
          },
          {
            path : '/sign-in',
            element : <SignInPage/>
          },
          {
            path : '/sign-up',
            element : <SignUpPage/>
          },
          {
            path : '/not-verify',
            element : <NotVerifyPage/>
          }
        ]
      },
      {
        path : '/admin',
        element : <AdminLayout/>,
        children : [
          {
            index : true,
            element : <IndexAdminPage/>
          },
          {
            path : 'user',
            element : <UserAdminPage/>
          },
          {
            path : 'izin',
            element : <IzinAdminPage/>
          }
        ]
      }, 
      {
        path : '/verifikator',
        element : <VerifikatorLayout/>,
        children : [
          {
            index : true,
            element : <IndexVerifikatorPage/>
          },
          {
            path : 'user',
            element : <UserVerifikatorPage/>
          },
          {
            path : 'izin',
            element : <IzinVerifikatorPage/>
          }
        ]
      },
      {
        path : '/user',
        element : <UserLayout/>,
        children : [
          {
            index : true,
            element : <IndexUserPage/>
          },
          {
            path : 'izin',
            element : <IzinUserPage/>
          }
        ]
      }      
    ]
  }
])

export default router;