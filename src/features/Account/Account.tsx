import { Box, Tab, Tabs, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Auth } from "aws-amplify";
import { Layout } from "components/Layout";
import { useSeatsAvailable, useTableUsers, useUsers } from "hooks/users";
import Table from "rc-table";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { formatPath } from "../../helpers/helpers";
import { Modal as AddUser } from "./Modal";
import { columns } from "./TableColumns";
import { components } from "./TableRow";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

enum AccountTab {
  Users = "users",
  Plan = "plan",
}

const getTabIndex = (tab: string | null): number => {
  if (tab == null) {
    tab = AccountTab.Users;
  }
  let index = 0;
  switch (tab) {
    case AccountTab.Users:
      break;
    case AccountTab.Plan:
      index = 1;
      break;
  }
  return index;
};

export const Account = () => {
  const [userInfo, setUserInfo] = useState<{ company: string }>();
  const [value, setValue] = React.useState(0);
  const [isOpen, setOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const seatsResult = useSeatsAvailable();
  const result = useUsers();
  const users = useTableUsers(result);

  const tab = searchParams.get("t");

  const handleChange = (
    event: React.MouseEvent<HTMLAnchorElement>,
    tab: string
  ) => {
    setValue(getTabIndex(tab));
  };

  const toggleModal = () => {
    setOpen(!isOpen);
  };

  const handleUpgrade = () => {
    return;
  };

  useEffect(() => {
    const fn = async (tab: string | null) => {
      // get company
      const session = await Auth.currentSession();
      const data = session.getIdToken().payload;
      const company = data["custom:company-name"];
      setUserInfo({ company });
      setValue(getTabIndex(tab));
    };
    fn(tab);
  }, [tab]);

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

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
      <br />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} aria-label="basic tabs example">
          <Link
            to={`/${formatPath(userInfo?.company)}/account?t=${
              AccountTab.Users
            }`}
            style={{ color: "black" }}
            onClick={(e) => handleChange(e, AccountTab.Users)}
          >
            <Tab label="Users" />
          </Link>
          <Link
            to={`/${formatPath(userInfo?.company)}/account?t=${
              AccountTab.Plan
            }`}
            style={{ color: "black" }}
            onClick={(e) => handleChange(e, AccountTab.Plan)}
          >
            <Tab label="Plan" />
          </Link>
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <StyledTable
          columns={columns}
          data={users}
          rowKey="id"
          components={components}
          tableLayout="auto"
          emptyText={"No users"}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {seatsResult.maxSeats == 3 ? (
          <>
            <h2>Basic Plan</h2>

            <p onClick={toggleModal}>Upgrade to Premium</p>
          </>
        ) : (
          <h2>Premium Plan</h2>
        )}
      </CustomTabPanel>
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
