import { Project as ProjectType } from "./reducer";
export { Projects } from "./Projects";
export {
  actions,
  createProject,
  fetchProjects,
  reducer as projectsReducer,
} from "./reducer";

export type Project = ProjectType;
