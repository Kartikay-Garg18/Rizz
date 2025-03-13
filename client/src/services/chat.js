import axios from 'axios'
import Cookies from 'js-cookie';

const API_URI = import.meta.env.VITE_APP_API_URI;
const accessToken = Cookies.get('accessToken');

const getUsers = async () => {
    try {
        const users = await axios.get(`${API_URI}/messages/user`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        return users.data.data.filteredUsers;
    } catch (error) {
        console.error('Error in getUsers (chatSlice): ', error.message);
    }
}

export {getUsers};