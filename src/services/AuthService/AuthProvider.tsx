import React from "react";
import { Grid } from "@material-ui/core";
import { Loader } from "../../components/Loader";
import { useAuth } from "./hooks";

export const Auth0Provider: React.FC<{ children: any }> = ({ children }) => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return (
      <Grid item={true} xs={12}>
        <Loader />
      </Grid>
    );
  }

  return children;
};
