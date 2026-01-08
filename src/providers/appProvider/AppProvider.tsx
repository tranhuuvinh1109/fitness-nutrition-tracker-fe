"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type UserRole = "admin" | "user" | null;

interface User {
  role: UserRole;
  name: string;
  email?: string;
}

interface AppContextProps {
  user: User;
  setUser: (user: User) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    role: "admin",
    name: "Admin",
    email: "admin@gmail.com",
  });

  return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return ctx;
};
