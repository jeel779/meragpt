import React from 'react'
import { useState } from 'react'
const Signup = () => {
  const [formData,setFormData]=useState()
  const submitForm=()=>{
    
  }
  return (
    <>
    <form onSubmit={submitForm}>
      <input type="text" name='name' placeholder='Name' />
      <input type="email" name='email' placeholder='Email' />
      <input type="password" name='password'  placeholder='Password' />
      <button type='submit'>signup</button>
    </form>
    </>
  )
}

export default Signup