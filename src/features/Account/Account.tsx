import React, { useState } from "react";
import { Avatar as AvatarModal } from "./Avatar";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import ImageViewer from "../../components/ImageViewer";
import { useQuery } from "react-query";
import { UserPayload } from "../../services/AuthService/types";
import { client } from "../../services/APIService";

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
    <Grid data-test="component-account" container={true} spacing={10}>
      <Grid item={true} xs={12}>
        <header>
          <h1>My Account</h1>
        </header>
      </Grid>
      <Grid item={true} xs={12}>
        <div onClick={onToggle}>
          {defaultAvatar ? (
            <div>
              <ImageViewer alt="avatar" url={defaultAvatar} />
            </div>
          ) : (
            <IconButton>
              <PhotoCameraIcon fontSize="large" />
            </IconButton>
          )}
        </div>
        <div>
          <AvatarModal
            isOpen={isOpen}
            defaultAvatar={defaultAvatar}
            onSubmit={onSubmit}
            onToggle={onToggle}
          />
        </div>
      </Grid>
    </Grid>
  );
};

const Account = () => {
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

export { Account };
