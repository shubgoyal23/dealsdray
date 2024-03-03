import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Home from "../Home/Home";

function AdminPanel() {
   const loginStatus = useSelector((state) => state.login);
   const navigate = useNavigate();

   useEffect(() => {
      if (!loginStatus.isLoggedin) {
         navigate("/login");
      }
   }, [loginStatus]);

   return (
      <div className="w-screen min-h-screen bg-gray-100">
         <Home />
      </div>
   );
}

export default AdminPanel;
