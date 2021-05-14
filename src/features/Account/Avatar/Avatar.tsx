import React from "react";
import { AvatarEditor } from "./AvatarEditor";
import { Modal } from "../../../components/Modal";
import ImageViewer from "../../../components/ImageViewer";

interface Actions {
  onToggle: () => void;
  onSubmit: (image: string) => void;
}

interface Props extends Actions {
  defaultAvatar?: any;
  isOpen: boolean;
}

interface State {
  preview: string;
  src: string;
}

export class Avatar extends React.Component<Props, State> {
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
    const { isOpen, onToggle } = this.props;
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
          <div>
            <AvatarEditor
              width="100%"
              height={300}
              cropRadius={100}
              minCropRadius={100}
              onCrop={this.handleCrop}
              onClose={this.handleClose}
              src={this.state.src}
            />
            {this.state.preview && (
              <ImageViewer url={this.state.preview} alt="Preview" />
            )}
          </div>
        </Modal>
      </div>
    );
  }
}
