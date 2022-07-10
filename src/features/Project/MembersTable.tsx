import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Memberships } from "./types";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface Props {
  memberships: Memberships[];
}

export const MembersTable = ({ memberships }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <StyledTableHead>
          <TableRow>
            <StyledTableCell>Member</StyledTableCell>
            <StyledTableCell align="left">Email address</StyledTableCell>
            <StyledTableCell align="left">Date Added</StyledTableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {memberships.map((m) => (
            <StyledTableRow key={m.id}>
              <StyledTableCell component="th" scope="row">
                <StyledHeadCell>
                  <div>{m.firstName + " " + (m.lastName || "")}</div>
                  <StyledRole>{m.role}</StyledRole>
                </StyledHeadCell>
              </StyledTableCell>
              <StyledTableCell align="left">
                <div>{m.email}</div>
              </StyledTableCell>

              <StyledTableCell align="left">
                {dayjs().to(dayjs(m.createdAt))}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const StyledTableHead = styled(TableHead)`
  th {
    font-family: ProximaNova-Semibold;
  }
  background: var(--gray1);
`;
const StyledHeadCell = styled("div")`
  font-family: ProximaNova-Medium;
  text-transform: capitalize;
`;

const StyledRole = styled("div")`
  font-size: var(--p12);
  text-transform: lowercase;
`;

const StyledTableRow = styled(TableRow)``;

const StyledTableCell = styled(TableCell)`
  color: var(--primary);
  font-size: 14px;
`;
