import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { Toast } from "primereact/toast";
import { Message } from "primereact/message";

import Layout from "../../components/Layout";


import {AuthContext} from "../../context/AuthContext";

// import { baseUrl } from "../../Helper/baseUrlHelper";
const baseUrl = "http://localhost:3000";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const Login = () => {

  const navigate = useNavigate();

  const toast = useRef(null);

  const { login } = useContext(AuthContext);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }


 const handleSubmit = async(e) =>{
    e.preventDefault();

    try{
      const res = await fetch(`${baseUrl}/users?email=${formData.email}&password=${formData.password}`);
      const data = await res.json();

      if(data.length > 0){

        login(data[0]);

         toast.current.show({ 
          severity: 'success', 
          summary: 'Success', 
          detail: 'Congratulations, Login successful!', 
          life: 3000  
        });
        setTimeout(() => {
          navigate("/user/home");
        }, 3000);
      }
      else{
        toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid email or password',
        life: 3000,
      });
      }

    }catch(err){
      console.log(err);
    }
 }

  return (
    <Layout>

    
    <div className="flex items-center justify-center min-h-screen bg-gray-50">

      <Toast ref={toast} position="top-center" />
      
      <Card className="w-full max-w-md p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <FloatLabel>
            <InputText
             id="email"
             name="email" 
             className="w-full" 
             placeholder="exam@gamil.com"
             value = {formData.email}
             onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
             
          </FloatLabel>

          <FloatLabel>
            <Password
              id="password"
              name="password"
              toggleMask
              feedback={false}
              className="w-full"
              placeholder="********"
              value = {formData.password}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
          </FloatLabel>

          <Button
            label="Login"
            className="w-full mt-2 bg-blue-500 border-none hover:bg-blue-600"
          />

          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link
              to="/reg"
              className="text-blue-500 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </form>
      </Card>
    </div>
    </Layout>
    
  );
};

export default Login;
