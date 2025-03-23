import { createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
  user: { id: string; email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const value: AuthContextType = {
    user: null,
    login: async (email: string, password: string) => {
      // Логика логина
    },
    logout: async () => {
      // Логика выхода
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};