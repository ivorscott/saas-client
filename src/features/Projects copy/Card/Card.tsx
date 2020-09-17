// import React from 'react';

// import { Button, WithStyles } from '@material-ui/core';
// import { withStyles, Paper, Typography } from '@material-ui/core';
// import { Link } from 'react-router-dom';
// import { IProject } from '../../../shared/types';
// import styles from './styles';

// interface IActions {
//   onClick: () => void;
// }

// interface IProps extends WithStyles<typeof styles>, IActions {
//   project: IProject;
// }

// export class ProjectsCard extends React.Component<IProps> {
//   constructor(props: IProps) {
//     super(props);
//   }

//   render() {
//     const { classes, project, onClick } = this.props;

//     return (
//       <Link
//         data-test="component-projects-card"
//         onClick={onClick}
//         className={classes.projectLink}
//         key={project.id}
//         to={`/manage/projects/${project.id}`}
//       >
//         <Paper className={classes.project}>
//           <Typography className={classes.title} variant="h4">
//             <strong>{project.name}</strong>
//           </Typography>
//         </Paper>
//       </Link>
//     );
//   }
// }

// export default withStyles(styles)(ProjectsCard);
