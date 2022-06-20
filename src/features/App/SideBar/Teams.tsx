import React from "react";
import styled from "styled-components";
import { useProjects } from "../../../hooks/project";
import { useTeams } from "../../../hooks/teams";
import { TeamProjects } from "./Projects";
import { Team } from "../../Project/types";

export const Teams = () => {
  const projects = useProjects();
  const { data } = useTeams();

  if (!data || data.length === 0) {
    return null;
  }

  const badgeColor = (index: number) => (index % 9) + 4;

  return (
    <div>
      <Title>Teams</Title>
      <StyledTeams>
        {data.map((team: Team, index) => (
          <li key={team.id}>
            <TeamRow>
              <aside>
                <div className="team">
                  <Icon className={`badge${badgeColor(index)}`}></Icon>
                  <span>{team.name}</span>
                </div>
              </aside>
            </TeamRow>

            {projects.data && (
              <TeamProjects teamId={team.id} projects={projects.data} />
            )}
          </li>
        ))}
      </StyledTeams>
    </div>
  );
};

const StyledTeams = styled.ul`
  padding: 0;
  li {
    padding: var(--p8) var(--p24);
  }
`;

const Title = styled.h3`
  color: var(--gray3);
  font-family: ProximaNova-Light;
  font-size: 14px;
  font-weight: normal;
  padding: 0 var(--p24);
  margin-top: var(--p32);
`;

const TeamRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  aside {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  .team {
    display: flex;
    align-items: center;
  }

  span {
    font-family: ProximaNova-Light;
    text-transform: capitalize;
    font-size: var(--p12);
    color: var(--gray7);
  }
`;

const Icon = styled.div`
  height: var(--p24);
  width: var(--p24);
  border-radius: var(--p4);
  margin-right: var(--p8);
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--p12);
  color: var(--gray7);
`;
