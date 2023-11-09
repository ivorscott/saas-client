import { Box, Tab, Tabs } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Auth } from "aws-amplify";
import { Layout } from "components/Layout";
import { useSeatsAvailable, useTableUsers, useUsers } from "hooks/users";
import Table from "rc-table";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { formatPath } from "../../helpers/helpers";
import { useSubscriptionInfo } from "../../hooks/subscription";
import { client as api } from "../../services/APIService";
import { Intent } from "../../types/intent";
import { Modal as AddUser } from "./Modal";
import { SubscriptionInfoSection } from "./SubscriptionInfoSection";
import { columns } from "./TableColumns";
import { components } from "./TableRow";
import { UpgradeModal } from "./UpgradeModal";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

enum AccountTab {
  Plan = "plan",
  Users = "users",
}

const getTabIndex = (tab: string | null): number => {
  if (tab == null) {
    tab = AccountTab.Users;
  }
  let index = 0;
  switch (tab) {
    case AccountTab.Plan:
      break;
    case AccountTab.Users:
      index = 1;
      break;
  }
  return index;
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`);

export const Account = () => {
  const [userInfo, setUserInfo] = useState<{
    company: string;
    tenantId: string;
  }>();
  const [value, setValue] = React.useState(0);
  const [isOpen, setOpen] = useState(false);
  const [options, setOptions] = useState<{ clientSecret: string }>();

  const [searchParams] = useSearchParams();
  const seatsResult = useSeatsAvailable();
  const navigate = useNavigate();
  const result = useUsers();
  const users = useTableUsers(result);
  const info = useSubscriptionInfo(userInfo?.tenantId);

  const tab = searchParams.get("t");
  const basePath = "/" + formatPath(userInfo?.company);

  const handleChange = (event: React.SyntheticEvent) => {
    const button = event.target as HTMLButtonElement;
    if (AccountTab.Users == button.innerText.toLowerCase()) {
      const path = `${basePath}/account?t=${AccountTab.Users}`;
      navigate(path);
    } else {
      const path = `${basePath}/account?t=${AccountTab.Plan}`;
      navigate(path);
    }
  };

  const toggleModal = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    const fn = async (tab: string | null) => {
      const pi = (await api.post("/subscriptions/payment-intent", {
        currency: "eur",
        amount: 1000,
      })) as Intent;

      setOptions({ clientSecret: pi.client_secret });

      // get company
      const session = await Auth.currentSession();
      const data = session.getIdToken().payload;
      const company = data["custom:company-name"];
      const tenantId = data["custom:tenant-id"];
      setUserInfo({ company, tenantId });
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
        {value === index && <Box>{children}</Box>}
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
        <Tabs
          onChange={handleChange}
          value={value}
          aria-label="basic tabs example"
        >
          <Tab label={AccountTab.Plan} />
          <Tab label={AccountTab.Users} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {seatsResult.maxSeats == 3 ? (
          <>
            <h2>Basic Plan</h2>
            {info && <SubscriptionInfoSection {...info} />}
            <StyledPremiumButton variant="contained" onClick={toggleModal}>
              Upgrade to Premium
            </StyledPremiumButton>

            <Elements stripe={stripePromise} options={options}>
              <UpgradeModal
                open={isOpen}
                onClose={toggleModal}
                onSubmit={() => {
                  return;
                }}
              />
            </Elements>
          </>
        ) : (
          <h2>Premium Plan</h2>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <StyledTable
          columns={columns}
          data={users}
          rowKey="id"
          components={components}
          tableLayout="auto"
          emptyText={"No users"}
        />
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

const StyledPremiumButton = styled(Button)`
  background: var(--blue7);

  &:hover {
    background: var(--blue8);
  }
`;
