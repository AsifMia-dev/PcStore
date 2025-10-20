import React from 'react'
import { Routes ,Route } from 'react-router-dom';
import Registration from '../pages/auth/Registration';
import Login from '../pages/auth/Login';

const RouteComponent = () => {
  return (
    <Routes>
        <Route path='/res' element={<Registration />} />
        <Route path='/' element={<Login />} />
    </Routes> 
  )
}

export default RouteComponent;
