import { useNavigate, Link } from "react-router";
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

const Header = () => {
  const navigate = useNavigate()
  const {isLoggedIn,logout}=useAuthStore()

  const handleLogout = async () => {
    try {
      await logout()
      toast.success("Logged out successfully")
      navigate("/")
    } catch (error) {
      console.error(error)
      toast.error("Failed to log out")
    }
  }

  return (
    <nav className="glass-panel w-full px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-md">
      {/* Brand logo container */}
      <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
        <img
          className="h-8 w-auto invert animate-pulse"
          src="openai.png"
          alt="MeraGPT Logo"  
        />
        <span className="font-sans font-extrabold text-xl tracking-wider bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent text-glow-primary">
          MeraGPT
        </span>
      </Link>

      {/* Action buttons */}
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <button 
              onClick={() => navigate('/chat')}
              className="px-4 py-2 text-sm font-semibold text-brand-primary border border-brand-primary/20 hover:border-brand-primary/50 bg-brand-primary/5 hover:bg-brand-primary/10 rounded-xl transition-all duration-300 shadow-sm cursor-pointer"
            >
              Go To Chat
            </button>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-semibold text-red-400 border border-red-500/20 hover:border-red-500/40 bg-red-500/5 hover:bg-red-500/10 rounded-xl transition-all duration-300 cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-sm font-semibold text-text-dim hover:text-white transition-all duration-300 cursor-pointer"
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-primary to-brand-tertiary hover:from-brand-tertiary hover:to-brand-primary rounded-xl transition-all duration-300 shadow-md shadow-brand-primary/20 hover:shadow-brand-primary/35 hover:-translate-y-0.5 cursor-pointer"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Header