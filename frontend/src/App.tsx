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
      <div className="flex flex-col justify-center items-center h-screen bg-background text-white font-sans gap-5 relative overflow-hidden">
        {/* Background glow blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-brand-primary/10 blur-[80px] pointer-events-none" />
        
        {/* Glowing loader spinner */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-white/5" />
          <div className="absolute inset-0 rounded-full border-t-4 border-brand-primary animate-spin" />
          <img src="openai.png" className="w-6 h-6 invert opacity-85 animate-pulse" alt="Logo" />
        </div>

        <div className="flex flex-col items-center gap-1.5 z-10">
          <h3 className="font-extrabold tracking-wider text-sm text-glow-primary uppercase font-mono">
            MeraGPT
          </h3>
          <p className="text-xs text-text-dim/60 font-mono tracking-widest uppercase animate-pulse">
            Establishing secure connection...
          </p>
        </div>
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
