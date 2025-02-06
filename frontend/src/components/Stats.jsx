import React, { useEffect } from 'react'
// import axios from "../utils/api"
import { useAuth } from '../context/AuthContext';
const Stats = () => {
 const {jobs,SetSideBtns}=useAuth();
//  console.log(jobs);
 useEffect(()=>{
  SetSideBtns(2);
 },[])
  return (
    <div className=' float-right ms-20 me-20 mt-2 pt-10 p-20 w-2/3 rounded bg-gray-800'>
      <p className='text-5xl font-bold mb-5'>Job you have posted so far</p>
      <div className='flex-wrap jobs flex h-100 overflow-y-scroll'>
      {jobs?.map((job,ind)=>(
          <div key={ind} className='bg-black rounded p-5 m-5 w-1/4'>
            <p className='text-xl font-bold mb-3'>{job.title.substring(0,25)}{job.title.length>20 && <span>...</span>}</p>
            <p>{job.description.substring(0,20)}...</p>
            <p>{job.experienceLevel}</p>
            <p><span>Posted On:</span> {new Date(job.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit"
           })}</p>
            <p><span>Last Date:</span> {new Date(job.endDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit"
           })}</p>
           <p className='text-center m-3'><button className='bg-blue-500 font-bold p-2 rounded'>Get More Details</button></p>
          </div>
        )).reverse()}
      </div>

    </div>
  )
}

export default Stats
