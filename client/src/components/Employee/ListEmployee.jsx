import React, { useEffect, useState, useMemo } from "react";
import { debounce } from "lodash";
import EmployeeDetails from "./EmployeeDetails";
import { Link } from "react-router-dom";
function ListEmplayee() {
   const [list, setList] = useState([]);
   const [search, setSearch] = useState("");
   const [cache, setCache] = useState({});

   const findusers = (search) => {
      fetch("http://localhost:8000/api/v1/employee/find", {
         method: "POST",
         credentials: "include",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ fullname: search }),
      })
         .then((res) => res.json())
         .then((data) => {
            let list = data?.data;
            setList(list);
            setCache((prev) => ({ ...prev, [search]: data.data }));
         })
         .catch((error) => console.error(error));
   };

   const debouncedFindUsers = useMemo(() => {
      return debounce(findusers, 300);
   }, []);

   useEffect(() => {
      if (search === "") {
         listAllUsers();
      } else {
         if (cache[search]) {
            setList(cache[search]);
         } else {
            debouncedFindUsers(search);
         }
      }
      return () => {
         debouncedFindUsers.cancel();
      };
   }, [search, cache, debouncedFindUsers]);

   const listAllUsers = () => {
      fetch("http://localhost:8000/api/v1/employee/list", {
         credentials: "include",
      })
         .then((res) => res.json())
         .then((data) => setList(data.data))
         .catch((err) => console.log(err));
   };

   return (
      <div className="flex flex-col items-center w-screen min-h-screen overflow-x-scroll ">
         <div className="w-4/5 flex justify-between mt-10 mb-6 items-center">
            <h1 className=" underline text-2xl font-bold text-blue-600">
               <Link to="/add/new">Add Employee</Link>{" "}
            </h1>
            <h1 className=" underline text-2xl font-bold text-blue-600">
               Employee List
            </h1>

            <div className="w-auto h-8 bg-blue-300 rounded-full flex justify-center items-center">
               <input
                  type="text"
                  placeholder="Search"
                  className="outline-none bg-transparent pl-6"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
               />
            </div>
         </div>
         <table className="table-fixed border-collapse border border-slate-400 bg-indigo-50">
            <thead>
               <tr>
                  <th className="border-collapse border border-slate-400">
                     ID
                  </th>
                  <th className="border-collapse border border-slate-400">
                     Image
                  </th>
                  <th className="border-collapse border border-slate-400">
                     Name
                  </th>
                  <th className="border-collapse border border-slate-400">
                     Email
                  </th>
                  <th className="border-collapse border border-slate-400">
                     Mobile
                  </th>
                  <th className="border-collapse border border-slate-400">
                     Desigination
                  </th>
                  <th className="border-collapse border border-slate-400">
                     Gender
                  </th>
                  <th className="border-collapse border border-slate-400">
                     Course
                  </th>
                  <th className="border-collapse border border-slate-400">
                     Create Date
                  </th>
                  <th className="border-collapse border border-slate-400">
                     Action
                  </th>
               </tr>
            </thead>
            <tbody>
               {list.map((employee) => (
                  <EmployeeDetails
                     key={employee._id}
                     data={employee}
                     setList={setList}
                  />
               ))}
            </tbody>
         </table>
      </div>
   );
}

export default ListEmplayee;
