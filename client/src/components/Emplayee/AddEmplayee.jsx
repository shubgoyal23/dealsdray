import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

function AddEmplayee() {
   const [err, setErr] = useState(null);
   const navigate = useNavigate();
   let { id } = useParams();
   const [userDate, setUserData] = useState([]);
   const [newForm, setNewForm] = useState("");
   const [file, setfile] = useState(null);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const onSubmit = (data) => {
      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("fullname", data.fullname);
      formData.append("email", data.email);
      formData.append("designation", data.designation);
      formData.append("course", data.course);
      formData.append("mobileNumber", data.mobileNumber);
      formData.append("gender", data.gender);

      setErr(null);
      let url;
      if (newForm) {
         url = "http://localhost:8000/api/v1/employee/create";
      } else {
        formData.append("id", userDate._id);
         url = "http://localhost:8000/api/v1/employee/edit";
      }

      fetch(url, {
         method: "POST",
         credentials: "include",

         body: formData,
      })
         .then((res) => res.json())
         .then((data) => {
            if (data) {
               if (data.success) {
                  navigate("/list");
               } else {
                  setErr(data);
               }
            }
         })
         .catch((error) => {
            setErr(error);
            console.log(error);
         });
   };

   const finduser = (id) => {
      fetch("http://localhost:8000/api/v1/employee/info", {
         method: "POST",
         credentials: "include",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ id: id }),
      })
         .then((res) => res.json())
         .then((data) => {
            let list = data?.data;
            setUserData(list);
         })
         .catch((error) => console.error(error));
   };

   useEffect(() => {
      if (id === "new") {
         setNewForm(true);
      } else {
         finduser(id);
         setNewForm(false);
      }
   }, [id]);


   return (
      <div className="w-4/5 mx-auto my-10 bg-gray-100 p-6 shadow-lg border border-gray-300 rounded-lg">
         <h2 className="text-xl text-blue-600 font-bold underline text-center">
            {newForm ? "Create Employee" : "Edit Employee"}
         </h2>

         <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className="mt-6 grid grid-cols-6 gap-6"
         >
            <div className="col-span-6">
               <p className="text-red-500 text-sm">{err ? err.message : ""}</p>
            </div>
            <div className="col-span-6">
               <label
                  htmlFor="FirstName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
               >
                  Full Name
               </label>
               <input
                  type="text"
                  id="FirstName"
                  name="fullname"
                  defaultValue={userDate?.fullname}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 border-b-2 dark:bg-gray-800 dark:text-gray-200 outline-none"
                  {...register("fullname", { required: true })}
               />
               {errors.fullname && (
                  <span className="text-xs text-red-600 leading-3	">
                     {errors.fullname.message || "Name is Required"}
                  </span>
               )}
            </div>

            <div className="col-span-6">
               <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
               >
                  Email
               </label>
               <input
                  type="email"
                  id="Email"
                  defaultValue={userDate?.email}
                  name="email"
                  className="mt-1 w-full rounded-md border-b-2 border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 outline-none"
                  {...register("email", {
                     required: true,
                     pattern: {
                        value: /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/i,
                        message: "Email is invalid",
                     },
                  })}
               />
               {errors.email && (
                  <span className="text-xs text-red-600 leading-3	">
                     {errors.email.message || "Email is Required"}
                  </span>
               )}
            </div>

            <div className="col-span-6 grid grid-cols-6 gap-3">
               <div className="col-span-6 sm:col-span-3">
                  <label
                     htmlFor="mobile"
                     className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                     Mobile Number
                  </label>
                  <input
                     type="number"
                     maxLength={10}
                     id="mobile"
                     defaultValue={userDate?.mobileNumber}
                     name="mobile"
                     className="mt-1 w-full border-b-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 outline-none"
                     {...register("mobileNumber", {
                        required: true,
                     })}
                  />
               </div>
               <div className="col-span-6 sm:col-span-3">
                  <label
                     htmlFor=""
                     className="text-sm block font-medium text-gray-700 dark:text-gray-200"
                  >
                     Gender
                  </label>
                  <label
                     htmlFor="gender_male"
                     className="text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                     Male
                  </label>
                  <input
                     type="radio"
                     id="gender_male"
                     name="gender"
                     value={"male"}
                     className="mt-1 mr-4 rounded-md border-b-2 border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 outline-none"
                     {...register("gender", { required: true })}
                  />
                  <label
                     htmlFor="gender_female"
                     className=" text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                     Female
                  </label>
                  <input
                     type="radio"
                     id="gender_female"
                     name="gender"
                     value={"female"}
                     className="mt-1 rounded-md border-b-2 border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 outline-none"
                     {...register("gender", { required: true })}
                  />
               </div>

               <div className="col-span-6 sm:col-span-3">
                  <label
                     htmlFor="desigination"
                     className="text-sm block font-medium text-gray-700 dark:text-gray-200"
                  >
                     Desigination
                  </label>
                  <select
                     name="desigination"
                     id="desigination"
                     className="w-full outline-none"
                     {...register("designation", { required: true })}
                  >
                     <option value="HR">HR</option>
                     <option value="Manager">Manager</option>
                     <option value="Sales">Sales</option>
                  </select>
               </div>
               <div className="col-span-6 sm:col-span-3">
                  <label
                     htmlFor="course"
                     className="text-sm block font-medium text-gray-700 dark:text-gray-200"
                  >
                     Course
                  </label>
                  <select
                     name="course"
                     id="course"
                     className="w-full outline-none"
                     {...register("course", { required: true })}
                  >
                     <option value="MCA">MCA</option>
                     <option value="BCA">BCA</option>
                     <option value="BSC">BSC</option>
                  </select>
               </div>

               <div className="col-span-6">
                  <label
                     htmlFor="avatar"
                     className="text-sm block font-medium text-gray-700 dark:text-gray-200"
                  >
                     Avatar
                  </label>
                  <input
                     type="file"
                     id="avatar"
                     onChange={(e) => setfile(e.target.files[0])}
                  />
                  {userDate?.avatar ? (
                     <img
                        src={userDate?.avatar}
                        className="size-10 rounded-full"
                        alt="avatar"
                     />
                  ) : (
                     ""
                  )}
               </div>
            </div>

            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
               <button
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                  type="submit"
               >
                  Create an account
               </button>
            </div>
         </form>
      </div>
   );
}

export default AddEmplayee;
