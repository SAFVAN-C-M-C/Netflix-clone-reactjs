import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
const NavBar = () => {
  const { user, logOut } = UserAuth();
  // console.log(user?.email);
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-between items-center p-4 z-[100] w-full absolute">
      <Link to="/">
        <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
          NETFLIX
        </h1>
      </Link>
      {user?.email ? (
        <div className="flex items-center">
          <Link to="/account" className="flex items-center">
            <button className=" text-white pr-4">
              <IoPersonCircleOutline
                className="bg-red-600 rounded-full"
                size={30}
              />
            </button>
          </Link>
          <button
            onClick={handleLogOut}
            className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white"
          >
            <MdLogout />
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className=" text-white pr-4">Sign In</button>
          </Link>
          <Link to="/signup">
            <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
