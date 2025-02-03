import Navbar from "../components/Navbar";
import Foooter from "../components/Foooter";
import { Outlet } from "react-router-dom";
const Body = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Foooter/>
    </div>
  )
}

export default Body