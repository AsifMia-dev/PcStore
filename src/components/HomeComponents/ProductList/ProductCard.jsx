import React, { useEffect } from 'react'
import fetchProducts from './AllProducts'
import Filter from './filter';
import {Button} from 'primereact/button';

import {Image} from 'primereact/image';
import { AuthContext } from '../../../context/AuthContext';
import { useContext } from 'react';
import { replace, useNavigate } from 'react-router-dom';

import axios from 'axios';







const ProductCard = () => {
  const {user,login} = useContext(AuthContext);
  const navigate = useNavigate();

  const [AllProducts , setAllProducts] = React.useState([]);
  const [products , setProducts] = React.useState([]);


  const handleAddToCart = async (productId) => {
     if(!user){
      alert("Please login first to add item to cart");
      navigate("/login" , { replace: true });
      return;
     }
     try{
        const updatedCart = [...user.cart || [] , {id : productId , itemQuantity: 1}];
        
        await axios.patch(`http://localhost:3000/users/${user.id}`,{
          cart:updatedCart
        }
        );

        // Update local user context 
        const updatedUser = { ...user , cart : updatedCart};
        login(updatedUser);
        alert("Added To cart")
        
     }catch(err){
      console.log("Error adding to cart:", err);
     }

  }
  
  function filterProducts(filterName){
    if(filterName === "All"){
        setProducts(AllProducts);
        return;
    }
    const filtered = AllProducts.filter((product) => product.Type === filterName);
    setProducts(filtered);
  }





  useEffect(() => {
    const getProducts = async () => {
      const Products = await fetchProducts();
      const Keys = Object.keys(Products);
      const Values = Keys.map((key) => Products[key]).flat();
      setAllProducts(Values);
      setProducts(Values);

    };
    getProducts();
    
  },[]);

  

  
  
  return (
    <div className='container mx-auto mt-10 '>
      <Filter filterProducts={filterProducts}/>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 '>
        {
          products.map((item) =>(
            <div key={item.id} className="flex flex-col border p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
              <Image
                src={item.Image}
                alt={item.Name}
                width="60%"
                height="100px"
                className="object-contain mb-4 flex justify-center "
              />
              <h1 className='text-lg font-semibold'>
                {item.Name}
              </h1>
              <p className="text-sm mt-2">
                {item.Description}
              </p>
              <div className='mt-auto py-2 flex flex-row justify-between items-center'>
                <span className="text-xl font-bold text-blue-600">
                  {item.Price} ৳
                </span>
                {
                  user?.cart && user.cart.some( cartItem => cartItem.id === item.id) ? (
                    <Button
                    label="In Cart"
                    className="ml-4 bg-gray-400 text-white p-button-sm cursor-not-allowed"
                    disabled = {true}
                  />
                  ) : (  
                    <Button
                      label="Add to Cart"
                      className="ml-4 bg-green-600 text-white p-button-sm hover:bg-green-700"
                      onClick={() => handleAddToCart(item.id)}
                    />
                  )
                }


              </div>
              
            </div>
          ))
        }
      </div>  
    </div>
  )
}

export default ProductCard;
