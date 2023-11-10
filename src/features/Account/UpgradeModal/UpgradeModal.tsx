import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

import { useCreateSubscription } from "../../../hooks/subscription";
import { StripePayload } from "../../../types/subscription";
import { CurrentUser } from "../../../types/user";
import { PremiumPlan } from "../constants";

interface Props {
  open: boolean;
  onClose: () => void;
  user: CurrentUser;
  onSubmit: (name: string) => void;
}

export const UpgradeModal = ({ user, open, onClose, onSubmit }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardHolderName, setCardHolderName] = useState<string>();
  const mutation = useCreateSubscription();
  const handleCardHolderName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardHolderName(event.target.value);
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    stripe
      .createPaymentMethod({
        elements,
        params: {
          billing_details: {
            email: user.email,
            name: cardHolderName,
          },
        },
      })
      .then(function (result) {
        const payload: StripePayload = {
          plan: PremiumPlan["eur"].plan,
          currency: "eur",
          productId: PremiumPlan["eur"].productId,
          firstName: user.firstName,
          lastName: user.lastName,
          paymentMethod: result.paymentMethod?.id,
          email: user.email,
          amount: PremiumPlan["eur"].amount,
          lastFour: result.paymentMethod?.card?.last4,
          cardBrand: result.paymentMethod?.card?.brand,
          expirationMonth: result.paymentMethod?.card?.exp_month,
          expirationYear: result.paymentMethod?.card?.exp_year,
        };
        mutation.mutate(payload);
      });
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
          <label>Cardholder Name</label>
          <Field
            id="name"
            type="text"
            fullWidth={true}
            placeholder="Jane Doe"
            required
            autoComplete="name"
            value={cardHolderName}
            onChange={handleCardHolderName}
          />
          <CardElement />
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
  margin-bottom: var(--p16);

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
