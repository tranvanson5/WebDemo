import {useEffect} from "react";
import {getRequest, postRequest} from "../../../../service/connectionRequest";
import {loginSuccess} from "../../../../store/slice/authSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import { toast } from 'react-toastify';

const Oauth2Github = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        fetchData();
    }, [navigate]);
    const fetchData = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            try {
                const response = await getRequest(`http://localhost:8080/auth/social/github?code=${code}`, null);
                // Assuming you have access to dispatch function here
                // dispatch(loginSuccess(response));
                // Assuming you have a function to get user profile
                // await getProfile(response?.accessToken);
                navigate('../../');
                toast.success('Đăng nhập thành công!');
            } catch (error) {
                toast.error('Đăng nhập thất bại!');
                console.error("Error:", error);
            }
        }
    };
    return null;
}
export default Oauth2Github;