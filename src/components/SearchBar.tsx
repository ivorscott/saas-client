import React from "react";
import { styled } from "@mui/material/styles";

export const SearchBar = () => <StyledSearchBar placeholder="Search" />;

const StyledSearchBar = styled("input")`
  height: var(--p32);
  width: calc(var(--p384) - var(--p16) - var(--p16));
  padding: 0 var(--p16);
  border-radius: 50px;
  background: var(--white2);
  border: 1px solid #d9e2ec;
  &:focus {
    outline: none;
    background: var(--white1);
  }
`;
