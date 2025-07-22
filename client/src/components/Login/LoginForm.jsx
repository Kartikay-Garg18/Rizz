import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login as authLogin, connectSocket } from "../../store/authSlice";
import { login } from "../../services/auth";
import { FaEnvelope, FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "./GoogleLogin";
import { getUsers } from "../../services/chat";
import { motion } from "framer-motion";

export default function LoginForm() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const loginUser = async (data) => {
    try {
      const user = await login(data);
      if (!user) throw new Error("Login failed");
      
      // Ensure consistent user structure with _id property
      const userData = { 
        ...user,
        _id: user.id || user._id // Use existing _id or id as _id
      };
      
      dispatch(authLogin(userData));
      dispatch(connectSocket());
      getUsers(dispatch);
    } catch (e) {
      console.error(e);
    }
  };

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
        backdropFilter: 'blur(28px)',
        fontFamily: "Sora, sans-serif"
      }}
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.23, type: "spring" }}
    >
      <h2 className="w-full text-3xl md:text-4xl font-extrabold mb-1 text-center bg-gradient-to-r from-purple-500 via-pink-400 to-pink-600 bg-clip-text text-transparent">
        Login
      </h2>
      <p className="mb-8 text-white/90 text-center text-base md:text-lg font-medium">
        Welcome back to Rizz
      </p>

      <form onSubmit={handleSubmit(loginUser)} className="w-full grid gap-5">
        
        <div className="relative flex items-center border-b border-white/40 focus-within:border-pink-400 transition">
          <FaEnvelope className="text-purple-200 mr-2" />
          <input
            type="email"
            aria-label="Email"
            {...register("email", { required: true })}
            className="bg-transparent px-0 py-3 flex-1 text-white placeholder:text-purple-200 font-medium outline-none border-none"
            placeholder="Email"
            autoComplete="username"
            required
          />
        </div>

        
        <div className="relative flex items-center border-b border-white/40 focus-within:border-pink-400 transition">
          <FaLock className="text-purple-200 mr-2" />
          <input
            type={showPassword ? "text" : "password"}
            aria-label="Password"
            {...register("password", { required: true })}
            className="bg-transparent px-0 py-3 flex-1 text-white placeholder:text-purple-200 font-medium outline-none border-none"
            placeholder="Password"
            autoComplete="current-password"
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

        <button
          type="submit"
          className="
            w-full mt-4 py-3 font-bold text-lg rounded-xl
            bg-gradient-to-r from-purple-500 to-pink-500
            text-white shadow-lg hover:scale-105 hover:shadow-xl transition
          "
        >
          Sign In
        </button>
      </form>

      
      <div className="w-full flex justify-end mt-3">
        <span
          className="text-xs cursor-pointer font-semibold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text hover:underline transition"
          onClick={() => navigate("/forgot")}
        >
          Forgot password?
        </span>
      </div>

      
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
        Don't have an account?{" "}
        <button
          type="button"
          className="font-semibold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text hover:underline"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </div>
    </motion.div>
  );
}
