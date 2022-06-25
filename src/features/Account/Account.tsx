import React, { useEffect, useMemo, useState } from "react";
import Table from "rc-table";
import { useCreateUser, useUsers } from "../../hooks/users";
import { User, NewUser } from "../../hooks/types";
import styled from "styled-components";
import { MoreOptions } from "../../components/MoreOptions";
import Button from "@mui/material/Button";
import { Modal } from "./Modal";
import { UseQueryResult } from "react-query";
import { Auth } from "aws-amplify";

interface Actions {}

interface Props extends Actions {}

interface TableUser {
  user: {
    firstName: string;
    lastName: string;
  };
  email: string;
  createdAt: string;
}

type UserQuery = UseQueryResult<User[], Error>;

const useTableUsers = (query: UserQuery): TableUser[] => {
  const mapUsers = (query: UserQuery): TableUser[] => {
    if (query.isLoading) {
      return [];
    }
    if (query.isError) {
      return [];
    }
    if (!query.data) {
      return [];
    }
    return query.data.map(({ email, firstName, lastName, createdAt }) => ({
      email,
      createdAt,
      user: { firstName, lastName },
      role: "",
    }));
  };
  return useMemo<TableUser[]>(() => mapUsers(query), [query]);
};

export const Component = ({}: Props) => {
  const columns = [
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
      render: () => (
        <StyledCell>
          <a href="#">
            <MoreOptions onClick={() => {}} />
          </a>
        </StyledCell>
      ),
    },
  ];

  const [isOpen, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<{ company: string }>();

  const [createUser] = useCreateUser();
  const result = useUsers();
  const data = useTableUsers(result);

  useEffect(() => {
    const fn = async () => {
      const session = await Auth.currentSession();
      const data = session.getIdToken().payload;
      const company = data["custom:company-name"];
      setUserInfo({ company });
    };
    fn();
  }, []);

  const toggleModal = () => {
    setOpen(!isOpen);
  };

  const handleNewUser = (newUser: NewUser) => {
    createUser(newUser);
    toggleModal();
  };

  return (
    <div>
      <StyledHeader>
        <header>
          <h1>Manage Account</h1>
          <h2>
            Company: <span>{userInfo?.company}</span>{" "}
          </h2>
        </header>

        <div>
          <StyledUpgradeButton onClick={toggleModal} variant={"contained"}>
            Add User
          </StyledUpgradeButton>
        </div>
      </StyledHeader>

      <StyledTable
        columns={columns}
        data={data}
        components={components}
        tableLayout="auto"
        emptyText={"No users"}
      />
      <Modal open={isOpen} onClose={toggleModal} onSubmit={handleNewUser} />
    </div>
  );
};

export const Account = () => {
  return <Component />;
};

export const Cell = ({ alignment, children }: any) => {
  return (
    <div className={`table-cell ${alignment || ""}`}>
      <div className="table-value">{children}</div>
    </div>
  );
};

const StyledHeader = styled.div`
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

const StyledUpgradeButton = styled(Button)`
  color: var(--white1);
  background: var(--blue6);
  padding: var(--p8) var(--p16);
  text-transform: capitalize;
  font-family: ProximaNova-Semibold;

  &:hover {
    background: var(--blue7);
  }
`;

const StyledButton = styled(Button)`
  text-transform: capitalize;
  font-family: ProximaNova-Semibold;
  margin: var(--p14);
`;

const StyledCell = styled(Cell)`
  display: flex;
  justify-content: flex-start;
  align-content: center;
`;

const StyledBodyRow = styled.tr`
  .left-align {
    display: flex;
    justify-content: flex-start;
    position: relative;
    background: var(--white1);
  }
  & td {
    height: 68px;
    padding: 0;
    transition: all 0.3s;

    div.table-cell {
      box-shadow: 0 3px 6px rgb(0 0 0 / 10%), 0 10px 20px rgb(0 0 0 / 15%);
    }
    div.table-value {
      display: flex;
      position: relative;
      z-index: 1;
      align-items: center;
      justify-content: center;
      height: 54px;
      background: var(--white1);
      overflow: hidden;
      white-space: nowrap;
    }

    &:first-child div {
      justify-content: flex-start;
      border-radius: 4px 0 0 4px;
    }
    &:last-child div {
      border-radius: 0 4px 4px 0;
    }
  }

  &:hover td div.table-value {
    transform: scale(1.01);
    position: relative;
    z-index: 1;
  }
`;

const StyledImage = styled.aside`
  border-radius: 50%;
  height: var(--p32);
  width: var(--p32);
  background: var(--gray3);
  margin: 0 var(--p8);
`;

const StyledUserTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledName = styled.span`
  font-family: ProximaNova-Bold;
  font-size: var(--p14);
`;
const StyledSubtitle = styled.span`
  font-family: ProximaNova-Medium;
  font-size: var(--p12);
  color: var(--gray4);
`;
const StyledStatusIndicator = styled.aside`
  border-radius: 50%;
  height: var(--p8);
  width: var(--p8);
  background: var(--gray3);
  margin: 0 var(--p8);
  &.active {
    background: var(--green4);
  }
`;

const components = {
  body: {
    row: StyledBodyRow,
  },
};
