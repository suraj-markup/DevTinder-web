import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useSelector } from "react-redux";
import UserCard from "../components/UserCard";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const feedData = useSelector((store) => store.feed);
  const [isLoading, setIsLoading] = useState(false);

  const getFeed = async () => {
    // Only fetch if we don't have data and aren't already loading
    if (feedData && feedData.length > 0 || isLoading) {
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await axios.get(
        BASE_URL + "/feed",
        { withCredentials: true }
      );
      // console.log("Feed data fetched:", res.data);
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log("Feed fetch error:", err.message);
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Call getFeed when component mounts or when user changes
    getFeed();
  }, [user, dispatch, navigate]);


  if (isLoading) {
    return <div className="flex items-center justify-center my-10 text-2xl font-bold">Loading feed...</div>;
  }

  if (!feedData) {
    return <div className="flex items-center justify-center my-10 text-2xl font-bold">No feed data found</div>;
  }
  
  if (feedData.length <= 0) {
    return <div className="flex items-center justify-center my-10 text-2xl font-bold">No new users found</div>;
  }

  return (
    <div className="flex items-center justify-center my-10">
      <UserCard user={feedData[0]} />
    </div>
  );
};

export default Feed;
