import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

interface State {
  name: string;
}

class Modal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    this.setState({ name });
  };

  handleSubmit = () => {
    const { onSubmit } = this.props;
    const { name } = this.state;
    onSubmit && onSubmit(name);
  };

  render() {
    const { open, onClose } = this.props;
    const { name } = this.state;
    return (
      <Dialog
        data-test="component-projects-modal"
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Manage A New Project"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth={true}
            onChange={this.handleChange}
            value={name}
            placeholder="Project Name"
          />
          <DialogContentText>
            This could be the app or website name
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={this.handleSubmit}
            color="secondary"
            autoFocus={true}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export { Modal };
