import React, { createContext } from "react";
import useAuthProvider from "./useAuthProvider";

export const AuthContext = createContext<any | null>(null);

const AuthProvider: React.FC = ({ children }: any) => {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
