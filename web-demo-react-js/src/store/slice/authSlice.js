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
            state.login = authSlice.initialState;
        },
        userSuccess: (state, action) => {
            state.login.user = action.payload;
        },
    }
});

export const {
    loginSuccess,
    logoutSuccess,
    userSuccess,
    updateAvatarSuccess,} = authSlice.actions;

export default authSlice.reducer;
