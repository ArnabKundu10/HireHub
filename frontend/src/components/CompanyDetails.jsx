import React from 'react'
import { useLocation } from 'react-router-dom'
const CompanyDetails = () => {
 const location=useLocation();
 const {user}=location.state||{};
  return (
    <div className='float-right ms-20 me-20 mt-2 p-20  w-2/3 rounded bg-gray-800'>
      <p className='font-extrabold text-5xl text-center'>{user.name}</p>
    </div>
  )
}

export default CompanyDetails
