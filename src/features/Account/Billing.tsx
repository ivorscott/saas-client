import { styled } from "@mui/material/styles";
import Table from "rc-table";
import React from "react";

import { SubscriptionInfo } from "../../types/subscription";
import { PremiumPlan } from "./constants";
import { transactionColumns } from "./TableColumns";
import { components } from "./TableRow";

export const Billing = (props: SubscriptionInfo) => {
  return (
    <div>
      {props.defaultPaymentMethod ? (
        <div>
          <p>{PremiumPlan["eur"].plan}</p>

          <br />

          <StyledTable
            columns={transactionColumns}
            data={props.transactions}
            rowKey="id"
            components={components}
            tableLayout="auto"
            emptyText={"No transactions"}
          />
        </div>
      ) : (
        <div>no data</div>
      )}
    </div>
  );
};

const StyledTable = styled(Table)`
  margin: var(--p48) 0;
  th {
    font-family: ProximaNova-Extrabold;
    font-size: var(--p14);
    color: var(--gray7);
  }
`;
