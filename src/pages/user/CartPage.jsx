import React from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';


import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Image } from 'primereact/image';

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

import Layout from '../../components/Layout';
import fetchProducts from '../../components/HomeComponents/ProductList/AllProducts';
import CheckoutComponent from './Checkout'
import axios from 'axios'


const CartPage = () => {
  const  {user , login} = useContext(AuthContext);
  const [cartItems, setCartItems] = React.useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  useEffect(() => {
    const getAllProducts = async () => {
      const products = await fetchProducts();
      const keys = Object.keys(products);
      const values = keys.map( key => products[key]).flat();

      const productMap = {};
      values.forEach((product) => {
        productMap[product.id] = product;
      });
      
     const initialCart = user.cart.map((item) => ({
        ...productMap[item.id],
        itemQuantity: item.itemQuantity || 1
      }));


      setCartItems(initialCart);
    }
    getAllProducts();
  },[user]);

  const updateCartOnServer = async (updatedCart) =>{
    const cartForServer = updatedCart.map((item) =>(
      {
        id:item.id,
        itemQuantity :item.itemQuantity
      }
    ))
    
    try{
      await axios.patch(`http://localhost:3000/users/${user.id}`,{
        cart: cartForServer
      })
      // const updatedUser = {...user, cart : updatedCart};
      const updatedUser = { ...user, cart: cartForServer };
      login(updatedUser);
      // setCartItems(updatedCart);

    }catch(err){
      console.log('Failed to Update Cart ',err);
      alert("Failed to update cart. Try again");
    }
  }

    const updateQuantity = (id, value) => {
      const updatedCart = cartItems.map(item => {
        if (item.id === id) {
          return { 
            ...item, 
            itemQuantity: value || 1 
          };
        }
         return { ...item }; 
      });
      setCartItems(updatedCart);
      updateCartOnServer(updatedCart);
    };
    const handleRemove = (rowData) =>{
     const updatedCart = cartItems.filter(item => rowData.id !== item.id);
     setCartItems(updatedCart);
     updateCartOnServer(updatedCart);
    }

    
    const ImageBodyTemplate = ({product}) => {
      return (
        <div className="flex items-center justify-center">
          <Image
            src={product.Image}
            alt={product.Name}
            imageClassName="w-25 h-25 object-contain rounded"
            preview
          />
        </div>
      );
    };
      


   const QuantityBodyTemplate = ({product}) => {
     return (
       <div className="flex gap-4">
         <Button 
           icon="pi pi-minus" 
           outlined
           severity="secondary"
           onClick={() => updateQuantity(product.id, product.itemQuantity - 1)}
           disabled={product.itemQuantity === 1}
          
         />
         <InputNumber 
           value={product.itemQuantity}
           onValueChange={(e) => updateQuantity(product.id, e.value)}
           min={1}
           showButtons={false}
           inputClassName="w-20 text-center font-semibold"
         />
         <Button 
           icon="pi pi-plus" 
           rounded
           outlined
           severity="secondary"
           onClick={() => updateQuantity(product.id, product.itemQuantity + 1)}
          
         />
       </div>
     );
   };



   
    
  

  const calculateGrandTotal = () => {
      return cartItems.reduce((totalPrice,item) =>{
          totalPrice += item.itemQuantity*item.Price;
          return totalPrice
      },0)
  }

 

  return (
    <Layout>
      <div className='bg-gray-50 py-8 px-4'>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <i className="pi pi-shopping-cart text-7xl text-blue-600" style={{ fontSize: '3rem' }}></i>
            <h1 className="text-4xl font-bold text-gray-800">My Cart</h1>
          </div>

          <Card className="mb-6">
            {
              cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <i className="pi pi-shopping-cart text-6xl text-gray-300 mb-4"></i>
                  <p className="text-xl text-gray-500">Your cart is empty</p>
                </div>
              ) : 
              ( 
               <div className="cart-table-container">
                <div className='cart-table'>
                 <table className="w-full border-separate border-spacing-y-4">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="text-left font-bold p-3">Product</th>
                        <th className="text-left font-bold p-3">Details</th>
                        <th className="text-left font-bold p-3">Quantity</th>
                        <th className="text-left font-bold p-3">Total</th>
                        <th className="text-left font-bold p-3">Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((product) => (
                        <tr
                          key={product.id}
                          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                          {/* Image */}
                            <td className="p-3">
                              <ImageBodyTemplate product={product} />
                            </td>
                            {/* Details */}
                            <td className="p-3">
                              <p className="text-lg font-medium text-gray-800">{product.Name}</p>
                              <div className="text-blue-600 font-bold text-xl mt-1">{product.Price.toLocaleString()}  ৳</div>
                            </td>
                            {/* Quantity */}
                            <td>
                              <QuantityBodyTemplate product={product}/>
                            </td>
                            <td>
                              <div className="font-bold text-lg text-gray-800">
                                Tk{(product.Price*product.itemQuantity).toLocaleString()}
                              </div>
                            </td>
                            <td className='pl-5'>
                              <Button 
                                  icon="pi pi-trash"
                                  className="p-button-danger p-button-sm"
                                  onClick={() => handleRemove(product)}
                                />
                            </td>
                          {/* Quantity, Total, Remove cells can be added similarly */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
               </div>
              )
            }
          </Card>
          <Card>
            {cartItems.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-semibold text-gray-800">Total:</span>
                  <span className="text-3xl font-bold text-blue-600">
                    {calculateGrandTotal().toLocaleString()} ৳
                  </span>
                </div>

                <Button
                  label="Proceed to Checkout" 
                  size="large"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700  cursor-pointe transition"
                 onClick={() => setShowCheckout(true)}
                 >
                </Button>
              </div>
            )}
          </Card>
          
          {
            showCheckout && (
              <CheckoutComponent />
            )
              
          }


        </div>
      </div>
    </Layout>
  )
}

export default CartPage
