import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./store/loginSlice";
import Header from "./components/header/Header";

function App() {
   const loginStatus = useSelector((state) => state.login);
   const dispatch = useDispatch();
   useEffect(() => {
      fetch("http://localhost:8000/api/v1/users/user", {
         credentials: "include",
      })
         .then((res) => res.json())
         .then((data) => {
            if (data) {
               if (data.success) {
                  dispatch(login(data.data));            
               }
            } else {
               dispatch(logout());
            }
         })
         .catch((error) => console.log(error));
   }, []);

   return (
      <div className="w-screen min-h-screen bg-gray-100">
         {loginStatus.isLoggedin ? <Header /> : <></>}
         <Outlet />
      </div>
   );
}

export default App;
