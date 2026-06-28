import { create } from "zustand";
import { checkAuthStatus, signupUser, loginUser, logoutUser } from "../helpers/api-communicator";

export interface User {
  id: number;
  email: string;
  username: string;
}

interface AuthStore {
  authUser: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isLoggedIn: false,
  isLoading: false,

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const resData = await checkAuthStatus();
      if (resData && resData.data && resData.data.user) {
        set({ authUser: resData.data.user, isLoggedIn: true });
      } else {
        set({ authUser: null, isLoggedIn: false });
      }
    } catch (error) {
      console.error("checkAuth failed:", error);
      set({ authUser: null, isLoggedIn: false });
    } finally {
      set({ isLoading: false });
    }
  },

  signup: async (username: string, email: string, password: string) => {
    set({ isLoading: true });
    try {
      const resData = await signupUser(username, email, password);
      if (resData && resData.data && resData.data.user) {
        set({ authUser: resData.data.user, isLoggedIn: true });
      }
    } catch (error) {
      console.error("signup failed:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const resData = await loginUser(email, password);
      if (resData && resData.data && resData.data.user) {
        set({ authUser: resData.data.user, isLoggedIn: true });
      }
    } catch (error) {
      console.error("login failed:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await logoutUser();
      set({ authUser: null, isLoggedIn: false });
    } catch (error) {
      console.error("logout failed:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  }
}));  