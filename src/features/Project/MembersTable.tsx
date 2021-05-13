import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Memberships } from "./types";
import styled from "styled-components";
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
const StyledHeadCell = styled.div`
  font-family: ProximaNova-Medium;
  text-transform: capitalize;
`;

const StyledRole = styled.div`
  font-size: var(--p12);
  text-transform: lowercase;
`;

const StyledTableRow = styled(TableRow)``;

const StyledTableCell = styled(TableCell)`
  color: var(--primary);
  font-size: var(--p16);
`;
