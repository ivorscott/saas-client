import { Hive } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Table from "rc-table";
import React from "react";

import {
  SubscriptionInfo,
  SubscriptionStatus,
} from "../../../types/subscription";
import { PremiumPlan } from "../constants";
import { transactionColumns } from "../TableColumns";
import { components } from "../TableRow";

interface BillingProps {
  onToggle: () => void;
  subInfo: SubscriptionInfo | undefined;
}

export const Billing = ({ onToggle, subInfo }: BillingProps) => {
  const handleUpgrade = () => {
    onToggle();
  };

  if (!subInfo || subInfo.subscription.statusId != SubscriptionStatus.Cleared) {
    return (
      <div>
        <StyledHeader>
          <Hive className="icon" />
          <h2>Basic Plan</h2>
        </StyledHeader>

        <StyledPremiumButton variant="contained" onClick={handleUpgrade}>
          Upgrade to Premium
        </StyledPremiumButton>
      </div>
    );
  }

  return (
    <div>
      <StyledHeader>
        <Hive className="icon" />
        <h2>Premium Plan</h2>
      </StyledHeader>
      <h3>Payment Method</h3>
      <StyledPaymentMethod>
        <span>Card</span>
        <span>{subInfo.paymentMethod.billing_details.name}</span>
        <aside>
          <img
            alt="card brand"
            src={`/cardbrands/${getCardIcon(
              subInfo.paymentMethod.card?.brand
            )}`}
          />
          <span>{subInfo.paymentMethod.card?.last4}</span>
        </aside>
      </StyledPaymentMethod>
      <StyledTable
        columns={transactionColumns}
        data={subInfo.transactions}
        rowKey="id"
        components={components}
        tableLayout="auto"
        emptyText={"No transactions"}
      />
    </div>
  );
};

function getCardIcon(brand: string | undefined): string {
  let icon: string;
  switch (brand) {
    case "visa":
      icon = "visa.png";
      break;
    case "discover":
      icon = "discover.png";
      break;
    case "mastercard":
      icon = "mastercard.png";
      break;
    case "paypal":
      icon = "paypal.png";
      break;
    case "maestro":
      icon = "maestro.png";
      break;
    default:
      icon = "default.png";
  }
  return icon;
}

const StyledTable = styled(Table)`
  margin: var(--p48) 0;
  th {
    font-family: ProximaNova-Extrabold;
    font-size: var(--p14);
    color: var(--gray7);
  }
`;

const StyledPremiumButton = styled(Button)`
  background: var(--blue7);

  &:hover {
    background: var(--blue8);
  }
`;

const StyledPaymentMethod = styled("div")`
  display: flex;
  flex-direction: row;
  width: 500px;

  justify-content: space-between;
  align-items: center;
  aside {
    display: flex;
    align-items: center;
  }

  img {
    width: var(--p64);
    border: 1px solid #eee;
    border-radius: 8px;
    margin: var(--p8);
  }
`;

const StyledHeader = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;

  svg {
    color: var(--gray7);
    margin-right: var(--p8);
  }
`;
