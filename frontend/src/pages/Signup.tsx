import React from 'react'
import CustomizedInput from '../components/shared/CustomizedInput'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { useAuthStore } from '../store/useAuthStore'
import { useEffect } from 'react'
const Signup = () => {
  const navigate = useNavigate()
  const { isLoggedIn , signup }=useAuthStore();
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/chat')
    }
  }, [isLoggedIn])
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!username || !email || !password) {
      toast.error("Please fill in all fields")
      return
    }

    const toastId = toast.loading("Signing Up");
    try {
      await signup(username, email, password);
      toast.success("Signed Up Successfully", { id: toastId });
      navigate('/chat')
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Signing Up Failed", { id: toastId });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CustomizedInput type="text" name="name" placeholder="Name" />
        <CustomizedInput type="email" name="email" placeholder="Email" />
        <CustomizedInput type="password" name="password" placeholder="Password" />
        <button type="submit">signup</button>
      </form>
    </>
  )
}

export default Signup