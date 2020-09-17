// import { orderBy } from 'lodash/fp';
// import React from 'react';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// import { RouteComponentProps } from 'react-router-dom';
// import { handleAddProject, receiveProjects } from '../../redux';
// import { IProject } from '../../shared/types';
// import Projects from './Projects';

// export interface IActions {
//   receiveProjects: () => IProject[];
//   handleAddProject: (name: string) => any;
// }

// export interface IProps extends IActions, RouteComponentProps<any> {
//   isOpen: boolean;
//   loading: boolean;
//   projects: IProject[];
// }

// export interface IState {
//   open: boolean;
// }

// export class ProjectsContainer extends React.Component<IProps, IState> {
//   constructor(props: IProps) {
//     super(props);

//     this.state = {
//       open: false
//     };
//   }

//   async componentDidMount() {
//     this.props.receiveProjects();
//   }

//   handleNewProject = async (name: string) => {
//     const { history } = this.props;
//     const { id }: IProject = name && (await this.props.handleAddProject(name));
//     id && history.push(`/manage/projects/${id}`);
//   };

//   toggleModal = () => {
//     this.setState(({ open }) => ({
//       open: !open
//     }));
//   };

//   render() {
//     const { loading, projects } = this.props;
//     const { open } = this.state;
//     return (
//       <Projects
//         isOpen={open}
//         onClick={this.toggleModal}
//         onSubmit={this.handleNewProject}
//         projects={orderBy<IProject>(['name'])('asc')(projects)}
//         loading={loading}
//       />
//     );
//   }
// }

// function mapStateToProps(state: any): any {
//   return {
//     loading: state.loading,
//     projects: state.projects.items
//   };
// }

// const withData = connect(
//   mapStateToProps,
//   { receiveProjects, handleAddProject }
// );

// export default withRouter(withData(ProjectsContainer));
