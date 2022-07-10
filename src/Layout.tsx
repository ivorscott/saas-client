import React from "react";
import { styled } from "@mui/material/styles";

export const Layout = (props: React.PropsWithChildren) => (
  <PageContent>{props.children}</PageContent>
);

const PageContent = styled("div")`
  overflow-x: scroll;
  min-height: 80vh;
  height: 100vh;
  padding: var(--p48) 5% var(--p96);

  @media (max-width: 1400px) {
    padding: var(--p16);
  }
`;
