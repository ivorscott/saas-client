import { Grid, CircularProgress } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { useAuth } from "./hooks";

export const Auth0Provider: React.FC<{ children: any }> = ({ children }) => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return (
      <Grid item={true} xs={12}>
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      </Grid>
    );
  }

  return children;
};

const LoaderContainer = styled.div`
  text-align: center;
  margin-top: 50vh;
`;
const Loader = styled(CircularProgress)`
  color: var(--blue7);
`;
