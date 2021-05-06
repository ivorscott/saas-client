import React from "react";
import { Loading } from "../../shared/components/Loading";
import { useAuth } from "./hooks";

const Auth0Provider: React.FC<{ children: any }> = ({ children }) => {
  const { isLoading, isError, isAuthenticated } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h1>Something went Wrong!</h1>;
  }

  if (isAuthenticated) {
    return children;
  }

  return <div />;
};

export { Auth0Provider };
