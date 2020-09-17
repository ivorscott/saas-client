// import React from 'react';
// import Card from './Card';

// import { connect } from 'react-redux';
// import { bindActionCreators, Dispatch } from 'redux';
// import { handleSetProject } from '../../../redux';
// import { IProject } from '../../../shared/types';

// export interface IActions {
//   handleSetProject: (project: IProject) => void;
// }

// export interface IProps extends IActions {
//   project: IProject;
// }

// export class CardContainer extends React.Component<IProps> {
//   constructor(props: IProps) {
//     super(props);
//   }

//   handleSetProject = () => {
//     this.props.handleSetProject(this.props.project);
//   };

//   render() {
//     return (
//       <Card onClick={this.handleSetProject} project={this.props.project} />
//     );
//   }
// }

// function mapDispathToProps(dispatch: Dispatch) {
//   return bindActionCreators({ handleSetProject }, dispatch);
// }

// export default connect(
//   null,
//   mapDispathToProps
// )(CardContainer);
