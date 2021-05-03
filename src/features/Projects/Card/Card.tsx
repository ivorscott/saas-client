import React from "react";
import { Link } from "react-router-dom";
import { Project } from "../../Project";
import { useDispatch } from "react-redux";
import { actions } from "../../Project";
import styled from "styled-components";

const { setProject } = actions;

interface ParentProps {
  project: Project;
}

interface Props {
  project: Project;
  onClick: () => void;
}

const StyledCard = styled.div`
  width: var(--p200);
  background: var(--white1);
  height: var(--p100);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  a {
    font-family: ProximaNova-Bold;
    font-size: var(--p18);
    text-decoration: none;
    padding: var(--p16);
    color: var(--primary);
  }
`;

const Component = ({ project, onClick }: Props) => {
  return (
    <StyledCard className="shade2">
      <Link
        onClick={onClick}
        key={project.id}
        to={`/manage/projects/${project.id}`}
      >
        <p>
          <strong>{project.name}</strong>
        </p>
      </Link>
    </StyledCard>
  );
};

const Card = ({ project }: ParentProps) => {
  const dispatch = useDispatch();
  const handleSetProject = () => dispatch(setProject(project));
  return <Component onClick={handleSetProject} project={project} />;
};

export { Card };
