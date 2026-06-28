import { useNavigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import Footer from '../components/footer/Footer';

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden">
      {/* Background Animated Blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-brand-primary/15 blur-[100px] animate-blob pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full bg-brand-secondary/15 blur-[120px] animate-blob-reverse pointer-events-none z-0" />

      {/* Hero Section */}
      <main className="flex-1 max-w-4xl mx-auto px-6 flex flex-col justify-center items-center text-center relative z-10 py-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-brand-secondary mb-6 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse" />
          Powered by Gemini 3.1 lite
        </div>

        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-white via-text-main to-white/40 bg-clip-text text-transparent leading-tight md:leading-none select-none">
          The Intelligent Workspace <br />
          For Ethereal Conversations.
        </h1>

        <p className="max-w-xl text-base md:text-lg text-text-dim/80 mb-10 leading-relaxed font-sans font-light">
          Experience limitless computing power wrapped in a hyper-focused glassmorphic interface. Authenticate securely, organize session history, and collaborate with AI.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          {isLoggedIn ? (
            <button
              onClick={() => navigate("/chat")}
              className="w-full sm:w-auto px-8 py-4 font-bold text-white bg-gradient-to-r from-brand-primary via-brand-tertiary to-brand-secondary hover:brightness-110 rounded-xl transition-all duration-300 shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/35 hover:-translate-y-0.5 cursor-pointer"
            >
              Start Chatting
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/signup")}
                className="w-full sm:w-auto px-8 py-4 font-bold text-white bg-gradient-to-r from-brand-primary to-brand-tertiary hover:brightness-110 rounded-xl transition-all duration-300 shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/35 hover:-translate-y-0.5 cursor-pointer"
              >
                Get Started for Free
              </button>
              <button
                onClick={() => navigate("/login")}
                className="w-full sm:w-auto px-8 py-4 font-bold text-text-main hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 cursor-pointer"
              >
                Log In
              </button>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home