import React, { useState } from "react";
import {
  // useDispatch,
  useSelector,
} from "react-redux";
// import { uploadImage } from "./reducer";
import {
  // AppDispatch,
  RootState,
} from "../../shared/store";
import { Avatar as AvatarModal } from "./Avatar";
import { Grid, IconButton } from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import ImageViewer from "../../shared/components/ImageViewer";

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
  // const dispatch: AppDispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth);
  const { image } = useSelector((state: RootState) => state.account);

  const toggle = () => setOpen(!isOpen);

  const upload = async (blob: Blob) => {
    // await dispatch(uploadImage({ blob, id: user.id }));
  };

  return (
    <Component
      user={user}
      isOpen={isOpen}
      defaultAvatar={image}
      onToggle={toggle}
      onSubmit={upload}
    />
  );
};

export { Account };
