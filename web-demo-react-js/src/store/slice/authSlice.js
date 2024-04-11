import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            accessToken: null,
            roles: null,
            user: null,
        }
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.login = action.payload;
        },
        logoutSuccess: (state) => {
            state.login = {
                accessToken: null,
                roles: null,
                user: null,
            }
        },
        userSuccess: (state, action) => {
            state.login.user = action.payload;
        },
    }
});

export const {
    loginSuccess,
    logoutSuccess,
    userSuccess
} = authSlice.actions;

export default authSlice.reducer;
