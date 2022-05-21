// TODO: Replace Auth0 with AWS Cognito - Use AWS Amplify
import React from "react";
// import Grid  from "@mui/material/Grid";
// import { Loader } from "../../components/Loader";
// import { useAuth } from "./hooks";

export const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
  // const isAuthenticated = useAuth();

  // if (!isAuthenticated) {
  //   return (
  //     <Grid item={true} xs={12}>
  //       <Loader />
  //     </Grid>
  //   );
  // }

  return children;
};
