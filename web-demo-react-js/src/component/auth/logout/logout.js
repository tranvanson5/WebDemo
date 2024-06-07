import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getRequest } from '../../../service/connectionRequest';
import { logoutSuccess } from "../../../store/slice/authSlice";
import { toast } from 'react-toastify';
import {useAuthorization} from "../../../service/useAuthorization";
import {ApiAddress} from "../../../api/api";

const Logout = () => {
    const navigate = useNavigate();
    const jwt = useSelector(state => state?.auth?.login?.accessToken);
    const dispatch = useDispatch();

    useAuthorization(["ROLE_ADMIN", "ROLE_PM", "ROLE_USER"]);
    useEffect(() => {
        const handleLogout = async () => {
            if (jwt) {
                try {
                    await getRequest(ApiAddress.auth.logout, jwt);
                    dispatch(logoutSuccess());
                    // window.localStorage.clear();
                    // toast.success('Logout successful');
                } catch (error) {
                    navigate('../')
                    console.error('Logout Error:', error);
                    toast.error('Logout failed. Please try again later.');
                }
            } else {
                navigate('/auth/login');
            }
        };
        handleLogout();
    }, []);



    return null;
};

export default Logout;
