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
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 overflow-hidden">
      {/* Background blobs for depth */}
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-brand-primary/10 blur-[90px] animate-blob pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-1/3 translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] rounded-full bg-brand-secondary/10 blur-[90px] animate-blob-reverse pointer-events-none z-0" />

      {/* Login Card */}
      <div className="glass-panel max-w-md w-full p-8 rounded-2xl shadow-2xl shadow-violet-950/20 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-text-dim bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-sm text-text-dim/60 mt-2">
            Enter your credentials to access your chats
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-text-dim/80 tracking-wider uppercase font-mono">
              Email Address
            </label>
            <CustomizedInput type="email" name="email" placeholder="you@example.com" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-text-dim/80 tracking-wider uppercase font-mono">
              Password
            </label>
            <CustomizedInput type="password" name="password" placeholder="••••••••" />
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 mt-2 font-bold text-white bg-gradient-to-r from-brand-primary to-brand-tertiary hover:from-brand-tertiary hover:to-brand-primary rounded-xl shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
          >
            Login
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-text-dim/60">
          New to MeraGPT? 
          <button 
            onClick={() => navigate('/signup')} 
            className="text-brand-secondary hover:text-brand-secondary/80 font-semibold ml-1 cursor-pointer transition-colors"
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login

