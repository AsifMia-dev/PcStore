import React, { useEffect } from 'react'
import fetchProducts from './AllProducts'





const ProductCard = () => {
  const [products , setProducts] = React.useState([])


  useEffect(() => {
    const getProducts = async () => {
      const Products = await fetchProducts();
      const Keys = Object.keys(Products);
      const Values = Keys.map((key) => Products[key]).flat();
      setProducts(Values);
      console.log(products)

    };
    getProducts();
    
  },[]);

  
  
  return (
    <div className='w-full h-40 mt-10 bg-green-500'>
      
    </div>
  )
}

export default ProductCard
