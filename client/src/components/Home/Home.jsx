import { Link } from "react-router-dom";


function Home() {
  
   return (
      <div className="w-full min-h-96 flex flex-col justify-center items-center ">
         <h1 className="text-5xl text-lime-600 font-bold animate-bounce ">
            Welcome to Dashboard
         </h1>
         <div className="mt-10 flex justify-center items-center gap-8">
            <Link to="/add/new" className="h-20 w-52 bg-amber-300 rounded-lg flex items-center justify-center cursor-pointer border-2 shadow-md">
               Create Employee
            </Link>
            <Link to={"/list"} className="h-20 w-52 bg-amber-300 rounded-lg flex items-center justify-center cursor-pointer border-2 shadow-md">
               All Employees
            </Link>
         </div>
      </div>
   );
}

export default Home;
