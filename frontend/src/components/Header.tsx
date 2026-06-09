import React from 'react'
import { useNavigate,Link} from "react-router";
const Header = () => {
  const navigate=useNavigate()
  return (
    <>
      //logo and name
      // if logout so login and signup button
      // if login so go to chat and logout button
      <Link to="/">
        <img
            className="image-inverted rotate"
            src="openai.png"
            alt="openai"  
            style={{ width: "200px", margin: "auto" } }/>
     </Link>
     <button onClick={()=> navigate('/login')}>login</button>
     <button onClick={()=> navigate('/signup')}>signup</button>
    </>
  )
}

export default Header