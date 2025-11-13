import React, { useEffect } from 'react'
import fetchProducts from './AllProducts'
import Filter from './filter';
import {Button} from 'primereact/button';

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
                <Button label="Add to Cart" className="ml-4 bg-green-600 text-white p-button-sm hover:bg-green-700"/>
              </div>
              
            </div>
          ))
        }
      </div>  
    </div>
  )
}

export default ProductCard;
