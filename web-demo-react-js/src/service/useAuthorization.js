import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../store/slice/authSlice";
import { useEffect } from "react";

export async function useAuthorization (allowedRoles = []) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const roles = useSelector(state => state?.auth?.login?.roles);

    useEffect(() => {
        async function checkAuthorization() {
            if (!roles || (Array.isArray(roles) && roles.length === 0)) {
                // Kiểm tra nếu người dùng đã đăng nhập thì không cần chuyển hướng
                if (!roles) {
                    dispatch(loginSuccess());
                    navigate('/auth/login');
                }
                return;
            }

            const userRole =await Array.isArray(roles) ? roles[0]?.authority : roles?.authority;
            const intersection = await allowedRoles.includes(userRole);

            if (!intersection) {
                dispatch(loginSuccess());
                navigate('/auth/login');
            }
        }

        checkAuthorization();
    }, [navigate, roles, allowedRoles, dispatch]);
}