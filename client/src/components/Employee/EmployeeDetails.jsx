import React from "react";
import convertDate from "./convertdate";
import { Link, useNavigate } from "react-router-dom";

function EmployeeDetails({ data, setList }) {
   const navigate = useNavigate()
   function deleteuser(){
      fetch(`http://localhost:8000/api/v1/employee/edit/${data?._id}`, {
         method: "DELETE",
         credentials: "include",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ id: data._id }),
      })
         .then((res) => res.json())
         .then((check) => {
            if(check.success){
               setList(prev => prev.filter((item) => item._id !== data._id))
            }
         })
         .catch((error) => console.error(error));
   }
   return (
      <tr>
         <td className="border-collapse border border-slate-400 px-2 py-1">
            {data._id}
         </td>
         <td className="border-collapse border border-slate-400 px-2 py-1">
            <img
               src={data.avatar}
               alt={data.fullname}
               className="size-14 object-cover rounded-full"
            />
         </td>
         <td className="border-collapse border border-slate-400 px-2 py-1">
            {data.fullname}
         </td>
         <td className="border-collapse border border-slate-400 px-2 py-1">
            {data.email}
         </td>
         <td className="border-collapse border border-slate-400 px-2 py-1">
            {data.mobileNumber}
         </td>
         <td className="border-collapse border border-slate-400 px-2 py-1">
            {data.designation}
         </td>
         <td className="border-collapse border border-slate-400 px-2 py-1">
            {data.gender}
         </td>
         <td className="border-collapse border border-slate-400 px-2 py-1">
            {data.course}
         </td>
         <td className="border-collapse border border-slate-400 px-2 py-1">
            {convertDate(data.createdAt)}
         </td>
         <td className="border-collapse border border-slate-400 px-2 py-1">
            <Link to={`/add/${data._id}`} className="mr-1 cursor-pointer text-green-600"><span className="material-symbols-outlined">edit_note</span></Link>
            <button onClick={deleteuser} className="ml-1 cursor-pointer text-red-600"> <span className="material-symbols-outlined cursor-pointer">delete</span></button>
            
           
         </td>
      </tr>
   );
}

export default EmployeeDetails;
