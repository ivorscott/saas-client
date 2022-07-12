import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { User } from "../../types";

dayjs.extend(relativeTime);

interface Props {
  users: User[];
}

export const UsersTable = ({ users }: Props) => {
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
          {users.map((user) => (
            <StyledTableRow key={user.id}>
              <StyledTableCell component="th" scope="row">
                <StyledHeadCell>
                  <div>{user.firstName + " " + (user.lastName || "")}</div>
                </StyledHeadCell>
              </StyledTableCell>
              <StyledTableCell align="left">
                <div>{user.email}</div>
              </StyledTableCell>

              <StyledTableCell align="left">
                {dayjs().to(dayjs(user.createdAt))}
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

const StyledTableRow = styled(TableRow)``;

const StyledTableCell = styled(TableCell)`
  color: var(--primary);
  font-size: 14px;
`;
