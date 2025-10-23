import { getCurrentUser } from "@/lib/appwrite";
import { Models } from "react-native-appwrite";
import { create } from "zustand";

export interface User extends Models.Document {
  name: string;
  email: string;
  avatar: string;
}

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;

  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;

  fetchAuthenticatedUser: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,

  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  
  fetchAuthenticatedUser: async () => {
    set({ isLoading: true });
    try {
      const user = await getCurrentUser();
      if (user) {
        set({ isAuthenticated: true, user: user as unknown as User });
      } else {
        throw Error("No user found");
      }
    } catch (error) {
      console.error("fetchAuthenticatedUser error", error);
      set({ isAuthenticated: false, user: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
