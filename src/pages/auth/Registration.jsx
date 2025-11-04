import React, {useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { FloatLabel } from "primereact/floatlabel";
import { Toast } from "primereact/toast";
import { useRef } from "react";
// import { baseUrl } from "../../Helper/baseUrlHelper";

import Layout from "../../components/Layout";


import { useNavigate } from "react-router-dom";


import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const baseUrl = "http://localhost:3000";

function generateId() {
  return Date.now().toString();
}

const Registration = () => {

  const navigate = useNavigate();
  const toast = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState({});
  // const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
      setError({});
    };
   
    const handleSubmit = async (e) => {
      e.preventDefault();

      // Check if usernmame already exists
      const checkUserRespones = await fetch(`${baseUrl}/users?username=${formData.name}`);
      const userData = await checkUserRespones.json();
      console.log(checkUserRespones);
      console.log(userData);
      if (userData.length > 0) {
        setError({ nameExist: "Username already exists" });
        return;
      }
      // Register new user with 
      const res = await fetch(`${baseUrl}/users`,{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            id: generateId(),
            username: formData.name,
            email: formData.email,
            password: formData.password,
            role: "user"
          })

      });

      if (res.ok){
       toast.current.show({ 
          severity: 'success', 
          summary: 'Success', 
          detail: 'Registration successful! Please login.', 
          life: 3000  // 3 seconds
        });
        setTimeout(() => navigate("/"),3000);
      }else{
        setError({ submitError: "Registration failed. Please try again." });
      }
      
    }



  return (
    <Layout>

    
    <div  className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toast ref={toast} position="top-center" />
      {error.submitError && (
        <Message
          severity="error"
          text={error.submitError}
          className="w-full max-w-md text-center shadow-md"
        />
      )}
      <Card
        title="Create Account"
        className="w-full max-w-md p-6 shadow-lg border border-gray-200"
      >
        <form onSubmit={handleSubmit}  className="space-y-6">
          {/* Name */}
          <div>
            <FloatLabel>
              <InputText
                id="name"
                name="name"
                value={formData.name}
                className="w-full"
                placeholder="e.g. John Doe"
                required
                onChange={handleChange}
              />
              <label htmlFor="name">Name</label>
            </FloatLabel>
            {error.nameExist && (
              <Message severity="error" text={error.nameExist} className="mt-2" />
            )}
          </div>

          {/* Email */}
          <div>
            <FloatLabel>
              <InputText
                id="email"
                name="email"
                value={formData.email}
                className="w-full"
                placeholder="exam@gmail.com"
                required
                onChange={handleChange}
              />
              <label htmlFor="email">Email</label>
            </FloatLabel>
          </div>

          {/* Password */}
         <FloatLabel className="w-full"> 
              <Password
                id="password"
                name="password"
                value={formData.password}
                toggleMask
                // Added pr-10 for icon clearance
                inputClassName="w-full pr-10" 
                className="w-full" 
                placeholder="********"
                required
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
            </FloatLabel>

          
          <Button
            label="Register"
            type="submit"
            className="w-full mt-4"
          />
        </form>
      </Card>
    </div>
    </Layout>
  );
};

export default Registration;
