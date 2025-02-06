// src/pages/Dashboard.jsx
import React, { useEffect } from 'react';
import axios from '../utils/api';
import { NavLink, Outlet, useNavigate,Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Dashboard() {
  const {sideBtns,SetSideBtns,setToken}=useAuth();
  const navigate = useNavigate();
  const verify = async () => {
    try {
      const { data } = await axios.post(
        "/auth/",
        {},
        { withCredentials: true }
      );
      // navigate("/");
    } catch (error) {
       console.log(error);
       navigate("/auth/login");
    }
    
};
useEffect(()=>{
  verify();
},[]);
  const Logout = async() => {
    try {
      const response=await axios.post("/auth/logout/",{},
        { withCredentials: true });
         setToken("");
         navigate("/auth/register"); 
         alert(response.data.message);
    } catch (error) {
      alert("logout successfully");
      console.log(error)
    }
  };
  const styleSideBtns=(id)=>{
    if(id===sideBtns){
      return {
         backgroundColor:"white",
         color:"rgb(43,127,255)"
      }
    }
  }

  return (
    <div>
      <div className='bg-nav p-4 flex justify-center fixed z-50 w-full bg-blue-500 text-white'>
      <div onClick={()=>SetSideBtns(0)} className='fs-4 me-4 text-5xl font-bold'><NavLink to="/">HireHub</NavLink></div>
      </div>
      <div className='relative pt-25 ms-2 me-2'>
        <div className='w-1/4 z-50 fixed text-2xl font-bold h-150 text-center flex flex-col align-middle justify-center m-2 bg-gray-800 rounded'>
           <button onClick={(e)=>{e.preventDefault();SetSideBtns(1);navigate("/create-job")}} style={styleSideBtns(1)}  className='btn hover:bg-white hover:text-blue-500 bg-blue-500 text-white p-5 ms-5 me-5 mt-1 rounded'> Create a job</button>

           <button onClick={(e)=>{e.preventDefault();SetSideBtns(2);navigate("/statistics")}} style={styleSideBtns(2)}  className='btn hover:bg-white hover:text-blue-500 bg-blue-500 text-white p-5 ms-5 me-5 mt-1 rounded' >Job Statistics</button>

           <button onClick={(e)=>{e.preventDefault();SetSideBtns(3);navigate("/company-details")}} style={styleSideBtns(3)}  className='btn hover:bg-white hover:text-blue-500 bg-blue-500 text-white p-5 ms-5 me-5 mt-1 rounded' >Your Company </button>

           <button style={styleSideBtns(4)} className='cursor-pointer btn hover:bg-white hover:text-blue-500 bg-blue-500 text-white p-5 ms-5 me-5 mt-1 rounded' onClick={Logout}>SignOut</button>
        </div>
        {!sideBtns && 
        <div className='flex flex-col justify-center align-middle float-right ms-20 me-20 mt-2 text-center p-20 h-150 w-2/3 rounded bg-gray-800'>
          <div className=''>
          <p className='font-bold text-5xl'>
              Welcome to Your job portal
            </p>
            <p className='font-bold text-xl'>
              Here, you can post and manage your job through seamless way  
            </p>
          </div>
            
            <div className='font-bold text-xl flex '>
              <div className='w-1/2 p-5 rounded bg-black m-2'>
                <p>Wanna Create a job ? Check the link below</p> 
                <p onClick={()=>SetSideBtns(1)} className='text-blue-500'><Link to="create-job"> Create</Link></p>
              </div>
              <div className='w-1/2 p-5 rounded bg-black m-2'>
               <p>See your posted job here</p> 
               <p onClick={()=>SetSideBtns(2)} className='text-blue-500' ><Link to="statistics"> All posted jobs</Link></p>
              </div>
            </div>
        </div>
         }  
        
        <Outlet/>
        {/* <CreateProduct/> */}
      </div>
    </div>
  );
}
