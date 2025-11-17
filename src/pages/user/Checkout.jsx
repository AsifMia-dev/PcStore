import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import axios from 'axios';

export default function CheckoutComponent() {
  const  {user , login} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    return newErrors;
  };

  const orderUpdateOnServer = async () => {
     const order = {
      userId : user.id,
      info : {...formData},
      date: new Date().toISOString(),
      status: "Pending",
     }
     console.log(order);
     try{
       await axios.post(`http://localhost:3000/order`,{
         ...order
       })
     }catch(err){
      console.log("Order Error Ocurred ",err);
     }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      orderUpdateOnServer();
      console.log('Form submitted:', formData);
    } else {
      setErrors(newErrors);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', phone: '', location: '' });
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <div className="text-center">
            <i className="pi pi-check-circle text-green-500 text-6xl mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 mb-4">Thank you for your purchase.</p>
            <div className="bg-gray-50 p-4 rounded-lg text-left mb-4">
              <p className="mb-2"><strong>Name:</strong> {formData.name}</p>
              <p className="mb-2"><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Location:</strong> {formData.location}</p>
            </div>
            <Button label="Place Another Order" icon="pi pi-shopping-cart" onClick={handleReset} />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card title="Checkout" className="w-full max-w-md shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <InputText
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={errors.name ? 'p-invalid w-full' : 'w-full'}
            />
            {errors.name && <small className="text-red-500">{errors.name}</small>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="font-semibold text-gray-700">
              Phone <span className="text-red-500">*</span>
            </label>
            <InputText
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className={errors.phone ? 'p-invalid w-full' : 'w-full'}
            />
            {errors.phone && <small className="text-red-500">{errors.phone}</small>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="location" className="font-semibold text-gray-700">
              Location <span className="text-red-500">*</span>
            </label>
            <InputText
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter your location"
              className={errors.location ? 'p-invalid w-full' : 'w-full'}
            />
            {errors.location && <small className="text-red-500">{errors.location}</small>}
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              type="submit" 
              label="Complete Order" 
              icon="pi pi-check" 
              className="flex-1"
            />
            <Button 
              type="button" 
              label="Clear" 
              icon="pi pi-times" 
              onClick={handleReset}
              severity="secondary"
              outlined
            />
          </div>
        </form>
      </Card>
    </div>
  );
}