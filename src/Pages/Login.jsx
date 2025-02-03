import { useState,useEffect } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import {addUser,removeUser} from "../utils/userSlice"
import { BASE_URL } from "../utils/constant";
import { useSelector } from "react-redux"

const Login = () => {

  const [emailError, setEmailError] = useState("");
  const [user, setUser] = useState({
    email: "shanti@gmail.com",
    password: "Qazwsxedc@123",
  });
  
  const dispatch =useDispatch();
  const navigate=useNavigate();
  
  const isUser=useSelector((store)=>store.user);
  // console.log(isUser);
  if(isUser!==null){
    return navigate('/');
  }


  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));

    if (name === "email" && !validator.isEmail(user.email)) {
      setEmailError("Please enter valid Email!");
    } else {
      setEmailError("Valid Email :)");
    }
  };

  const handleLogin = async () => {
    try {
      const emailID = user.email;
      const pass = user.password;
      const res = await axios.post(
        BASE_URL+"/signin",
        {
          emailID,
          pass,
        },
        { withCredentials: true } 
      );
      // console.log(res.data);
      dispatch(addUser(res.data));
      return navigate('/');
      // return res;
    } catch (err) {
      console.log(err);
    }
  };


  
  return (
    <div className="h-screen bg-base-200 flex items-center justify-center">
      <div className="w-3/4 md:w-2/6 border-[3px] border-cyan-500 h-auto rounded-2xl p-5">
        <h2 className="text-4xl text-center font-bold text-cyan-600 mb-5">
          LogIn
        </h2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-5 my-5">
            <label className="text-xl font-bold">
              Email ID <span className="text-red-700 text-xl">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter you email Id..."
              value={user.email}
              onChange={handleChange}
              className="border-2 border-cyan-400 rounded-lg p-2 h-10"
            />
            <p className="text-red-400">{emailError}</p>
          </div>
          <div className="flex flex-col gap-5 my-5">
            <label className="text-xl font-bold">
              Password <span className="text-red-700 text-xl">*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter you password..."
              value={user.password}
              onChange={handleChange}
              className="border-2 border-cyan-400 rounded-lg p-2 h-10"
            />
          </div>
        </div>
        <button
          onClick={handleLogin}
          className="my-5 w-full border-2 h-12 rounded-xl bg-cyan-300 hover:bg-cyan-500 text-black text-2xl"
        >
          Submit
        </button>
        <p className="mb-10">
          Don&apos;t have an account?{" "}
          <span className="underline text-blue-600">Register Here</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
