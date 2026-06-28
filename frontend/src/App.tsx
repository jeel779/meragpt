import { useEffect } from 'react'
import { Route, Routes } from "react-router";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const {checkAuth,isLoading}=useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
        <h3>Loading...</h3>
      </div>
    )
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App;
