import React from 'react'
import CustomizedInput from '../components/shared/CustomizedInput'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { useAuthStore } from '../store/useAuthStore'
import { useEffect } from 'react'
const Login = () => {
  const navigate = useNavigate()
  const { isLoggedIn , login }=useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/chat')
    }
  }, [isLoggedIn])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    
    if (!email || !password) {
      toast.error("Please fill in all fields")
      return
    }

    const toastId = toast.loading("Signing In")
    try {
      await login(email, password)
      toast.success("Signed In Successfully", { id: toastId })
      navigate('/chat')
    } catch (error: any) {
      console.error(error)
      toast.error(error?.response?.data?.message || "Signing In Failed", { id: toastId })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CustomizedInput type="text" name="email" placeholder="email" />
        <CustomizedInput type="password" name="password" placeholder="password" />
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default Login

