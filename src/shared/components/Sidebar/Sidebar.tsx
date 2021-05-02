import React from "react";
import { Layers } from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div``;

export const SideBar = () => {
  return (
    <Container>
      <div>
        <Link to="/manage/projects">
          <img alt="logo" style={{ height: 28 }} src="/logo.png" />
        </Link>
      </div>
      <ul>
        <li>
          <Layers />
          <Link to="/manage/projects">Projects</Link>
        </li>
      </ul>
    </Container>
  );
};
