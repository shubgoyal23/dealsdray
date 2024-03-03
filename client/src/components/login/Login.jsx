import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../store/loginSlice";

function Login() {
   const [err, setErr] = useState(null);
   const dispatch = useDispatch();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const onSubmit = (data) => {
      setErr(null);
      let details = {
         email: data.email,
         password: data.password,
      };

      fetch("http://localhost:8000/api/v1/users/login", {
         method: "POST",
         credentials: "include",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(details),
      })
         .then((res) => res.json())
         .then((data) => {
            if (data) {
               if (data.success) {
                  dispatch(login(data?.data?.user));
               }else{
                  setErr(data)
               }
            }
         })
         .catch((error) => {
            setErr(error);
            console.log(error);
         });
   };

   return (
      <>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 grid grid-cols-6 gap-6"
         >
            <div className="col-span-6">
               <p className="text-red-500 text-sm">{err ? err.message : ""}</p>
            </div>
            <div className="col-span-6">
               <label
                  htmlFor="LastName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
               >
                  Email
               </label>
               <input
                  type="text"
                  id="LastName"
                  name="username"
                  className="mt-1 w-full border-b-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 outline-none"
                  {...register("email", { required: true, pattern: {value: /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/i, message: "Email is invalid"}  })}
               />
               {errors.email && <span className="text-xs text-red-600 leading-3	">{errors.email.message || "Email is Required"}</span>}
            </div>

            <div className="col-span-6">
               <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
               >
                  Password
               </label>
               <input
                  type="password"
                  id="Password"
                  name="password"
                  className="mt-1 w-full border-b-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 outline-none"
                  {...register("password", { required: true, pattern: {value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long'
                } })}
               />
               {errors.password && <span className="text-xs text-red-600 leading-3	">{errors.password.message || "Password is Required"}</span>}
            </div>

            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
               <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white">
                  Login
               </button>
            </div>
         </form>
      </>
   );
}

export default Login;
