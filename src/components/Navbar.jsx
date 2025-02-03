import { useSelector } from "react-redux"

const Navbar = () => {
  const user=useSelector((store)=>store.user);
  console.log(user);
  return (
    <div className="navbar bg-base-300">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">🧑‍💻 DevTinder</a>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      {user && <p>{user.firstName}</p>}
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        {user && <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={`${user.photo_url?`${user.photo_url}`:"https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2526512481.jpg"}`} />
        </div>}
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default Navbar