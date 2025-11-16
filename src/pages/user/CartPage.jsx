import React from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

import Layout from '../../components/Layout';
import fetchProducts from '../../components/HomeComponents/ProductList/AllProducts';
import axios from 'axios'

const CartPage = () => {
  const  {user , login} = useContext(AuthContext);
  const [cartItems, setCartItems] = React.useState([]);
//   const navigate = useNavigate();

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
        itemQuantity : item.itemQuantity || 1
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
      const updatedUser = {...user, cart : updatedCart};
      login(updatedUser);
      setCartItems(updatedCart);

    }catch(err){
      console.log('Failed to Update Cart ',err);
      alert("Failed to update cart. Try again");
    }
  }

    const updateQuantity = (id, value) => {
      const updatedCart = cartItems.map((item) =>{
        if(item.id === id) {
          return {
            ...item,
            itemQuantity : value || 1
          }
        }
        return item;
      });
      setCartItems(updatedCart);
      updateCartOnServer(updatedCart);

    }

   const imageBodyTemplate = (rowData) => {
    return (
      <img 
        src={rowData.Image} 
        alt={rowData.Name}
        className="w-20 h-20 object-cover rounded-lg shadow-sm"
      />
    );
  };
  


  const quantityBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-4">
        <Button 
          icon="pi pi-minus" 
          rounded
          outlined
          severity="secondary"
          onClick={() => updateQuantity(rowData.id, rowData.itemQuantity - 1)}
          disabled={rowData.itemQuantity === 1}
          
        />
        <InputNumber 
          value={rowData.itemQuantity}
          onValueChange={(e) => updateQuantity(rowData.id, e.value)}
          min={1}
          showButtons={false}
          inputClassName="w-20 text-center font-semibold"
        />
        <Button 
          icon="pi pi-plus" 
          rounded
          outlined
          severity="secondary"
          onClick={() => updateQuantity(rowData.id, rowData.itemQuantity + 1)}
          
        />
      </div>
    );
  };

  const nameBodyTemplate = (rowData) => {
    return (
      <div>
        <div className="font-semibold text-lg text-gray-800">{rowData.Name}</div>
        <div className="text-blue-600 font-bold text-xl mt-1">{rowData.Price.toLocaleString()}  ৳</div>
      </div>
    );
  };

  const calculatePriceTemplate = (rowData) =>{
      return(
        <div className="font-bold text-lg text-gray-800">
          Tk{(rowData.Price*rowData.itemQuantity).toLocaleString()}
        </div>
      )
  }

  const handleRemove = (rowData) =>{
    const updatedCart = cartItems.filter(item => rowData.id !== item.id);
    setCartItems(updatedCart);
    updateCartOnServer(updatedCart);
    
  }

  const removeItemTemplate = (rowData) => {

       return (
        <Button 
          icon="pi pi-trash"
          className="p-button-danger p-button-sm"
          onClick={() => handleRemove(rowData)}
        />
      );
  }

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
                <DataTable 
                  value={cartItems}
                  size="small"
                  stripedRows
                  className="shadow-sm"
                >
                   <Column 
                      header="Product" 
                      body={imageBodyTemplate}
                      style={{ width: '120px' }}
                    />

                    <Column 
                      header="Details" 
                      body={nameBodyTemplate}
                      style={{width: '20rem'}}
                    />

                     <Column 
                      header="Quantity" 
                      body={quantityBodyTemplate}
                      style={{ width: '250px' }}
                    />
                    {/* <Column 
                      header="Price"
                      body={calculatePriceTemplate}
                    /> */}

                     <Column 
                      header="Total" 
                      body={calculatePriceTemplate}
                      style={{ width: '150px' }}
                    />
                    <Column
                      header="Remove"
                      body={removeItemTemplate}
                      style={{ width: '120px', textAlign: 'center' }}
                    />

                    {/* <Column 
                      header="Action" 
                      body={actionBodyTemplate}
                      style={{ width: '100px' }}
                    /> */}
                  
                </DataTable>
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
                  icon="pi pi-credit-card"
                  size="large"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700  cursor-pointe transition"
                 onClick={checkout}
                 >
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </Card>



        </div>
      </div>
    </Layout>
  )
}

export default CartPage
