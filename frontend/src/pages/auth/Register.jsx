// src/pages/auth/Register.jsx
import React, { useState } from 'react';
import axios from '../../utils/api';
import { useNavigate,NavLink } from 'react-router-dom';
import FormInput from '../../components/FormInput';

export default function Register() {
  const [name, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response=await axios.post('/auth/register', { name, email, password });
      // console.log(response);
      navigate('/auth/login'); // Navigate to login page
    } catch (error) {
      alert("Registration failed");
      console.error('Registration failed', error);
    }
  };

  return (
    <div className="p-4 bg-black shadow rounded">
      <div className='flex justify-center items-center w-full h-dvh'>
        <div className='w-1/2 bg-gray-800 p-20 rounded'>
      <h1 className="text-xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          placeholder="Company Name"
          value={name}
          onChange={(e) => setCompanyName(e.target.value)}
        />
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
          Register
        </button>
      </form>
      <h4 className="text-xl text-white font-bold mb-4">Already have an account ? <NavLink to="/auth/login" className="text-blue-400">Sign In</NavLink></h4>

      </div>
      </div>
    </div>
  );
}
