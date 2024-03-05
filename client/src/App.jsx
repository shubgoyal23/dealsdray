import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./store/loginSlice";
import Header from "./components/header/Header";
import Auth from './components/Auth/Auth'

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
      <div className="w-screen h-screen bg-gray-100 overflow-hidden">
         {loginStatus.isLoggedin ? <Header /> : <></>}
        <div className="w-screen bg-gray-100 overflow-x-scroll overflow-y-scroll pb-20">
        {loginStatus.isLoggedin ? <Outlet /> : <Auth />}
        </div>
         
      </div>
   );
}

export default App;
