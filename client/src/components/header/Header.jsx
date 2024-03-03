import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/loginSlice";
import { Link } from "react-router-dom";

function Header() {
   const admin = useSelector((state) => state.login.userdata);
   const dispatch = useDispatch();
   function logoutUser() {
      fetch("http://localhost:8000/api/v1/users/logout", {
         credentials: "include",
      })
         .then((res) => res.json())
         .then((data) => {
            if (data) {
               if (data.success) {
                  dispatch(logout());
               }
            }
         })
         .catch((error) => {
            console.log(error);
         });
   }
   return (
      <div className="w-full h-20 bg-white border-b-[1px] px-4 border-gray-300 shadow-md flex justify-between items-center">
         <div className="w-1/5">
            <Link to="/">
               <img src="/logo.jpg" alt="Logo" />
            </Link>
         </div>
         <div className="flex justify-between items-center gap-6">
            <Link to="/" className="font-bold text-sm md:text-xl text-blue-600">
               Home
            </Link>
            <Link
               to="/list"
               className="font-bold text-sm md:text-xl text-blue-600"
            >
               Emplayee List
            </Link>
         </div>
         <div className="flex justify-between items-center gap-6">
            <h2 className="font-bold text-sm md:text-xl text-blue-600">
               {admin.fullname}
            </h2>
            <button
               className="font-bold text-sm md:text-xl text-blue-600"
               onClick={logoutUser}
            >
               Logout
            </button>
         </div>
      </div>
   );
}

export default Header;
