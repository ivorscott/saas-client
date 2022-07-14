import { styled } from "@mui/material/styles";
import React from "react";

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
      <StyledCell>
        <StyledImage />
        <StyledUserTitle>
          <StyledName>
            {value.firstName} {value.lastName}
          </StyledName>
          {value.role && <StyledSubtitle>{value.role}</StyledSubtitle>}
        </StyledUserTitle>
      </StyledCell>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 250,
    render: (value: any) => <StyledCell>{value}</StyledCell>,
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 250,
    render: (value: any) => (
      <StyledCell>{new Date(value).toLocaleDateString("en-US")}</StyledCell>
    ),
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    width: 250,
    render: (_: any, d: any, __: number) => (
      <StyledCell>
        <DeleteDialog title="Delete User" userId={d.id} email={d.email}>
          Remove
          <HighlightRed>
            {` ${d.user.firstName} ${d.user.lastName} `}
          </HighlightRed>{" "}
          from your account. Are you sure you want to proceed?
        </DeleteDialog>
      </StyledCell>
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

const StyledCell = styled(Cell)`
  display: flex;
  justify-content: flex-start;
  align-content: center;
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
