import React from 'react'
import { useState,useEffect } from "react";
import validator from "validator";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import {addUser,removeUser} from "../utils/userSlice"
import { BASE_URL } from "../utils/constant";
import { useSelector } from "react-redux"


const Signup = () => {
  
    const [emailError, setEmailError] = useState("");
    const [user, setUser] = useState({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      gender: "",
      age: "",
      photoUrl: "",
      about: "",
      skills: "",
    });
  
    // const dispatch =useDispatch();
    const navigate=useNavigate();
    
    const isUser=useSelector((store)=>store.user);
    // console.log(isUser);
    
  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setUser((prev) => ({ ...prev, [name]: value }));
  
      if (name === "email" && !validator.isEmail(user.email)) {
        setEmailError("Please enter valid Email!");
      } else {
        setEmailError("Valid Email :)");
      }
    };
  
    useEffect(() => {
      if(isUser !== null) {
        navigate('/');
      }
    }, [isUser, navigate]);
  
    const handleSignup = async () => {
      try {
        const emailId = user.email;
        const password = user.password;
        const firstName = user.firstName;
        const lastName = user.lastName;
        const gender = user.gender;
        const age = user.age;
        const photoUrl = user.photoUrl;
        const about = user.about;
        const skills = Array.isArray(user.skills) ? user.skills : user.skills.split(",");   

        const res = await axios.post(
          BASE_URL+"/signup",
          {
           emailId,
           password,
           firstName,
           lastName,
           gender,
           age,
           photoUrl,
           about,
           skills
          },
          { withCredentials: true } 
        );

        // console.log(res.data);
        // dispatch(addUser(res.data));
        navigate('/login');

      } catch (err) {
        console.log(err);   
        alert(err.response?.data || "Error during signup");
      }
    };
  
    return (
      <div className="h-auto bg-base-200 flex justify-center">
        <div className="w-3/4 md:w-2/6 border-[3px] mt-10  border-cyan-500 h-auto rounded-2xl p-5">
          <h2 className="text-4xl text-center font-bold text-cyan-600 mb-2">
            SignUp

          </h2>
          <div className="flex flex-col">
            <div className="flex flex-col gap-2">
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
            <div className="flex flex-col gap-2">
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
            
          <div className="flex flex-col">
            <div className="flex flex-row justify-start gap-5">


            <div className="flex flex-col my-2 w-1/2">
              <label className="text-xl font-bold">
                First Name <span className="text-red-700 text-xl">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter you first name..."
                value={user.firstName}
                onChange={handleChange}
                className="border-2 border-cyan-400 rounded-lg mt-2 p-2 h-10"
              />
            </div>
            <div className="flex flex-col my-2  w-1/2">
              <label className="text-xl font-bold">
                Last Name <span className="text-red-700 text-xl">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter you last name..."
                value={user.lastName}
                onChange={handleChange}
                className="border-2 border-cyan-400 rounded-lg mt-2 p-2 h-10"
              />
            </div>
            </div>
            <div className="flex flex-row justify-start gap-5 ">
  
            <div className="flex flex-col my-2 w-1/2">
              <label className="text-xl font-bold">
                Gender <span className="text-red-700 text-xl">*</span>
              </label>

              <select
                name="gender"
                placeholder="Enter you gender..."
                value={user.gender}
                onChange={handleChange}
                className="border-2 border-cyan-400 rounded-lg mt-2 p-2 h-10"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex flex-col my-2 w-1/2">
              <label className="text-xl font-bold">
                Age <span className="text-red-700 text-xl">*</span>
              </label>

              <input
                type="number"
                name="age"
                placeholder="Enter you age..."
                value={user.age}
                onChange={handleChange}
                className="border-2 border-cyan-400 rounded-lg mt-2 p-2 h-10"
              />
            </div>
            </div>
            <div className="flex flex-col my-2">
              <label className="text-xl font-bold">
                Photo Url <span className="text-red-700 text-xl">*</span>
              </label>
              <input
                type="text"
                name="photoUrl"
                placeholder="Enter you photo url..."
                value={user.photoUrl}
                onChange={handleChange}
                className="border-2 border-cyan-400 rounded-lg mt-2 p-2 h-10"

              />
            </div>
            <div className="flex flex-col  my-2">
              <label className="text-xl font-bold">
                About <span className="text-red-700 text-xl">*</span>
              </label>
                <textarea
                type="text"
                name="about"
                placeholder="Enter you about..."
                value={user.about}
                onChange={handleChange}
                className="border-2 border-cyan-400 rounded-lg   mt-2  p-2 h-20"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xl font-bold">
                Skills <span className="text-red-700 text-xl">*</span>
              </label>
              <div className="flex flex-col my-2 ">
                <input
                  type="text"
                  name="skills"
                  placeholder="Enter you skills..."
                  value={user.skills}
                  onChange={handleChange}
                  className="border-2 border-cyan-400 rounded-lg p-2 h-10"
                />
              </div>
            </div>
          </div>
          </div>
          <button
            onClick={handleSignup}
            className="my-5 w-full border-2 h-12 rounded-xl bg-cyan-300 hover:bg-cyan-500 text-black text-2xl"
          >

            SignUp
          </button>
          <p className="mb-10">
            Already have an account?{" "}

            <Link to="/login" className="underline text-blue-600">Login Here</Link>
          </p>
        </div>


      </div>
    );
}

export default Signup