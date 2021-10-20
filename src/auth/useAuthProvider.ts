import { useState } from "react";

const useAuthProvider = () => {
  const [checkAuth, setCheckAuth] = useState<null | string>(null);

  const signIn = () => {
    setCheckAuth("auth");
  };

  return {
    checkAuth,
    signIn,
  };
};

export default useAuthProvider;
