import {createBrowserRouter, Navigate} from "react-router-dom";
import HomePage  from '../page/user/homepage/homePage'
import UserPage from "../page/user/userPage";
import ProfilePage from "../page/profile/profilePage";
import ProfileDetailPage from "../page/profile/profiledetail/profileDetailPage";
import ProductPage from "../page/user/productpage/productPage";
import AboutPage from "../page/user/aboutpage/aboutPage";
import ContactPage from "../page/user/contactpage/contractPage";
import AuthPage from "../page/auth/authPage";
import LoginPage from "../page/auth/login/loginPage";
import RegisterPage from "../page/auth/register/registerPage";
import ChangePassword from "../page/profile/changepassword/changePassword";
import ForgotPasswordPage from "../page/auth/forgotPassword/forgotPasswordPage";
import ResetNewPassword from "../page/auth/forgotPassword/changePassword/resetNewPassword";
import Logout from "../component/auth/logout/logout";
import ProductDetailPage from "../page/user/productpage/productdetailpage/productDetailPage";
import Oauth2Github from "../component/auth/login/oauth2/oauth2Github";
import CartPage from "../page/user/cartpage/cartPage";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <UserPage></UserPage>,
        children: [
            {
                path: '',
                element: <HomePage></HomePage>
            },
            {
                path: 'product',
                element: <ProductPage></ProductPage>,
            },
            {
                path: 'product/detail/:id',
                element: <ProductDetailPage></ProductDetailPage>,
            },
            {
                path: 'about',
                element: <AboutPage></AboutPage>,
            },
            {
                path: 'contact',
                element: <ContactPage></ContactPage>,
            },
            {
                path: 'cart',
                element: <CartPage></CartPage>,
            }
        ]

    },
    {
        path: '/profile',
        element: <ProfilePage></ProfilePage>,
        children: [
            {
                path: '',
                element: <ProfileDetailPage></ProfileDetailPage>
            },
            {
                path: 'change-password',
                element: <ChangePassword></ChangePassword>
            },
        ]

    },
    {
        path: '/auth',
        element: <AuthPage></AuthPage>,
        children: [
            {
                path: '',
                element: <Navigate to="login" />,
            },
            {
                path: 'login',
                element: <LoginPage></LoginPage>,
                children:[{
                    path: 'github',
                    element: <Oauth2Github></Oauth2Github>
                }]
            },
            {
                path: 'logout',
                element: <Logout></Logout>,
                children:[{
                    path:'',
                    element:<LoginPage></LoginPage>
                }]
            },
            {
                path: 'register',
                element: <RegisterPage></RegisterPage>
            },
            {
                path: 'forgot-password',
                element: <ForgotPasswordPage></ForgotPasswordPage>
            },
            {
                path: 'forgot-password/change-password',
                element: <ResetNewPassword></ResetNewPassword>
            },

        ]
    },

]);