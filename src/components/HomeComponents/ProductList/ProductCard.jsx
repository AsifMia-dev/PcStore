import React, { useEffect } from 'react'
import fetchProducts from './AllProducts'
import Filter from './filter';

import {Image} from 'primereact/image';






const ProductCard = () => {
  const [AllProducts , setAllProducts] = React.useState([]);
  const [products , setProducts] = React.useState([]);
  
  function filterProducts(filterName){
    if(filterName === "All"){
        setProducts(AllProducts);
        return;
    }
    const filtered = AllProducts.filter((product) => product.Type === filterName);
    setProducts(filtered);
    console.log(filtered);
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
            <div key={item.id} className="border p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
              <h1>
                {item.Name}
              </h1>
              <Image
                src={item.Image}
                alt={item.Name}
                width="100%"
                height="200px"
                className="object-contain mb-4"
              />
              
            </div>
          ))
        }
      </div>  
    </div>
  )
}

export default ProductCard
