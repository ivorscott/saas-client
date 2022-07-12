import { styled } from "@mui/material/styles";
import { Auth } from "aws-amplify";
import { Layout } from "components/Layout";
import { useTableUsers, useUsers } from "hooks/users";
import Table from "rc-table";
import React, { useEffect, useState } from "react";

import { Modal as AddUser } from "./Modal";
import { columns } from "./TableColumns";
import { components } from "./TableRow";

export const Account = () => {
  const [userInfo, setUserInfo] = useState<{ company: string }>();

  const result = useUsers();
  const data = useTableUsers(result);

  useEffect(() => {
    const fn = async () => {
      // get company
      const session = await Auth.currentSession();
      const data = session.getIdToken().payload;
      const company = data["custom:company-name"];
      setUserInfo({ company });
    };
    fn();
  }, []);

  return (
    <Layout>
      <StyledHeader>
        <header>
          <h1>Manage Account</h1>
          <h2>
            <span>{userInfo?.company}</span>{" "}
          </h2>
        </header>

        <div>
          <AddUser />
        </div>
      </StyledHeader>

      <StyledTable
        columns={columns}
        data={data}
        rowKey="id"
        components={components}
        tableLayout="auto"
        emptyText={"No users"}
      />
    </Layout>
  );
};

const StyledHeader = styled("div")`
  display: flex;
  max-width: 62.5rem;
  justify-content: space-between;

  header {
    display: flex;
    flex-direction: column;
    h2 {
      margin-top: var(--p8);
      span {
        font-family: ProximaNova-Regular;
      }
    }
  }
`;
const StyledTable = styled(Table)`
  margin: var(--p48) 0;
  th {
    font-family: ProximaNova-Extrabold;
    font-size: var(--p14);
    color: var(--gray7);
  }
`;
