import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import { Notifications } from "@material-ui/icons";
import { UserMenu } from "../../shared/components/UserMenu";
import styled from "styled-components";

const AlertButton = styled(IconButton)`
  background: #d9e2ec;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--p14) var(--p24);
  height: var(--p44);
  background: var(--white2);
  border-bottom: 1px solid var(--gray2);
`;

const SearchBar = styled.input`
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

const TopMenu = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const TopBar = () => {
  const [showAlerts, setShowAlerts] = useState(false);

  const toggleAlerts = () => setShowAlerts(!showAlerts);

  return (
    <Container>
      <SearchBar placeholder="Search" />
      <TopMenu>
        <AlertButton>
          <Notifications />
        </AlertButton>
        <UserMenu />
      </TopMenu>
    </Container>
  );
};

export { TopBar };
