import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchImage, uploadImage } from "./reducer";
import { RootState } from "../../store";
import AvatarModal from "./Avatar";
import styles from "./styles";
import {
  withStyles,
  WithStyles,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import ImageViewer from "../../shared/components/ImageViewer";

interface Actions {
  onToggle: () => void;
  onSubmit: (image: any) => void;
}

interface Props extends Actions, WithStyles<typeof styles> {
  user: any;
  isOpen: boolean;
  defaultAvatar: any;
}

export const Component = withStyles(styles)(
  ({ isOpen, onSubmit, onToggle, defaultAvatar, classes }: Props) => {
    return (
      <Grid data-test="component-account" container={true} spacing={10}>
        <Grid item={true} xs={12}>
          <header>
            <Typography variant="h1" gutterBottom={true}>
              My Account
            </Typography>
            <Typography variant="h2">
              Edit and Personalize Preferences
            </Typography>
          </header>
        </Grid>
        <Grid className={classes.avatarWrapper} item={true} xs={12}>
          <div onClick={onToggle} className={classes.placeholderImage}>
            {defaultAvatar ? (
              <div className={classes.overlay}>
                <ImageViewer
                  alt=""
                  className={classes.avatar}
                  url={defaultAvatar}
                />
              </div>
            ) : (
              <IconButton className={classes.uploadButton}>
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
  }
);

const Account: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      dispatch(fetchImage());
    };
    fetch();
  }, [dispatch]);

  const toggle = () => setOpen(!isOpen);

  const upload = async (image: string) => {
    await dispatch(uploadImage(image));
  };

  return (
    <Component
      user={auth}
      isOpen={isOpen}
      defaultAvatar={auth.picture}
      onToggle={toggle}
      onSubmit={upload}
    />
  );
};

export { Account };
