import { createBrowserRouter } from "react-router-dom";
import HomePage, { homePage } from '../page/user/homepage/homePage'
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
                path: 'about',
                element: <AboutPage></AboutPage>,
            },
            {
                path: 'contact',
                element: <ContactPage></ContactPage>,
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
                path: 'login',
                element: <LoginPage></LoginPage>
            },
            {
                path: 'register',
                element: <RegisterPage></RegisterPage>
            }

        ]
    }
]);