import PushPinIcon from "@mui/icons-material/PushPin";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { Loader } from "components/Loader";
import { assignColor, getOrgs, getPinState, orderBy } from "helpers/helpers";
import { useTenantMap } from "hooks/users";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePinned } from "services/PinnedProvider";
import { PinnedProject, Project } from "types/project";

interface Props {
  project: Project;
}

export const Card = ({ project }: Props) => {
  const [pinState, setPinState] = useState(getPinState(project));
  const { isLoading, isError, data: tmap } = useTenantMap();
  const { pinned, setPinned } = usePinned();

  if (isLoading || isError || !tmap) {
    return <Loader />;
  }

  const orgs = orderBy("company", getOrgs(tmap)).map(assignColor);
  const org = (orgs || []).find((org) => org.id === project.tenantId);

  const handlePin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!org) {
      return;
    }

    const isPinned = !!pinned.find(
      (p: PinnedProject) => p.projectId === project.id
    );

    if (isPinned) {
      const updatedPins = pinned.filter((p) => p.projectId !== project.id);
      localStorage.setItem("settings.pinned", JSON.stringify(updatedPins));
      setPinned(updatedPins);
      setPinState(false);
    } else {
      const updatedPins = [
        ...pinned,
        {
          name: project.name,
          projectId: project.id,
          tenantPath: org.path,
        },
      ];

      localStorage.setItem("settings.pinned", JSON.stringify(updatedPins));
      setPinned(updatedPins);
      setPinState(true);
    }
  };

  const path = tmap[project.tenantId].path;
  const link = `/${path}/projects/${project.id}`;

  if (!org) {
    return <></>;
  }

  return (
    <StyledCard className="shade2">
      <Link key={project.id} to={link}>
        <div className={`color-tip ${org.color}`} />
        <CardHeader>
          <div className="header">
            <CardTitle>{project.name}</CardTitle>
            <CardSubtitle>Developed by {org.name}</CardSubtitle>
          </div>
          <div>
            <IconButton onClick={(e) => handlePin(e)}>
              <PushPinIcon
                color={pinState ? "secondary" : "disabled"}
                fontSize="small"
              />
            </IconButton>
          </div>
        </CardHeader>
        <CardBody>
          <CardText>{project.description}</CardText>
        </CardBody>
      </Link>
    </StyledCard>
  );
};

const StyledCard = styled("div")`
  width: var(--p256);
  height: var(--p192);
  margin: 0 var(--p16) var(--p16) 0;
  background: var(--white1);
  border-radius: 4px;
  text-transform: capitalize;
  position: relative;
  transition: transform 0.3s ease-out;
  &:hover {
    transform: translate(0, -8px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 3px 6px rgba(0, 0, 0, 0.15);
  }
  a {
    display: flex;
    flex: 0 1 calc(25% - var(--p16));
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
    font-size: var(--p16);
    text-decoration: none;
    color: var(--primary);
  }
  .color-tip {
    height: var(--p8);
    width: 100%;
    border-radius: 4px 4px 0 0;
  }

  /* mobile first */
  @media only screen and (max-width: 600px) {
    width: 100%;
    margin-right: 0;
  }
`;

const CardHeader = styled("div")`
  width: 100%;
  min-height: 82px;
  padding: var(--p16);
  box-sizing: border-box;
  border-bottom: 1px solid var(--gray1);
  display: flex;
  justify-content: space-between;
  .header {
  }
`;
const CardBody = styled("div")`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  height: calc(100% - var(--p16) - var(--p16)- var(--p8));
  width: 100%;
  padding: var(--p16);
  box-sizing: border-box;
`;

const CardTitle = styled("h2")`
  font-family: ProximaNova-Bold;
  font-size: var(--p16);
  margin-top: 0;
`;

const CardSubtitle = styled("p")`
  font-family: ProximaNova-Regular;
  font-size: var(--p12);
  margin: 0;
`;

const CardText = styled("p")`
  font-family: ProximaNova-Regular;
  font-size: var(--p12);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;
