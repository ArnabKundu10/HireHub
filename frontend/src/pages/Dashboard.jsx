// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from '../utils/api';
import { NavLink, useNavigate } from 'react-router-dom';
import CreateProduct from '../components/CreateProduct';
export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const verifyCookie = async () => {
    const { data } = await axios.post(
      "/auth/",
      {},
      { withCredentials: true }
    );
    const { status,message } = data;
     status
      ? navigate("/")
      : ( navigate("/auth/login"));
  };
  useEffect(() => {
    verifyCookie();
  }, []);
  const Logout = async() => {
    try {
      const response=await axios.post("/auth/logout/",{},
        { withCredentials: true });
         navigate("/auth/register"); 
         alert(response.data.message);
    } catch (error) {
      alert("logout successfully");
      console.log(error)
    }
  };

  // useEffect(() => {
  //   axios.get('/company/jobs').then((response) => {
  //     setJobs(response.data);
  //   }).catch((error) => {
  //     console.error('Error fetching company jobs:', error);
  //   });
  // }, []);

  return (
    <div>
      <div className='bg-nav p-4 flex justify-center fixed z-50 w-full bg-blue-500 text-white'>
      <div className='fs-4 me-4 text-5xl font-bold'><NavLink to="/">HireHub</NavLink></div>
      </div>
      <div className='relative pt-25 ms-2 me-2'>
        <div className='w-1/4 z-50 fixed text-2xl font-bold h-150 text-center flex flex-col align-middle justify-center m-2 bg-gray-800 rounded'>
           <button className='btn bg-blue-500 text-white p-5 ms-5 me-5 mt-1 rounded'>Create a job</button>
           <button className='btn bg-blue-500 text-white p-5 ms-5 me-5 mt-1 rounded'>Job Statistics</button>
           <button className='btn bg-blue-500 text-white p-5 ms-5 me-5 mt-1 rounded'>Your Company</button>
           <button className='cursor-pointer btn bg-blue-500 text-white p-5 ms-5 me-5 mt-1 rounded' onClick={Logout}>SignOut</button>
        </div>
        <div className='float-right ms-20 me-20 mt-2  w-2/3 rounded bg-gray-800'>
            <CreateProduct/>
        </div>
      </div>
    </div>
  );
}
