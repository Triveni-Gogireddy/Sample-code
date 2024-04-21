import React, { useState } from 'react';
import './index.css';
import Toast from '../Utils/Toast';

const baseUrl = process.env.REACT_APP_BASE_URL
function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    mobileNumber: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!validateEmail(formData.email)) {
      errors.email = 'Invalid email address';
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch(`${baseUrl}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          const data = await response.json();
          Toast.fire({
            icon: "success",
            title: data.message,
          });
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
          title: 'An error occurred while submitting the form',
        });
        console.error('Error submitting form:', error.message);
      }
    } 
  };

  return (
    <div className='signup-form-whole-container'>
    <div className='signup-form-main-container'> 
        <form className='signup-form-container' onSubmit={handleSubmit}>
         <div className='signup-form-filed-container'>
            <label className='signup-form-lable'>
              First Name:
              </label>
              <input
                type="text"
                placeholder="FirstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className='signup-form-input'
              />
          </div>
          <div className='signup-form-filed-container'>
            <label className='signup-form-lable'>
              Last Name:
              </label>
              <input
                type="text"
                name="lastName"
                placeholder='LastName'
                value={formData.lastName}
                onChange={handleChange}
                required
                className='signup-form-input'
              />
          </div>
          <div className='signup-form-filed-container'>
            <label className='signup-form-lable'>
              Address:
              </label>
              <input
                type="text"
                name="address"
                placeholder='Address'
                value={formData.address}
                onChange={handleChange}
                required
                className='signup-form-input'
              />
          </div>
          <div className='signup-form-filed-container'>
            <label className='signup-form-lable'>
              Mobile Number:
              </label>
              <input
                type="text"
                name="mobileNumber"
                placeholder='Mobilenumber'
                value={formData.mobileNumber}
                onChange={handleChange}
                required
                className='signup-form-input'
              />
          </div>
          <div className='signup-form-filed-container'>
            <label className='signup-form-lable'>
              Email:
              </label>
              <input
                type="email"
                name="email"
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
                required
                className='signup-form-input'
              />
              {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className='signup-form-filed-container'>
            <label className='signup-form-lable'>
              Password:
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className='signup-form-input'
              />
          </div>
          <div className='signup-form-button-container'>
          <button className='signup-form-button' type="submit">Sign Up</button>
          </div>

          <p className='signup-form-para'>If you already have an account <a href="/signin">click here</a> </p>
          </form>
    </div>
    </div>
  );
}

export default SignUp;
