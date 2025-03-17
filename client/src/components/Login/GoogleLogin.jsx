import React from 'react'
import {useGoogleLogin} from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { googleLogin as login } from '../services/auth'
import { login as authLogin ,connectSocket} from '../store/authSlice'
import Google from '../assets/Google.svg'
import { useNavigate } from 'react-router-dom'

const GoogleLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const responseGoogle = async (authResult) => {
        try {
            if(authResult['code']){
                const result = await login(authResult['code']);
                dispatch(authLogin(result))
                dispatch(connectSocket());
                navigate('/chat');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code'
    })
  return (
    <div>
        <button onClick={googleLogin} className='flex justify-center items-center gap-2 border-black border border-opacity-20'>
            <img src={Google} alt="" className='w-7 pl-2'/>
            <span className='py-2 bg-blue-500 px-2 text-white font-semibold'>Sign in with Google</span>
        </button>
    </div>
  )
}

export default GoogleLogin