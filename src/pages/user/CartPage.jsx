import React from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CartPage = () => {
  const  {user , login} = useContext(AuthContext);
  const [cartItems, setCartItems] = React.useState([]);
//   const navigate = useNavigate();

  useEffect(() => {
    const initialCart = (user?.cart || []).map( (item) => ({
        ...item,
        itemQuantity : item.itemQuantity || 1
    }));
    setCartItems(initialCart);
  },[user])
  console.log("Cart Items:", user?.cart);

  return (
    <div>
      <h1>Hello I am cart page</h1>
    </div>
  )
}

export default CartPage
