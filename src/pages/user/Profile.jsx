import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios'

const Profile = () => {
  const {user} = useContext(AuthContext);  
  const[order,setOrder] = useState([]);

  useEffect(() => {
    if(!user) return;
    const fetchUserOrder = async () => {
        try{
            const response = await axios.get(`http://localhost:3000/order?userId=${user.id}`)
            const order = response.data;
            console.log(order);

        }
        catch(err){
            console.log(err);
        }
    }
    fetchUserOrder();
  },[user])
  

  return (
    <div>
      Hello I am Profile page
    </div>
  )
}

export default Profile
