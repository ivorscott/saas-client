import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useDeleteUser } from "../../../hooks/users";

interface Props {
  title: string;
  userId: string;
  email: string;
  buttonText?: string;
  children: any;
}

export function DeleteDialog({ userId, email, ...props }: Props) {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState<Error>();
  const mutation = useDeleteUser();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    await mutation.mutateAsync({ userId, email });
    if (mutation.isError) {
      setError(mutation.error);
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <IconButton size="large" color="primary" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          {error && <DialogContentText>error</DialogContentText>}
          <DialogContentText id="alert-dialog-description">
            {props.children}
          </DialogContentText>
        </DialogContent>
        <StyledDialogActions>
          <Button
            className="opt-out"
            variant={"contained"}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button variant={"contained"} onClick={handleSubmit}>
            Yes, Delete
          </Button>
        </StyledDialogActions>
      </Dialog>
    </div>
  );
}

const StyledDialogActions = styled(DialogActions)`
  button {
    padding: var(--p8) var(--p32);
    font-family: ProximaNova-Bold;
    font-size: var(--p16);
    text-transform: capitalize;
  }
  .opt-out {
    color: var(--gray4);
    background: var(--gray1);
    &:hover {
      color: var(--gray9);
      background: var(--gray2);
    }
  }
`;
