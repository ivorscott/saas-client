import React, { useState } from "react";
import Add from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import { Avatar } from "../../components/Avatar";
import { useUsers } from "../../hooks/users";

export const ProjectUsers = () => {
  const { data: users, isLoading, isError } = useUsers();
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModalOpen = async () => setModalOpen(!isModalOpen);

  if (isLoading || isError) {
    return null;
  }

  const badgeColor = (index: number) => (index % 9) + 1;

  return (
    <Container>
      <StyledAdd onClick={toggleModalOpen} />
      {users && users.length > 0 && (
        <StyledUsers>
          {users.map((user, index) => (
            <Avatar
              key={user.id}
              alt="user avatar"
              size="sm"
              badgeColor={`badge${badgeColor(index)}`}
              user={user}
            />
          ))}
        </StyledUsers>
      )}
    </Container>
  );
};

const Container = styled("div")`
  display: flex;
  align-items: center;
  margin-top: var(--p32);
`;

const StyledAdd = styled(Add)`
  width: var(--p32);
  height: var(--p32);
  color: var(--gray7);
  cursor: pointer;
`;

const StyledUsers = styled("div")`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
