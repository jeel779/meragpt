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
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 overflow-hidden">
      {/* Background blobs for depth */}
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-brand-primary/10 blur-[90px] animate-blob pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-1/3 translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] rounded-full bg-brand-secondary/10 blur-[90px] animate-blob-reverse pointer-events-none z-0" />

      {/* Signup Card */}
      <div className="glass-panel max-w-md w-full p-8 rounded-2xl shadow-2xl shadow-violet-950/20 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-text-dim bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-sm text-text-dim/60 mt-2">
            Get started with MeraGPT in seconds
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-text-dim/80 tracking-wider uppercase font-mono">
              Username
            </label>
            <CustomizedInput type="text" name="name" placeholder="John Doe" />
          </div>

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
            Create Account
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-text-dim/60">
          Already have an account? 
          <button 
            onClick={() => navigate('/login')} 
            className="text-brand-secondary hover:text-brand-secondary/80 font-semibold ml-1 cursor-pointer transition-colors"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  )
}

export default Signup