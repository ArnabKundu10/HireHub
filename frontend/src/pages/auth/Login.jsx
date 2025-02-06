// src/pages/auth/Login.jsx
import React, { useState } from 'react';
import axios from '../../utils/api';
import { NavLink, useNavigate } from 'react-router-dom';
import FormInput from '../../components/FormInput';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const {setToken,setVerified}=useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigate replaces useRouter

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response=await axios.post('/auth/login', { email, password },{ withCredentials: true });
      // console.log(response);
      if(response.data?.token){
        setToken(response.data.token);
        setVerified(true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
         // Navigate to home page
      }
      else alert(response.data.message);
      setEmail("");
      setPassword("");
      
    } catch (error) {
      alert("Login failed")
      console.error('Login failed', error);
    }
  };

  return (
    <div className="p-4 bg-black shadow rounded">
      <div className='flex justify-center items-center w-full h-dvh'>
        <div className='w-1/2 bg-gray-800 p-20 rounded'>
      <h1 className="text-xl text-white font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
      <h4 className="text-xl text-white font-bold mb-4">Create a new account ? <NavLink to="/auth/register" className="text-blue-400">Sign Up</NavLink></h4>
    </div>
    </div>
    </div>
  );
}
