// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect,useContext } from 'react';
import axios from '../utils/api';
// import {Navigate } from 'react-router-dom';
// import Cookies  from 'js-cookie';
const AuthContext = createContext();

export const AuthProvider=({ children })=> {
  const [sideBtns,SetSideBtns]=useState(0);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [jobs, setJobs] = useState([]);
  const [user,setUser]=useState({});
  const verifyCookie = async () => {
    try {
      const { data } = await axios.post(
        "/auth/",token
      );
      const {company} = data;
      console.log(company);
      setUser(company);
    } catch (error) {
       console.log(error);
    }
    
};
const postJobs=async()=>{
  try {
    const resp=await axios.post("/jobs/myjobs",token);
    setJobs(resp.data); 
    console.log(resp.data);
  } catch (error) {
    console.log(error);
  }
}
  useEffect(() => {
    verifyCookie();
    postJobs();
  }, [token]);

  return (
    <AuthContext.Provider value={{postJobs,verifyCookie, user, setUser,token,setToken,jobs,setJobs,sideBtns,SetSideBtns}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth=()=>{
  const mainContext=useContext(AuthContext);
  return(
     mainContext
  )
}
