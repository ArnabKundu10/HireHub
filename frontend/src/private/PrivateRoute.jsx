// import React from 'react'
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
const PrivateRoute = ({children}) => {
  const {token}=useAuth();
    const notAuthorized=()=>{
     return <Navigate to="/auth/login" replace />;
    }
    return token ? children : notAuthorized();
}

export default PrivateRoute
