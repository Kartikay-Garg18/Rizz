import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import GoogleLogin from "../Login/GoogleLogin";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createAccount } from "../../services/auth";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm();
  
  const createUser = async (data) => {
    try {
      const {username, email, password, confirmPassword} = data
      if(password !== confirmPassword){
        toast.error('Passwords do not match', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        return;
      }

      await createAccount({username, email, password});

      navigate('/login');
      
    } catch (error) {
    }
  }
  return (
    <motion.div
      className="
        w-full max-w-lg 2xl:max-w-xl
        border border-white/30
        rounded-3xl
        shadow-2xl
        px-8 sm:px-12 py-14
        flex flex-col items-center glassmorphic-card
      "
      style={{
        background: 'rgba(255,255,255,0.16)',
        backdropFilter: 'blur(28px)'
      }}
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.23, type: "spring" }}
    >
      <h2 className="w-full text-3xl md:text-4xl font-extrabold mb-1 text-center bg-gradient-to-r from-purple-500 via-pink-400 to-pink-600 bg-clip-text text-transparent">
        Sign Up
      </h2>
      <p className="mb-8 text-white/90 text-center text-base md:text-lg font-medium">
        Join our community. Fast, secure, always connected.
      </p>
      <form className="w-full grid gap-5">
        <div className="relative flex items-center border-b border-white/40 focus-within:border-pink-400 transition">
          <FaUser className="text-purple-200 mr-2" />
          <input
            type="text"
            aria-label="Username"
            className="bg-transparent px-0 py-3 flex-1 text-white placeholder:text-purple-200 font-medium outline-none border-none"
            placeholder="Username"
            autoComplete="username"
            id="username"
            {...register('username', { required: true })}
            required
          />
        </div>
        <div className="relative flex items-center border-b border-white/40 focus-within:border-pink-400 transition">
          <FaEnvelope className="text-purple-200 mr-2" />
          <input
            type="email"
            aria-label="Email Address"
            className="bg-transparent px-0 py-3 flex-1 text-white placeholder:text-purple-200 font-medium outline-none border-none"
            id="email" placeholder='Email Address' {...register('email', { required: true })}
            autoComplete="email"
            required
          />
        </div>
        <div className="relative flex items-center border-b border-white/40 focus-within:border-pink-400 transition">
          <FaLock className="text-purple-200 mr-2" />
          <input
            type={showPassword ? "text" : "password"}
            aria-label="Password"
            className="bg-transparent px-0 py-3 flex-1 text-white placeholder:text-purple-200 font-medium outline-none border-none"
            id="password" placeholder='Password' {...register('password', { required: true })}
            autoComplete="new-password"
            required
          />
          <button
            type="button"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="ml-1 text-purple-200 hover:text-pink-400 transition"
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>
        <div className="relative flex items-center border-b border-white/40 focus-within:border-pink-400 transition">
          <FaLock className="text-purple-200 mr-2" />
          <input
            type={showConfirm ? "text" : "password"}
            aria-label="Confirm Password"
            className="bg-transparent px-0 py-3 flex-1 text-white placeholder:text-purple-200 font-medium outline-none border-none"
            id="confirmPassword" placeholder='Confirm Password' {...register('confirmPassword', { required: true })}
            autoComplete="new-password"
            required
          />
          <button
            type="button"
            tabIndex={-1}
            aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
            className="ml-1 text-purple-200 hover:text-pink-400 transition"
            onClick={() => setShowConfirm((v) => !v)}
          >
            {showConfirm ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>
        <button
          type="submit"
          className="
            w-full mt-4 py-3 font-bold text-lg rounded-xl
            bg-gradient-to-r from-purple-500 to-pink-500
            text-white shadow-lg hover:scale-105 hover:shadow-xl transition
          " onClick={handleSubmit(createUser)}>
          Sign Up
        </button>
      </form>

      
      <div className="w-full flex items-center gap-2 my-5">
        <hr className="flex-grow border-white/40" />
        <span className="px-2 text-white/60">or</span>
        <hr className="flex-grow border-white/40" />
      </div>

      
      <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
        <div className="w-full flex justify-center">
          <GoogleLogin />
        </div>
      </GoogleOAuthProvider>

      <div className="text-xs mt-4 text-center text-white/70">
        Already a member?{" "}
        <a href="/login" className="font-semibold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text hover:underline">Sign In</a>
      </div>
    </motion.div>
  );
}
