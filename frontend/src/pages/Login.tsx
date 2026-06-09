import React from 'react'
import { useState } from 'react'

const Login = () => {
  //  const navigate=useNavigate()
  // //const auth=useAuth();
  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
  //   e.preventDefault()
  //   const formData=new FormData(e.currentTarget);
  //   const email=formData.get("email") as string
  //   const password=formData.get("password") as string
  //   try{
      
  //   }
  }
  return (
    <>
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder='email' />
      <input type="password" placeholder='password'/>
      <button type='submit'>Login</button>
    </form>
    </>
  )
}

export default Login

