import { SelectedProject } from "./Project";
import { Project as ProjectType } from "./types";
export { actions, createProject, reducer as projectReducer } from "./reducer";
export type Project = ProjectType;
export default SelectedProject;
