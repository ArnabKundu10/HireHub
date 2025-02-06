import React, { useEffect, useState } from 'react'
import FormInput from './FormInput';
import axios from "../utils/api";
import { useAuth } from '../context/AuthContext';
const CreateJob = () => {
   const[email,setEmail]=useState("");
   const {postJobs,SetSideBtns}=useAuth();
   const [job,setJob]=useState({
      title:"",
      description:"",
      experienceLevel:"BEGINNER",
      candidates : [],
      endDate:""
   });
   const handleChange=(e)=>{
      e.preventDefault();
// console.log(e.target.value)
      setJob({
         ...job,
         [e.target.name]: e.target.value,
       });
      //  console.log(job)
   }
   const handleSubmit=async(e)=>{
      e.preventDefault();
      e.stopPropagation();
      // console.log(job)
     try {
      const resp=await axios.post("/jobs/create",job);
      console.log(resp);
      postJobs();
      setJob({
         title:"",
      description:"",
      experienceLevel:"",
      candidates : [],
      endDate:"",
   }
      )
      setEmail("");
      alert("Job created Successfully"); 
     } catch (error) {
       console.log(error);
     }
   }
   const filterEmail=(e,index)=>{
      e.preventDefault();
      e.stopPropagation();
      setJob((prevJob) => ({
         ...prevJob,
         candidates: [...prevJob.candidates.filter((_, i) => i !== index)], // Add new email to candidates array
       })); 
   }
   const handleEmail=(e)=>{
    setEmail(e.target.value);
   }
   const addEmail=(e)=>{
      e.preventDefault();
      e.stopPropagation();
      if(!job.candidates.includes(email) && email){
         setJob((prevJob) => ({
            ...prevJob,
            candidates: [...prevJob.candidates, email], // Add new email to candidates array
          }));
          setEmail("");   
      }    
      else if(!email){
         alert("Do not add empty email")
      }
      else alert("already added")
   }
   useEffect(()=>{
     SetSideBtns(1);
   },[])
  return (
   <div className='float-right ms-20 me-20 mt-2  w-2/3 rounded bg-gray-800'>
    <div className='p-10 '>
      <p className='text-center fs-1 mb-10 fw-bolder text-5xl font-extrabold'>
         Create a Job
      </p>
      <form onSubmit={handleSubmit}>
      <div className="mb-3 text-xl">
         <label htmlFor="exampleFormControlInput1" className="form-label">Job Title: </label>
         <FormInput onChange={handleChange}
                value={job.title}
                type="text"
                placeholder="Title"
                name='title'
      />
      </div>
      <div className="mb-3 text-xl">
         <label htmlFor="exampleFormControlInput1" className="form-label">Description: </label>
         <FormInput onChange={handleChange}
                value={job.description}
                type="text"
                placeholder="description"
                name='description'
         />
      </div>
      <div className="mb-3 text-xl">
         <label htmlFor="exampleFormControlInput1" className="form-label">Experience: </label>
         <select name='experienceLevel' onChange={handleChange}
          value={job.experienceLevel}
           className="form-select w-1/2 p-2 mb-2 bg-gray-500 border-gray-500 rounded" aria-label="Default select example">
         <option value="BEGINNER">BEGINNER</option>
         <option value="INTERMEDIATE">INTERMEDIATE</option>
         <option value="EXPERT">EXPERT</option>
      </select>
      </div>
      <div className="mb-3 text-xl">
         <label htmlFor="exampleFormControlInput1" className="form-label">Send Job Email Alerts: </label>
         <FormInput onChange={handleEmail}
                value={email}
                type="email"
                placeholder="example@gmail.com"
                name='email'
         />
         <button onClick={addEmail} className='p-2 text-blue-500 border-1 border-blue-500 bg-transparent'>+ Add</button>
         <div>
   {job.candidates.map((elem,id)=> <button className='bg-gray-500 p-2 m-2' key={id} >{elem} <i className="fa-solid fa-xmark" onClick={(e)=>filterEmail(e,id)}></i></button>) }
         </div>
      </div>
      <div className="mb-3 text-xl">
         <label htmlFor="exampleFormControlInput1" className="form-label">End Date: </label>
         <FormInput onChange={handleChange}
               //  value={job.endDate}
                type="date"
                placeholder="EndDate"
                name='endDate'
         />
      </div>
      <div className='text-center'><button className='cursor-pointer bg-blue-500 pt-2 pb-2 ps-5 pe-5 font-bold rounded' type='submit' >Submit</button></div>
      </form>
    </div>
    </div>
  )
}

export default CreateJob
