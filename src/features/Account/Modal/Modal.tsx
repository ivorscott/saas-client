import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NewUser } from "../../../types";
import { useCreateUser, useSeatsAvailable } from "../../../hooks/users";

export const Modal = () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    resetForm();
    setOpen(!open);
  };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<Error>();
  const seatsResult = useSeatsAvailable();
  const seatsAvailable = !!seatsResult.seatsAvailable;

  const mutation = useCreateUser();

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const firstName = event.target.value;
    setFirstName(firstName);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const lastName = event.target.value;
    setLastName(lastName);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setEmail(email);
  };

  const resetForm = () => {
    setEmail("");
    setLastName("");
    setFirstName("");
    setError(undefined);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newUser = {
      email,
      firstName,
      lastName,
    } as NewUser;

    mutation.mutate(newUser);
    if (mutation.isError) {
      setError(mutation.error);
      return;
    }
    if (!mutation.isLoading || !mutation.isError) {
      resetForm();
    }
  };

  return (
    <>
      <StyledUpgradeButton
        onClick={toggleOpen}
        disabled={!seatsAvailable}
        variant={"contained"}
      >
        Add User
      </StyledUpgradeButton>
      <StyledDialog
        data-test="component-user-modal"
        open={open}
        classes={{ paper: "modal" }}
        onClose={toggleOpen}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContainer>
          <StyledDialogTitle id="responsive-dialog-title">
            Add User
          </StyledDialogTitle>

          {error && (
            <Alert className="error" severity="error">
              {error.message}
            </Alert>
          )}

          <DialogContentText>Invite user to account.</DialogContentText>

          <DialogContent>
            <Field
              fullWidth={true}
              onChange={handleFirstNameChange}
              name="firstName"
              value={firstName}
              margin={"normal"}
              placeholder="First name"
            />
            <Field
              fullWidth={true}
              onChange={handleLastNameChange}
              name="lastName"
              value={lastName}
              margin={"normal"}
              placeholder="Last name"
            />
            <Field
              fullWidth={true}
              onChange={handleEmailChange}
              name="email"
              value={email}
              margin={"normal"}
              placeholder="Enter an email"
            />
          </DialogContent>

          <StyledDialogActions>
            <Button
              className="opt-out"
              variant="contained"
              onClick={toggleOpen}
              color="secondary"
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit} color="primary">
              Create
            </Button>
          </StyledDialogActions>
        </DialogContainer>
      </StyledDialog>
    </>
  );
};

const StyledUpgradeButton = styled(Button)`
  color: var(--white1);
  background: var(--blue6);
  padding: var(--p8) var(--p16);
  text-transform: capitalize;
  font-family: ProximaNova-Semibold;

  &:hover {
    background: var(--blue7);
  }
`;

const StyledDialog = styled(Dialog)`
  .modal {
    border-radius: var(--p8);
    max-height: none;
    position: fixed;
    top: 15%;
  }
  .error {
    margin-bottom: var(--p16);

    & ::first-letter {
      text-transform: capitalize;
    }
  }
`;

const DialogContainer = styled("div")`
  width: calc(var(--p512) - var(--p32) - var(--p32));
  padding: var(--p32);
`;

const DialogContent = styled("div")`
  min-height: var(--p96);
`;

const StyledDialogTitle = styled(DialogTitle)`
  padding: 0 0 var(--p32);
  h2 {
    font-family: ProximaNova-Bold;
    font-size: var(--p24);
  }
`;

const Field = styled(TextField)`
  background: var(--secondary);
  border-radius: var(--p4);
  border: 1px solid var(--gray2);
  & fieldset {
    border: none;
  }
  & input {
    font-family: ProximaNova-Regular;
    font-size: var(--p16);
    padding: var(--p8);
  }
  & input:focus {
    outline: none;
    border: none;
    background: var(--white1);
    border-radius: var(--p4);
  }
`;

const StyledDialogActions = styled("div")`
  display: flex;
  justify-content: space-between;
  padding-top: var(--p32);
  button {
    width: 48%;
    padding: var(--p8);
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
