import axios from 'axios'
import Cookies from 'js-cookie';
import {toast, Bounce} from 'react-toastify';

const API_URI = import.meta.env.VITE_APP_API_URI;

const setAccessToken = (token) => {
    Cookies.set('accessToken', token, { expires: import.meta.VITE_APP_ACCESS_TOKEN_EXPIRY });
};
  
const setRefreshToken = (token) => {
    Cookies.set('refreshToken', token, { expires: import.meta.VITE_APP_REFRESH_TOKEN_EXPIRY });
};

const createAccount = async (data) => {
    try {
        await axios.post(`${API_URI}/auth/register`, {
            username : data.username,
            email : data.email,
            password : data.password
        });

    } catch (error) {
        toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });
        throw new Error('Account creation failed');
    }
}

const login = async (data) => {
    try{
        const user = await axios.post(`${API_URI}/auth/login`, {
            email : data.email,
            password : data.password
        })
        
        if(!user){
            throw new Error('Login failed');
        }

        setAccessToken(user.data.data.accessToken);
        setRefreshToken(user.data.data.refreshToken);

        return user;

    } catch (error){
        toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });
        // console.log(e);
        throw new Error('Login failed');
    }
}

const getUser = async () => {
    try{
        const accessToken = Cookies.get('accessToken');
        const user = await axios.get(`${API_URI}/auth/user`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return user;
    } catch(e){
        throw new Error('User not found');
    }
}

const googleLogin = async (code) => {
    try {
        const user = await axios.post(`${API_URI}/auth/google?code=${code}`);
        if(!user){
            throw new Error('Login failed');
        }

        setAccessToken(user.data.data.accessToken);
        setRefreshToken(user.data.data.refreshToken);
        
        return user;
    } catch (error) {
        console.error(error);
    }
}
export {createAccount,login, getUser, googleLogin}