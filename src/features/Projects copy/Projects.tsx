// import React from 'react';
// import Loading from '../../shared/ui/Loading';
// import Card from './Card';
// import ProjectsModal from './Modal';

// import {
//   withStyles,
//   Divider,
//   Fab,
//   Grid,
//   Typography,
//   WithStyles
// } from '@material-ui/core';
// import AddIcon from '@material-ui/icons/Add';
// import { IProject } from '../../shared/types';
// import styles from './styles';

// interface IProps extends WithStyles<typeof styles> {
//   isOpen: boolean;
//   loading: boolean;
//   projects: IProject[];
//   onClick: () => void;
//   onSubmit: () => void;
// }

// export class Projects extends React.Component<IProps> {
//   constructor(props: any) {
//     super(props);
//   }

//   renderProjectCards = () => {
//     const { projects } = this.props;
//     return projects.map((project: IProject, index: number) => (
//       <Card key={'C-0' + index} project={project} />
//     ));
//   };

//   render() {
//     const {
//       classes,
//       loading,
//       projects,
//       isOpen,
//       onClick,
//       onSubmit
//     } = this.props;

//     return (
//       <Grid data-test="component-projects" container={true} spacing={24}>
//         <Grid item={true} xs={12}>
//           <header className={classes.header}>
//             <div>
//               <Typography variant="h1" gutterBottom={true}>
//                 Projects
//               </Typography>

//               <Typography variant="h2">Manage Projects</Typography>
//             </div>
//             <Fab
//               onClick={onClick}
//               color="secondary"
//               aria-label="Add"
//               className={classes.fab}
//             >
//               <AddIcon />
//             </Fab>
//           </header>
//         </Grid>

//         <Divider className={classes.divider} variant="fullWidth" />

//         <Grid item={true} xs={12} />

//         <Grid className={classes.projects} item={true} xs={12}>
//           {loading ? (
//             <Loading />
//           ) : Object.keys(projects).length ? (
//             <div className={classes.cardList}>{this.renderProjectCards()}</div>
//           ) : null}
//         </Grid>

//         <Grid item={true} xs={12}>
//           <ProjectsModal open={isOpen} onSubmit={onSubmit} onClose={onClick} />
//         </Grid>
//       </Grid>
//     );
//   }
// }

// export default withStyles(styles)(Projects);
