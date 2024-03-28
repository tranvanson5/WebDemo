import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../store/slice/authSlice";
import { useEffect } from "react";

export function useAuthorization(allowedRoles = []) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const roles = useSelector(state => state?.auth?.login?.roles);

    useEffect(() => {
        if (!roles || (Array.isArray(roles) && roles.length === 0)) {
            // Kiểm tra nếu người dùng đã đăng nhập thì không cần chuyển hướng
            if (!roles) {
                dispatch(loginSuccess());
                navigate('/auth/login');
            }
            return;
        }

        const userRole = Array.isArray(roles) ? roles[0]?.authority : roles?.authority;
        const intersection = allowedRoles.includes(userRole);

        if (!intersection) {
            dispatch(loginSuccess());
            navigate('/auth/login');
        }
    }, [navigate, roles, allowedRoles, dispatch]);
}
