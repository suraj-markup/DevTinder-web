import { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addFeed, removeFeed } from "../utils/feedSlice";
import { useSelector } from "react-redux";
import UserCard from "../components/UserCard";
import { useNavigate } from "react-router-dom";


const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const getFeed = async () => {
    if (feedData) {
      return;
    }
    try {
      const res = await axios.get(
        BASE_URL + "/feed",
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err.message);
      if (err.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    getFeed();
  }, [user]);

  const feedData = useSelector((store) => store.feed);
  // console.log(feedData[0]);

  return(feedData && (
  <div className="flex items-center justify-center my-10">
    <UserCard user={feedData[0]}/>
  </div>) ) ;
};

export default Feed;
