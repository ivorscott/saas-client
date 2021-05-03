import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import { Notifications } from "@material-ui/icons";
import { UserMenu } from "../../shared/components/UserMenu";
import styled from "styled-components";
import { SearchBar } from "./SearchBar";

const AlertButton = styled(IconButton)`
  background: #d9e2ec;
  height: var(--p34);
  width: var(--p34);
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--p14) var(--p34);
  height: var(--p44);
  background: var(--white2);
  border-bottom: 1px solid var(--gray2);
`;

const TopMenu = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const TopBar = () => {
  const [showAlerts, setShowAlerts] = useState(false);

  const toggleAlerts = () => setShowAlerts(!showAlerts);

  return (
    <TopContainer>
      <SearchBar />
      <TopMenu>
        <AlertButton>
          <Notifications />
        </AlertButton>
        <UserMenu />
      </TopMenu>
    </TopContainer>
  );
};

export { TopBar };
