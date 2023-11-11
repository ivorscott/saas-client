import { styled } from "@mui/material/styles";
import React from "react";
import { Link } from "react-router-dom";

import { DeleteDialog } from "./DeleteDialog";

export const columns = [
  {
    title: "User",
    dataIndex: "user",
    key: "user",
    width: 250,
    render: (
      value: { firstName: string; lastName: string; role: string },
      _: any,
      index: number
    ) => (
      <Cell>
        <StyledImage />
        <StyledUserTitle>
          <StyledName>
            {value.firstName} {value.lastName}
          </StyledName>
          {value.role && <StyledSubtitle>{value.role}</StyledSubtitle>}
        </StyledUserTitle>
      </Cell>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 200,
    render: (value: any) => <Cell>{value}</Cell>,
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 200,
    render: (value: any) => (
      <Cell>{new Date(value).toLocaleDateString("en-US")}</Cell>
    ),
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    width: 200,
    render: (_: any, d: any, __: number) => (
      <Cell>
        <DeleteDialog title="Delete User" userId={d.id} email={d.email}>
          Remove
          <HighlightRed>
            {` ${d.user.firstName} ${d.user.lastName} `}
          </HighlightRed>{" "}
          from your account. Are you sure you want to proceed?
        </DeleteDialog>
      </Cell>
    ),
  },
];

export const transactionColumns = [
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 200,
    render: (createdAt: string) => {
      const date = new Date(createdAt);
      const [month, day, year] = [
        date.toLocaleString("default", { month: "long" }),
        date.getDate(),
        date.getFullYear(),
      ];
      return (
        <Cell>
          <StyledDate>
            {month}, {day} {year}
          </StyledDate>
        </Cell>
      );
    },
  },
  {
    title: "Description",
    dataIndex: "invoice",
    key: "invoice",
    width: 200,
    render: (invoice: string) => <Cell>Invoice for Premium Plan</Cell>,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    width: 150,
    render: (amount: number) => {
      const value = amount / 100;
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      return <Cell>{formatter.format(value)}</Cell>;
    },
  },
  {
    title: "Actions",
    dataIndex: "",
    key: "",
    width: 200,
    render: () => (
      <Cell>
        <Link to="?t=plan">PDF</Link>
      </Cell>
    ),
  },
];

export const Cell = ({ alignment, children }: any) => {
  return (
    <div className={`table-cell ${alignment || ""}`}>
      <div className="table-value">{children}</div>
    </div>
  );
};

const HighlightRed = styled("span")`
  font-family: ProximaNova-Extrabold;
  color: var(--red5);
`;

const StyledDate = styled("div")`
  padding-left: var(--p8);
`;

const StyledImage = styled("aside")`
  border-radius: 50%;
  height: var(--p32);
  width: var(--p32);
  background: var(--gray3);
  margin: 0 var(--p8);
`;

const StyledUserTitle = styled("div")`
  display: flex;
  flex-direction: column;
`;

const StyledName = styled("span")`
  font-family: ProximaNova-Bold;
  font-size: var(--p14);
`;
const StyledSubtitle = styled("span")`
  font-family: ProximaNova-Medium;
  font-size: var(--p12);
  color: var(--gray4);
`;
