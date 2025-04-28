import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { onAuthChange } from "@/lib/firebase";
import { apiRequest } from "@/lib/queryClient";
import { requestNotificationPermission } from "@/lib/firebase";

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  userId: number | null;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoading: true,
  userId: null,
});

export const useAuthContext = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (authUser) => {
      setIsLoading(true);
      setUser(authUser);
      
      if (authUser) {
        try {
          // Get user from database or create if not exists
          const response = await apiRequest("POST", "/api/users", {
            uid: authUser.uid,
            username: authUser.displayName || authUser.email?.split('@')[0] || "user",
            email: authUser.email || "",
            photoURL: authUser.photoURL || null,
            displayName: authUser.displayName || authUser.email?.split('@')[0] || "user",
          });
          
          setUserId(response.id);
          
          // Request notification permission
          requestNotificationPermission();
        } catch (error) {
          console.error("Error getting/creating user:", error);
        }
      } else {
        setUserId(null);
      }
      
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
