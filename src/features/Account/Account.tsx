import React, { useState } from "react";
import { AvatarModal } from "./AvatarModal";
import IconButton from "@mui/material/IconButton";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ImageViewer from "../../components/ImageViewer";
import { useQuery } from "react-query";
import { UserPayload } from "../../services/types";
import { client } from "../../services/APIService";
import styled from "styled-components";

interface Actions {
  onToggle: () => void;
  onSubmit: (image: any) => void;
}

interface Props extends Actions {
  user: any;
  isOpen: boolean;
  defaultAvatar: any;
}

export const Component = ({
  isOpen,
  onSubmit,
  onToggle,
  defaultAvatar,
}: Props) => {
  return (
    <div>
      <header>
        <h1>My Account</h1>
      </header>
      <Avatar onClick={onToggle}>
        {defaultAvatar ? (
          <div>
            <ImageViewer size="lg" alt="avatar" url={defaultAvatar} />
          </div>
        ) : (
          <IconButton>
            <PhotoCameraIcon fontSize="large" />
          </IconButton>
        )}
      </Avatar>
      <div>
        <AvatarModal
          isOpen={isOpen}
          defaultAvatar={defaultAvatar}
          onSubmit={onSubmit}
          onToggle={onToggle}
        />
      </div>
    </div>
  );
};

export const Account = () => {
  const [isOpen, setOpen] = useState(false);

  const { data: user } = useQuery<UserPayload>(
    "auth",
    async () => await client.get("/users/me")
  );

  const toggle = () => setOpen(!isOpen);

  const upload = async (blob: Blob) => {
    // await dispatch(uploadImage({ blob, id: user.id }));
  };

  return (
    <Component
      user={user}
      isOpen={isOpen}
      defaultAvatar={user?.picture}
      onToggle={toggle}
      onSubmit={upload}
    />
  );
};

const Avatar = styled.div`
  margin: var(--p16);
  display: inline-block;
  cursor: pointer;
`;
