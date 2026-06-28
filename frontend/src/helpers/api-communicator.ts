import { axiosInstance } from "../lib/axios";
export const loginUser=async(email:string,password:string)=>{
    const res=await axiosInstance.post("/user/login",{email,password});
    if(res.status!=200){
        throw new Error("Failed to login");
    } 
    return res.data;
}
export const signupUser = async (
  username: string,
  email: string,
  password: string
) => {
  const res = await axiosInstance.post("/user/signup", { username, email, password });
  if (res.status !== 200) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axiosInstance.get("/user/check-auth");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};
export const logoutUser = async () => {
  const res = await axiosInstance.post("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to logout");
  }
  const data = await res.data;
  return data;
};
export const sendChatRequest = async (message: string) => {
  const res = await axiosInstance.post("/chat/new", { message });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  console.log(data)
  return data;
};

export const getUserChats = async () => {
  const res = await axiosInstance.get("/chat");
  if (res.status !== 200) {
    throw new Error("Unable to fetch chats");
  }
  const data = await res.data;
  return data;
};

export const deleteUserChats = async () => {
  const res = await axiosInstance.delete("/chat/delete");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;

  return data;
};