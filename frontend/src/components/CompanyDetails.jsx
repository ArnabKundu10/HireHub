import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
const CompanyDetails = () => {
  const {user,SetSideBtns,jobs}=useAuth();
  // console.log(user);
   useEffect(()=>{
    SetSideBtns(3);
   },[])
  return (
    <div className='flex flex-col align-middle justify-center float-right h-dvh ms-20 me-20 mt-2 pt-10 p-20  w-2/3 rounded bg-gray-800'>
      <p className='font-extrabold text-5xl text-center mb-4'>{user.name}</p>
      <div className='flex justify-between border-b-1 p-3 m-3 text-xl border-x-white'>
        <div>Company Name</div>
        <div>{user.name}</div>
      </div>
      <div className='flex justify-between border-b-1 p-3 m-3 text-xl border-x-white'>
         <div>Email-id</div>
         <div>{user.email}</div>
      </div>
      <div className='flex justify-between border-b-1 p-3 m-3 text-xl border-x-white'>
         <div>Date of profile creation</div>
         <div>{new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit"
           })}</div>
      </div>
      <div className='flex justify-between border-b-1 p-3 m-3 text-xl border-x-white'>
         <div>Total number of job posted</div>
         <div>{jobs.length}</div>
      </div>
    </div>
  )
}

export default CompanyDetails
