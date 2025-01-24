import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

const initialState ={
    status: false,
    user : null
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        login: (state, action) => {
            state.status = true;
            state.user = action.payload.data.data.loggedInUser?action.payload.data.data.loggedInUser : action.payload.data.data;
        },

        logout: (state) => {
            state.status = false;
            state.user = null;
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;