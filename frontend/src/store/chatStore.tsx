import { create } from "zustand";
import { deleteUserChats, getUserChats, sendChatRequest } from "../helpers/api-communicator";

export interface Chat {
  id?: number;
  role: "user" | "assistant";
  content: string;
  userId?: number;
  createdAt?: string;
}

interface ChatStore {
  chatData: Chat | null;
  AllChats: Chat[];
  isLoading: boolean;
  newChat: (message: string) => Promise<void>;
  allChatHistory: () => Promise<void>;
  deleteAllChats: () => Promise<void>;
}

export const useChatStore = create<ChatStore>((set) => ({
  chatData: null,
  AllChats: [],
  isLoading: false,

  newChat: async (message: string) => {
    // 1. Optimistically append the user's message to the state
    const userMsg: Chat = { role: "user", content: message };
    set((state) => ({
      AllChats: [...state.AllChats, userMsg],
      isLoading: true,
    }));

    try {
      const resData = await sendChatRequest(message);
      // resData.data is the assistant's Chat response object from backend
      if (resData && resData.data) {
        const assistantMsg: Chat = {
          role: resData.data.role,
          content: resData.data.content,
        };
        set((state) => ({
          AllChats: [...state.AllChats, assistantMsg],
          chatData: assistantMsg,
        }));
      }
    } catch (error) {
      console.error("newChat failed:", error);
      set({ chatData: null });
    } finally {
      set({ isLoading: false });
    }
  },

  allChatHistory: async () => {
    set({ isLoading: true });
    try {
      const resData = await getUserChats();
      // resData.data is the array of chats from backend
      if (resData && resData.data) {
        set({ AllChats: resData.data });
      }
    } catch (error) {
      console.error("allChatHistory failed:", error);
      set({ AllChats: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteAllChats: async () => {
    set({ isLoading: true });
    try {
      await deleteUserChats();
      set({ AllChats: [], chatData: null });
    } catch (error) {
      console.error("deleteAllChats failed:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));