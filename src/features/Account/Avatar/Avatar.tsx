import React from "react";
import { withStyles, WithStyles } from "@material-ui/core";
import AvatarEditor from "exif-react-avatar-edit";
import { Modal } from "../../../shared/components/Modal";
import styles from "./styles";

interface Actions {
  onToggle: () => void;
  onSubmit: (image: string) => void;
}

interface Props extends Actions, WithStyles<typeof styles> {
  defaultAvatar?: any;
  isOpen: boolean;
}

interface State {
  preview: string;
  src: string;
}

class Avatar extends React.Component<Props, State> {
  state = {
    preview: "",
    src: "",
  };

  componentDidMount() {
    this.setDefault();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.defaultAvatar !== this.props.defaultAvatar) {
      this.setDefault();
    }
  }

  setDefault() {
    if (this.props.defaultAvatar) {
      this.setState({ preview: this.props.defaultAvatar });
    }
  }

  handleCrop = (preview: any) => {
    this.setState({ preview });
  };

  handleClose = () => {
    this.setDefault();
  };

  handlePreview = () => {
    this.props.onToggle();
    this.props.onSubmit(this.state.preview);
  };

  render() {
    const { isOpen, onToggle, classes } = this.props;
    return (
      <div>
        <Modal
          data-test="component-update-task-modal"
          open={isOpen}
          title="Edit Photo"
          onClose={onToggle}
          onSubmit={this.handlePreview}
          callToActionText={"Save"}
          callToActionColor={"secondary"}
        >
          <div className={classes.contentWrapper}>
            <AvatarEditor
              width="100%"
              height={150}
              cropRadius={60}
              minCropRadius={60}
              onCrop={this.handleCrop}
              onClose={this.handleClose}
              src={this.state.src}
            />
            {this.state.preview && (
              <ImageViewer
                className={classes.preview}
                url={this.state.preview}
                alt="Preview"
              />
            )}
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(Avatar);
