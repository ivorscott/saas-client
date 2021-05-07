import React from "react";
import { Loading } from "../../shared/components/Loading";
import { useAuth } from "./hooks";

const Auth0Provider: React.FC<{ children: any }> = ({ children }) => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export { Auth0Provider };
