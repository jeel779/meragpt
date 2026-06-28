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
    <>
      <Link to="/">
        <img
          className="image-inverted rotate"
          src="openai.png"
          alt="openai"  
          style={{ width: "200px", margin: "auto" }} />
      </Link>
      {isLoggedIn ? (
        <>
          <button onClick={() => navigate('/chat')}>Go To Chat</button>
          <button onClick={handleLogout}>logout</button>
        </>
      ) : (
        <>
          <button onClick={() => navigate('/login')}>login</button>
          <button onClick={() => navigate('/signup')}>signup</button>
        </>
      )}
    </>
  )
}

export default Header