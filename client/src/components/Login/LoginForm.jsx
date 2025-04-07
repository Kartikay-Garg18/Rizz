import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login as authLogin , connectSocket} from "../../store/authSlice";
import { useForm } from "react-hook-form";
import { login } from "../../services/auth";
import Email from "../../assets/Email.svg";
import Lock from "../../assets/Lock.svg";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "./GoogleLogin";
import { getUsers } from "../../services/chat";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUser = async (data) => {
    try {
      const user = await login(data);
      if (!user) {
        throw new Error("Login failed");
      }
      dispatch(authLogin(user));
      dispatch(connectSocket());
      getUsers(dispatch);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      className="-mx-16 flex justify-end items-center w-screen h-screen bg-opacity-60 font-pop"  
    >
      <form
        method="POST"
        className="w-[25%] border bg-white flex flex-col gap-4 justify-center items-center p-7 rounded-xl shadow-xl bg-transparent backdrop-blur-sm m-11"
        onSubmit={handleSubmit(loginUser)}
      >
        <div className="flex justify-between gap-2 items-center w-[90%]">
          <img src={Email} alt="Email" className="w-6 opacity-70 absolute" />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-full pl-8 border-opacity-40 py-1 border-b bg-transparent border-black text-slate-950 focus:border-b focus: outline-none placeholder-black"
          />
        </div>

        <div className="flex justify-between gap-2 items-center w-[90%]">
          <img src={Lock} alt="Password" className="w-6 opacity-70 absolute" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="w-full pl-8 border-opacity-40 py-1 border-b bg-transparent border-black text-slate-950 focus:border-b focus: outline-none placeholder-black"
          />
        </div>

        <button
          type="submit"
          className="border px-4 py-2 mt-3 bg-slate-950 text-white font-semibold w-[95%] rounded-lg"
        >
          Sign In
        </button>

        <span
          className="cursor-pointer font-bold"
          onClick={() => {
            navigate("/forgot");
          }}
        >
          Forgot Password?
        </span>

        <div className="flex justify-center items-center font-sans gap-2">
          <p>Don&#8217;t have an account?</p>
          <span
            className="cursor-pointer font-bold"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up here
          </span>
        </div>

        <div className="w-[85%] text-center border-b-2 border-gray-300 leading-[0.1em] my-3">
          <span className="bg-white backdrop-blur-lg px-2">or</span>
        </div>

        <div className="flex justify-center items-center font-pop gap-2">
          <GoogleOAuthProvider
            clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}
          >
            <GoogleLogin />
          </GoogleOAuthProvider>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;