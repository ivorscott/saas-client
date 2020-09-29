import React from "react";
import { Typography } from "@material-ui/core";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { Layers, Person } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { styles } from "./styles";

interface Props extends WithStyles<typeof styles> {}

const sidebar: React.FC<Props> = ({ classes }) => (
  <div className={classes.root}>
    <div className={classes.menuTop}>
      <img alt="devpie logo" className={classes.image} src="/logo.png" />
      <div className={classes.account}>
        <Typography className={classes.app} gutterBottom={true}>
          DevPie Client
        </Typography>
      </div>
    </div>
    <ul className={classes.menu}>
      <li className={classes.divider} />
      <li className={classes.menuCell}>
        <Layers className={classes.icon} />
        <Typography variant="button" component="h2">
          <Link className={classes.cellname} to="/manage/projects">
            Projects
          </Link>
        </Typography>
      </li>
      <li className={classes.divider} />
      <li className={classes.menuCell}>
        <Person className={classes.icon} />
        <Link to="/manage/account">
          <Typography variant="button">My Account</Typography>
        </Link>
      </li>
    </ul>
  </div>
);

export const SideBar = withStyles(styles)(sidebar);
