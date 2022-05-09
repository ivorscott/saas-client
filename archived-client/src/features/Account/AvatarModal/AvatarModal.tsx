import React from "react";
import { AvatarEditor } from "./AvatarEditor";
import { Modal } from "../../../components/Modal";
import ImageViewer from "../../../components/ImageViewer";
import styled from "styled-components";

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

export class AvatarModal extends React.Component<Props, State> {
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
          open={isOpen}
          title="Edit Photo"
          onClose={onToggle}
          onSubmit={this.handlePreview}
        >
          <EditorWindow>
            <AvatarEditor
              width="100%"
              height={200}
              cropRadius={100}
              minCropRadius={100}
              onCrop={this.handleCrop}
              onClose={this.handleClose}
              src={this.state.src}
            />
            {this.state.preview && (
              <Preview>
                <ImageViewer size="xl" url={this.state.preview} alt="Preview" />
              </Preview>
            )}
          </EditorWindow>
        </Modal>
      </div>
    );
  }
}

const EditorWindow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Preview = styled.div`
  padding-top: var(--p24);
`;
