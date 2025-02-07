import { useState,useEffect } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import {addUser,removeUser} from "../utils/userSlice"
import { BASE_URL } from "../utils/constant";
import { useSelector } from "react-redux"
import UserCard from "./UserCard";


const EditProfile = () => {
    const feedUser = useSelector((store) => store.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState({
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      about: "",
      skills: "",
      photoUrl: "https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2526512481.jpg",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
      try {
        const res = await axios.patch(
          BASE_URL + "/profile/edit",
          user,
          { withCredentials: true }
        );
        setUser(res.data.data);
        dispatch(addUser(res.data.data));
        alert(res.data.message);
      } catch (err) {
        console.error(err.response?.data || "Error updating profile");
        alert(err.response?.data || "Error updating profile");
      }
    };

    useEffect(() => {
      if (feedUser) {
        setUser({
          firstName: feedUser.firstName || "",
          lastName: feedUser.lastName || "",
          age: feedUser.age || "",
          gender: feedUser.gender || "",
          about: feedUser.about || "",
          skills: feedUser.skills || "",
          photoUrl: feedUser.photoUrl || "https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2526512481.jpg",
        });
      }
    }, [feedUser]);

    return (
      <div className="flex flex-row justify-center items-center  gap-5"  >
      <div className="h-screen w-2/5 flex items-center justify-center">
        <div className="w-3/4  border-[3px] border-cyan-500 h-auto rounded-2xl p-5">

          <h2 className="text-4xl text-center font-bold text-cyan-600 mb-2">
            Edit Profile
          </h2>

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

          <button
            className="my-5 w-full border-2 h-12 rounded-xl bg-cyan-300 hover:bg-cyan-500 text-black text-2xl"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
      <UserCard user={user}/>
      </div>


    );
}

export default EditProfile