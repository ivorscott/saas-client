import React, { useState } from "react";
import Table from 'rc-table';
import { useQuery } from "react-query";
import { UserPayload } from "../../services/types";
import { client } from "../../services/APIService";
import styled from "styled-components";
import {MoreOptions} from "../../components/MoreOptions";
import Button from "@mui/material/Button";

interface Actions {}

interface Props extends Actions {}

export const Component = ({}: Props) => {

    const columns = [
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            width: 200,
            render: (value:any, _:any, index:number) => (
                <StyledCell>
                    <StyledImage/>
                    <StyledUserTitle>
                        <StyledName>{value}</StyledName>
                        <StyledSubtitle>Subtitle</StyledSubtitle>
                    </StyledUserTitle>
                </StyledCell>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (value:any) => <StyledCell alignment="left-align"><StyledStatusIndicator className="active"/><p>{value}</p></StyledCell>,
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            width: 200,
            render: (value:any) => <StyledCell>{value}</StyledCell>,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            width: 200,
            render: (value:any) => <StyledCell>{value}</StyledCell>,
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
            key: 'contact',
            width: 200,
            render: () => <StyledCell><StyledButton variant={"contained"}>Contact</StyledButton></StyledCell>,
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            width: 100,
            render: () => <StyledCell><a href="#"><MoreOptions onClick={()=>{}} /></a></StyledCell>,
        },
    ];

    const data = [
        { user: 'Daniel Bradford', status: "Available", location: 'United States', phone: "+1 222 222 2222", key: '1' },
        { user: 'Adam Smith', status: "Available", location: 'United States', phone: "+1 333 333 3333", key: '2' },
        { user: 'Laura Mills', status: "Unavailable", location: 'United States', phone: "+1 444 444 4444", key: '3' },
    ];

  return (
    <div>
      <StyledHeader>
        <h1>Manage Account</h1>
          <div>
              <StyledUpgradeButton variant={"contained"}>Add User</StyledUpgradeButton>
          </div>
      </StyledHeader>

        <StyledTable
            columns={columns}
            data={data}
            components={components}
            tableLayout="auto"
            emptyText={"No users"}
        />
    </div>
  );
};

export const Account = () => {
  const { data: user } = useQuery<UserPayload>(
    "auth",
    async () => await client.get("/users/me")
  );

  return (
    <Component />
  );
};

export const Cell = ({alignment, children}:any) => {
    return (
            <div className={`table-cell ${alignment || ""}`}>
                <div className="table-value">{children}</div>
            </div>
        )
}

const StyledHeader = styled.header`
    display: flex;
    max-width: 62.5rem;
    justify-content: space-between;
    div {
        display: flex;
        align-self: end;
    }
`

const StyledTable = styled(Table)`
    margin: var(--p48) 0;
    th {
        font-family: ProximaNova-Extrabold;
        font-size: var(--p12);
        color: var(--gray7);
    }
`

const StyledUpgradeButton = styled(Button)`
    color: var(--white1);
    background: var(--blue6);
    padding: var(--p8) var(--p16);
    text-transform: capitalize;
    font-family: ProximaNova-Semibold;
    
    &:hover {
        background: var(--blue7);
    }
`

const StyledButton = styled(Button)`
    text-transform: capitalize;
    font-family: ProximaNova-Semibold;
    margin: var(--p14);
`;

const StyledCell = styled(Cell)`
    display: flex;
    justify-content: flex-start;
    align-content: center;
`

const StyledBodyRow = styled.tr`
    .left-align {
        display: flex;
        justify-content: flex-start;
        position: relative;
        background: var(--white1);

    }
  & td {
    height: 68px;
    padding:0;
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
`

const StyledName= styled.span`
    font-family: ProximaNova-Bold;
    font-size: var(--p14);
`
const StyledSubtitle= styled.span`
    font-family: ProximaNova-Medium;
    font-size: var(--p12);
    color: var(--gray4);
`
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

