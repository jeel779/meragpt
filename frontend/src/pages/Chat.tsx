import { useEffect, useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/chatStore";
import ChatItem from "../components/chat/Chatitem";
import toast from "react-hot-toast";

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  
  const { authUser } = useAuthStore();
  const { AllChats, newChat, allChatHistory, deleteAllChats, isLoading } = useChatStore();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current?.value && inputRef.current.value.trim() !== "") {
      const msg = inputRef.current.value;
      inputRef.current.value = "";
      try {
        await newChat(msg);
      } catch (error) {
        console.error(error);
        toast.error("Failed to send message");
      }
    }
  };

  const handleDeleteChats = () => {
    if (window.confirm("Are you sure you want to clear your conversation history?")) {
      deleteAllChats();
      toast.success("Chats cleared");
    }
  };

  useLayoutEffect(() => {
    if (authUser) {
      allChatHistory();
    }
  }, [authUser]);

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, []);

  // Smooth scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [AllChats, isLoading]);

  // Extract initials for the avatar badge
  const getInitials = (name?: string) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col md:flex-row relative overflow-hidden bg-background">
      {/* Background blobs */}
      <div className="absolute top-10 left-10 w-[200px] h-[200px] bg-brand-primary/5 blur-[80px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[200px] h-[200px] bg-brand-secondary/5 blur-[80px] pointer-events-none rounded-full" />

      {/* Sidebar Panel */}
      <aside className="w-full md:w-80 glass-panel border-r border-white/5 p-6 flex flex-col justify-between shrink-0 z-10">
        <div className="flex flex-col gap-6">
          {/* User profile details */}
          <div className="flex items-center gap-3.5 pb-5 border-b border-white/5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-tertiary flex items-center justify-center font-bold text-white shadow-md shadow-brand-primary/20">
              {getInitials(authUser?.username)}
            </div>
            <div className="flex flex-col truncate">
              <span className="font-semibold text-white text-sm">{authUser?.username}</span>
              <span className="text-xs text-text-dim/60 truncate">{authUser?.email}</span>
            </div>
          </div>

          {/* Model info chip */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-text-dim/55 uppercase font-mono tracking-wider">
              Active Engine
            </span>
            <div className="flex items-center gap-2.5 px-4.5 py-3 bg-white/5 border border-white/10 rounded-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
              <span className="text-sm font-semibold text-white">Gemini 2.5 Flash</span>
            </div>
          </div>

          {/* Chat Metadata info */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-text-dim/55 uppercase font-mono tracking-wider">
              Workspace Info
            </span>
            <div className="px-4.5 py-3 bg-white/5 border border-white/10 rounded-xl text-sm flex justify-between items-center text-text-dim/80">
              <span>Messages</span>
              <span className="px-2 py-0.5 bg-white/10 rounded-md font-mono text-xs text-white">
                {AllChats.length}
              </span>
            </div>
          </div>
        </div>

        {/* Clear History Button */}
        <div className="pt-6 border-t border-white/5">
          <button 
            onClick={handleDeleteChats}
            className="w-full py-3.5 px-4 font-semibold text-sm text-red-400 border border-red-500/20 hover:border-red-500/40 bg-red-500/5 hover:bg-red-500/10 rounded-xl transition-all duration-300 cursor-pointer text-center"
          >
            Clear Conversation
          </button>
        </div>
      </aside>

      {/* Main Chat Workspace */}
      <main className="flex-1 flex flex-col justify-between relative h-[calc(100vh-4rem)] z-10">
        {/* Messages List Area */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 flex flex-col">
          {AllChats.length === 0 && isLoading ? (
            <div className="h-full flex-1 flex flex-col justify-center items-center text-center max-w-lg mx-auto gap-4">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-white/5" />
                <div className="absolute inset-0 rounded-full border-t-2 border-brand-primary animate-spin" />
              </div>
              <p className="text-xs text-text-dim/60 font-mono tracking-widest uppercase animate-pulse">
                Restoring session logs...
              </p>
            </div>
          ) : AllChats.length === 0 ? (
            <div className="h-full flex flex-col justify-center items-center text-center max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <img src="openai.png" className="w-8 h-8 invert opacity-70 animate-pulse" alt="Logo" />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white mb-2">
                What can I build with you?
              </h2>
              <p className="text-sm text-text-dim/60 leading-relaxed font-sans font-light">
                Ask me any coding, writing, or analysis questions. I am running live on Gemini to assist you.
              </p>
            </div>
          ) : (
            <>
              {AllChats.map((chat, index) => (
                <ChatItem
                  key={index}
                  content={chat.content}
                  role={chat.role}
                />
              ))}

              {/* Bouncing Dots AI typing indicator */}
              {isLoading && AllChats.length > 0 && AllChats[AllChats.length - 1].role === "user" && (
                <div className="flex gap-4 items-start w-full max-w-4xl self-start font-sans">
                  <div className="w-8 h-8 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center shrink-0 shadow-sm shadow-brand-primary/10">
                    <img src="openai.png" alt="AI" className="w-5 h-5 invert opacity-85 animate-pulse" />
                  </div>
                  <div className="flex flex-col gap-2 max-w-[85%] bg-white/[0.02] border border-white/5 px-5 py-3.5 rounded-2xl rounded-tl-none shadow-sm shadow-black/10">
                    <span className="text-xs font-semibold text-brand-secondary font-mono tracking-wider">MeraGPT is thinking</span>
                    <div className="flex gap-1.5 items-center py-2 px-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-tertiary animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-bounce" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </>
          )}
        </div>

        {/* Floating Chat input box */}
        <div className="p-4 border-t border-white/5 bg-[#0a0a0c]/40 backdrop-blur-md sticky bottom-0">
          <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto flex gap-3 bg-white/5 border border-white/10 rounded-2xl p-2 focus-within:border-brand-primary/50 focus-within:ring-2 focus-within:ring-brand-primary/20 transition-all duration-300 items-center">
            <input 
              ref={inputRef} 
              type="text" 
              placeholder="Message MeraGPT..." 
              className="flex-1 bg-transparent px-4 py-2 text-sm text-white focus:outline-none focus:ring-0 placeholder-white/30"
            />
            <button 
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-brand-primary to-brand-tertiary hover:brightness-115 rounded-xl transition-all duration-200 shadow-md shadow-brand-primary/10 cursor-pointer uppercase tracking-wider"
            >
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Chat;