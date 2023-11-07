import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export const UpgradeModal = ({ open, onClose, onSubmit }: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <StyledDialog
      data-test="component-projects-modal"
      open={open}
      classes={{ paper: "modal" }}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContainer>
        <StyledDialogTitle id="responsive-dialog-title">
          Upgrade to Premium
        </StyledDialogTitle>
        <DialogContentText>Please provide your card details.</DialogContentText>
        <br />
        <DialogContent>
          <PaymentElement />
        </DialogContent>

        <StyledDialogActions>
          <Button className="opt-out" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={!stripe}
            variant="contained"
            onClick={handleSubmit}
            color="primary"
          >
            Submit
          </Button>
        </StyledDialogActions>
      </DialogContainer>
    </StyledDialog>
  );
};

const StyledDialog = styled(Dialog)`
  .modal {
    border-radius: var(--p8);
    max-height: none;
    position: fixed;
    top: 15%;
  }
  .MuiDialogContentText-root {
    margin-top: 0;
  }
`;

const DialogContainer = styled("div")`
  width: calc(var(--p384) - var(--p32) - var(--p32));
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
