import React, { useState, useEffect, useRef } from 'react'
import { toast, Bounce } from 'react-toastify'

const OtpInput = ({email, otp, expiry, setShowOtp, setShowPassword}) => {
    const [verifyOtp, setVerifyOtp] = useState(new Array(6).fill(''));
    const [combineNewOtp, setCombineNewOtp] = useState('');
    const inputRefs = useRef([]);

    const handleChange = (index, e) => {
        const value = e.target.value;
        if(isNaN(value)) return;
        const newOtp = [...verifyOtp];
        newOtp[index] = value.substring(value.length - 1);
        setVerifyOtp(newOtp);

        const combineOtp = newOtp.join('');
        if(combineOtp.length === 6){
            setCombineNewOtp(combineOtp);
        }

        if(value && index < verifyOtp.length - 1 && inputRefs.current[index + 1]){
            inputRefs.current[index + 1]?.focus();
        }
    }

    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1,1);

        if(index > 0 && !verifyOtp[index]){
            inputRefs.current[verifyOtp.indexOf('')].focus();
        }

    }

    const handleKeyDown = (index, e) => {
        if(e.key === 'Backspace' && index > 0 && !verifyOtp[index] && inputRefs.current[index - 1]){
            inputRefs.current[index - 1].focus();
        }
    }

    const checkOtp = async () => {
        if(otp === combineNewOtp && new Date(expiry) > new Date()){
            setShowOtp(false);
            setShowPassword(true);
        } else {
            toast.error('Invalid OTP', {
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

    useEffect(() => {
        if(inputRefs.current[0]){
            inputRefs.current[0].focus();
        }
    }, [])

  return (
    <div className='font-pop text-center'>
        <div className='text-sm mb-5 mt-4'>
            OTP sent to <strong>{email}</strong>
        </div>
        <div className='mb-5'>
        {
            verifyOtp.map((value, index)=>{
                return (
                    <input 
                    key={index}
                    type="text"
                    value={value}
                    ref={(input) => (inputRefs.current[index] = input)}
                    onChange={(e) => handleChange(index, e)}
                    onClick={() => handleClick(index)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className='border border-black w-10 text-center m-2 h-10 rounded-md'
                    />
                )
            })
        }
        </div>
        <div>
            <button className='w-[85%] border border-black bg-black text-white rounded-lg py-3 mb-8'
            onClick={checkOtp}
            >Verify OTP</button>
        </div>
        
    </div>
  )
}

export default OtpInput