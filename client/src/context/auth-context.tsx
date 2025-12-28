import React, { createContext, useContext, useEffect, useState } from "react";
// Supabase user type
import { onAuthChange } from "@/lib/supabase";
import { apiRequest } from "@/lib/queryClient";
import { requestNotificationPermission } from "@/lib/supabase";
import type { User } from '@shared/schema';

interface AuthContextProps {
  // This represents the Supabase auth user shape (kept loose intentionally)
  user: any;
  isLoading: boolean;
  userId: number | null;
  // Optional: allow updating the in-memory user object from components
  updateUser?: (patch: Partial<any>) => void;
}

const defaultContext: AuthContextProps = {
  user: null,
  isLoading: true,
  userId: null,
  updateUser: () => {},
};

const AuthContext = createContext<AuthContextProps>(defaultContext);

export const useAuthContext = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {

    const unsubscribe = onAuthChange(async (authUser) => {
      setIsLoading(true);
      // Map Supabase user to a stable shape and keep uid field
      const mappedUser = authUser ? { ...authUser, uid: authUser.id } : null;
      setUser(mappedUser);

      if (mappedUser) {
        try {
          // Get user from database or create if not exists; send uid field
          const response = await apiRequest("POST", "/api/users", {
            uid: mappedUser.uid,
            username: mappedUser.email?.split('@')[0] || "user",
            email: mappedUser.email || "",
          });
          setUserId(response.id);
          // Merge DB fields into the auth user so UI shows the saved profile
          const merged = {
            ...mappedUser,
            // prefer database displayName/photoURL when present
            displayName: response.displayName ?? mappedUser.displayName ?? mappedUser.user_metadata?.full_name ?? mappedUser.email?.split('@')[0] ?? null,
            photoURL: response.photoURL ?? mappedUser.photoURL ?? mappedUser.user_metadata?.avatar_url ?? null,
          };
          setUser(merged);
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

    return unsubscribe;
  }, []);

  const updateUser = (patch: Partial<any>) => {
    setUser((prev: any) => (prev ? { ...prev, ...patch } : prev));
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, userId, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
