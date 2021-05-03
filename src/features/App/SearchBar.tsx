import React from "react";
import styled from "styled-components";

const StyledSearchBar = styled.input`
  height: var(--p34);
  width: var(--p414);
  padding: 0 var(--p16);
  border-radius: 50px;
  background: var(--white2);
  border: 1px solid #d9e2ec;
  &:focus {
    outline: none;
    background: var(--white1);
  }
`;

export const SearchBar = () => <StyledSearchBar placeholder="Search" />;
