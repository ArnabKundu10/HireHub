// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect,useContext } from 'react';
import axios from '../utils/api';

const AuthContext = createContext();

export const AuthProvider=({ children })=> {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    console.log(token);
    setToken(token);
    // axios.get('/auth/me').then((response) => {
    //   setUser(response.data);
    // }).catch(() => setUser(null));
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, setUser,token,setToken }}>
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
