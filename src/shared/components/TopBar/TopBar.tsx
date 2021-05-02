import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import { Notifications, Layers } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { UserMenu } from "../UserMenu";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";

const AlertButton = styled(IconButton)`
  background: #d9e2ec;
`;

const Container = styled(Paper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 15px;
`;

const SearchBar = styled.input`
  border-radius: 15px;
  border: 1px solid #d9e2ec;
  height: 24px;
  &:focus {
    outline: none;
    background: #e3f8ff;
  }
`;

const TopMenu = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const MobileNav = () => {
  return (
    <Paper>
      <ul>
        <li>
          <Layers />
          <Link to="/manage/projects">
            <h1>Projects</h1>
          </Link>
        </li>
      </ul>
    </Paper>
  );
};

const TopBar = () => {
  const [showAlerts, setShowAlerts] = useState(false);

  const toggleAlerts = () => setShowAlerts(!showAlerts);

  return (
    <Container>
      <SearchBar />
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
