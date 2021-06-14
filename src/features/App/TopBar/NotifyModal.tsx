import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Star from "@material-ui/icons/Star";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import { Invite } from "./types";
import styled from "styled-components";
import { useInviteDecision } from "../../../hooks/invites";
dayjs.extend(relativeTime);

interface Props {
  open: boolean;
  invites: Invite[] | undefined;
}

export const NotifyModal = ({ invites, open }: Props) => {
  const [sortedInvites, setSortedInvites] = useState<Invite[]>();

  const [decide] = useInviteDecision();

  useEffect(() => {
    if (invites) {
      const sorted = (invites || []).sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
      setSortedInvites(sorted);
    }
  }, [invites]);

  const handleInvite = (invite: Invite, accepted: boolean) => {
    decide({ invite, accepted });
  };

  const renderDecision = (invite: Invite) => {
    return invite.accepted ? (
      <Decision className="check">
        <Check fontSize="small" />
        <span>accepted</span>
      </Decision>
    ) : (
      <Decision className="close">
        <Close fontSize="small" />
        <span>rejected</span>
      </Decision>
    );
  };

  const renderUnreadIndicator = (invite: Invite) => {
    return invite.read ? null : <UnreadIndicator />;
  };

  const renderInvites = () => {
    if (!invites || invites.length === 0) {
      return null;
    } else {
      return (
        <InviteList>
          {(sortedInvites || []).map((invite) => (
            <li key={invite.id}>
              <header>
                <aside>
                  <StyledStar fontSize="small" />
                  <h3>Team Invite</h3>
                </aside>
                {renderUnreadIndicator(invite)}
              </header>
              <p>{invite.teamName} wants you to join their team.</p>
              <div className="decision">
                {!invite.read ? (
                  <>
                    <Button
                      variant="contained"
                      onClick={() => handleInvite(invite, true)}
                      color="primary"
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      name="reject"
                      onClick={() => handleInvite(invite, false)}
                      className="opt-out"
                    >
                      Reject
                    </Button>
                  </>
                ) : (
                  renderDecision(invite)
                )}
              </div>
              <TimeAgo>about {dayjs().to(dayjs(invite.createdAt))}</TimeAgo>
            </li>
          ))}
        </InviteList>
      );
    }
  };
  if (open) {
    return (
      <NotifyContainer className="shade5">
        <Header>
          <Title>Notifications</Title>

          <StyleSettings>
            <StyledIconButton size="small">
              <MoreHoriz />
            </StyledIconButton>
          </StyleSettings>
        </Header>
        <Section>{renderInvites()}</Section>
      </NotifyContainer>
    );
  }
  return null;
};

const NotifyContainer = styled.div`
  position: absolute;
  top: var(--p64);
  right: var(--p16);
  height: 70vh;
  z-index: 3;
  width: calc(var(--p384) - var(--p16) - var(--p16));
  padding: var(--p16);
  background: var(--white1);
  border-radius: var(--p8);
`;

const Title = styled.div`
  font-family: ProximaNova-Bold;
  font-size: var(--p24);
  margin: 0 0 var(--p16);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const StyleSettings = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-self: flex-start;
  color: var(--gray6);
  cursor: pointer;
`;

const Section = styled.section`
  margin-bottom: var(--p16);
  h3 {
    font-family: ProximaNova-Semibold;
    color: var(--gray6);
  }
  .inline {
    display: flex;
    align-items: center;
    margin-bottom: var(--p16);
  }
  .inline h3 {
    margin: 0;
  }
  .inline span {
    font-family: ProximaNova-Regular;
    font-size: var(--p16);
    color: var(--gray10);
    margin-left: var(--p4);
  }
`;

const StyledIconButton = styled(IconButton)`
  padding: 0 var(--p4);
  border-radius: var(--p4);
  margin-left: var(--p4);
`;

const StyledStar = styled(Star)`
  background: var(--blue8);
  color: var(--white1);
  padding: var(--p3);
  border-radius: 50px;
`;

const InviteList = styled.ul`
  list-style: none;
  padding: 0;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  header aside {
    display: flex;
    align-items: center;
  }
  header h3 {
    font-family: ProximaNova-SemiBold;
    font-size: var(--p18);
    margin-left: var(--p8);
    color: var(--blue10);
  }
  p {
    font-family: ProximaNova-Semibold;
    font-size: var(--p16);
    margin-top: 0;
  }
  .decision {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .decision button {
    padding: var(--p4) var(--p32);
    margin-right: var(--p16);
    font-family: ProximaNova-Bold;
    font-size: var(--p16);
    text-transform: capitalize;
  }
  .opt-out {
    color: var(--gray4);
    background: var(--gray1);
    &:hover {
      color: var(--gray9);
      background: var(--gray2);
    }
  }
`;

const TimeAgo = styled.div`
  font-family: ProximaNova-Bold;
  font-size: var(--p14);
  color: var(--blue8);
  margin-top: var(--p16);
`;

const UnreadIndicator = styled.div`
  padding: var(--p6);
  border-radius: 50px;
  background: var(--blue6);
`;

const Decision = styled.div`
  display: flex;
  align-items: center;
  &.check {
    color: var(--green5);
  }
  &.close {
    color: var(--red6);
  }
  span {
    margin-left: var(--p8);
  }
`;
