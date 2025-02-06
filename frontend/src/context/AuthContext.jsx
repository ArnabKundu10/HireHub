// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect,useContext } from 'react';
import axios from '../utils/api';
// import Cookies  from 'js-cookie';
const AuthContext = createContext();

export const AuthProvider=({ children })=> {
  const [sideBtns,SetSideBtns]=useState(0);
  const [token, setToken] = useState("");
  const [jobs, setJobs] = useState([]);
  const [user,setUser]=useState({});
  const verifyCookie = async () => {
    try {
      const { data } = await axios.post(
        "/auth/",
        {},
        { withCredentials: true }
      );
      const {status,company} = data;
      // console.log(status);
      setUser(company);
      //  status
      //   ? (navigate("/"))
      //   : ( navigate("/auth/login"));
    } catch (error) {
       console.log(error);
       navigate("/auth/login");
    }
    
};
const postJobs=async()=>{
  try {
    const resp=await axios.get("/jobs/myjobs",{},{withCredentials: true});
    setJobs(resp.data); 
    console.log(resp.data);
  } catch (error) {
    console.log(error);
  }
}
  useEffect(() => {
    postJobs();
    verifyCookie();
  }, []);

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
