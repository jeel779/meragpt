import { useEffect, useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/chatStore";
import ChatItem from "../components/chat/Chatitem";
const Chat = () => {
  const navigate = useNavigate();
  const inputRef=useRef<HTMLInputElement | null>(null)
  const { authUser }=useAuthStore()
  const { AllChats,newChat,allChatHistory,deleteAllChats}=useChatStore()
  const handleSubmit=(e:React.FormEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    if(inputRef.current?.value){
      newChat(inputRef.current.value)
      inputRef.current.value=""
    }
  }
  const handleDeleteChats=()=>{
    deleteAllChats()
  }
  useLayoutEffect(()=>{
    if(authUser){
      allChatHistory()
    }
  },[authUser])
  useEffect(()=>{
    if(!authUser){
      navigate("/login")
    }
  },[])
  return (
    <>
      <div>
        <button onClick={handleDeleteChats}>delete All chats</button>
      </div>
      <div>
        {AllChats.map((chat,index)=>(
          <ChatItem
          key={index}
          content={chat.content}
          role={chat.role}
          />
        ))}
      </div>
      <div className="flex-1">
        <input ref={inputRef} type="text" />
        <button className="m-1" onClick={handleSubmit}>submit</button>
      </div>
    </>
  )
}

export default Chat