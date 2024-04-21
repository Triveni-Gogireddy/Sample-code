import React, { useState } from 'react';
import './index.css';
import { useNavigate } from "react-router-dom";
import Toast from '../Utils/Toast';


const baseUrl = process.env.REACT_APP_BASE_URL

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate =useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Invalid email address';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      try {
        const response = await fetch(`${baseUrl}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          const data = await response.json();
          Toast.fire({
            icon: "success",
            title: data.message,
          });
          navigate("/home")
          console.log('Form submitted successfully');
        } else {
          const errorData = await response.json();
          Toast.fire({
            icon: "error",
            title: errorData.message,
          });
          console.error('Error submitting form:', errorData.message);
        }
       
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "There was a problem with the login operation",
        });
        console.error('There was a problem with the fetch operation:', error);
       
      }
    } 
  };
  

  return (
    <div className='signin-form-main-container'>
       
        <form className='signin-form-container' onSubmit={handleSubmit}>
          <div className='signin-form-filed-container'>
            <label className='signin-form-lable'>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className='signin-form-input'
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className='signin-form-filed-container'>
            <label className='signin-form-lable'>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className='signin-form-input'
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className='signin-form-button-container'>
            <button className='signin-form-button' type="submit">Sign In</button>
          </div>
        </form>
      
    </div>
  );
}

export default SignIn;
