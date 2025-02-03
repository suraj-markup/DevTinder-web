import Navbar from "../components/Navbar";
import Foooter from "../components/Foooter";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux"


const Body = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const user=useSelector((store)=>store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      // console.log(res.data);
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.log(err);
    }
  };

  useEffect(()=>{
    if(!user){
      fetchUser();
    }
  },[]);


  return (
    <div>
      <Navbar />
      <Outlet />
      <Foooter />
    </div>
  );
};

export default Body;
