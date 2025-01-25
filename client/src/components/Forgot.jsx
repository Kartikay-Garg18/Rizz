import React, {useState} from 'react'
import { toast, Bounce } from 'react-toastify'
import { forgotPassword, resetPassword } from '../services/auth';
import OtpInput from './OtpInput';
import { useNavigate } from 'react-router-dom';

const Forgot = () => {
    const [email, setEmail] = useState('');
    const [showEmail, setShowEmail] = useState(true);
    const [otp, setOtp] = useState('');
    const [expiry, setExpiry] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const submitEmail =  async (e) =>{
        e.preventDefault();
        if(email === ''){
            toast.error('Email cannot be empty', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return;
        }
        try {
            const data = await forgotPassword({email});
            console.log(data)
            setShowEmail(false);
            setShowOtp(true);
            setOtp(data.verifycode);
            setExpiry(data.codeExpiry);
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }

    }

    const submitPassword = async (e) => {
        e.preventDefault();
        if(password.trim() === '' || confirmPassword.trim() === ''){
            toast.error('Password cannot be empty', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return;
        }
        if(password !== confirmPassword){
            toast.error('Passwords do not match', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return;
        }
        try {
            const data = await resetPassword({email, password});
            toast.success(data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

            navigate('/login');

        } catch (error) {
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }

  return (
    <div className='flex justify-center items-center h-[100vh]'>
        <div className='border border-black h-fit w-96 rounded-xl font-pop'>
            <h1 className='text-center text-xl font-bold p-5'>Reset Password</h1>
            {showEmail && (<form className='flex flex-col justify-center items-center'
            onSubmit={(e) => submitEmail(e)}>
                <h1 className='text-center text-xl font-bold p-5'>Enter Your Email Address</h1>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='abc@example.com'
                className='h-10 border border-black w-[85%] rounded-lg px-3'/>
                <button type='submit' className='border border-black w-[85%] rounded-lg p-2 mt-6 bg-black text-white mb-10'>Get OTP</button>
                </form>
            )}
            {showOtp && <OtpInput email={email} otp={otp} expiry={expiry} setShowOtp={setShowOtp} setShowPassword={setShowPassword}/>}
            {showPassword && (
                <form className='flex flex-col justify-center items-center'
                onSubmit={(e) => submitPassword(e)}>
                    <h1 className='text-center text-xl font-bold pt-2 pb-5'>Enter New Password</h1>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'
                    className='h-10 border border-black w-[85%] rounded-lg px-3'/>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password'
                    className='h-10 border border-black w-[85%] rounded-lg px-3 mt-5'/>
                    <button type='submit' className='border border-black w-[85%] rounded-lg p-2 mt-6 bg-black text-white mb-10'>Reset Password</button>
                </form>
            )}
        </div>
    </div>
  )
}

export default Forgot