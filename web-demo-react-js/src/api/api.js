const address = "http://localhost:8080";
export const ApiAddress ={
    auth :{
        login : `${address}/auth/signin`,
        register: `${address}/auth/signup`,
        verifyRegister : `${address}/auth/signup/verify`,
        logout : `${address}/auth/signout`,
        forgotPassword: `${address}/auth/forgot-password`,
        verifyForgotPassword: `${address}/auth/forgot-password/verify`,
        resetPassword: `${address}/auth/forgot-password/change-password`,
    },
    profile:{
        avatarUpload: `${address}/profile/upload/avatar`,
        profileUpload: `${address}/profile/upload`,
        getProfile : `${address}/profile/get`,
        changePassword : `${address}/profile/change-password`,
    }
}