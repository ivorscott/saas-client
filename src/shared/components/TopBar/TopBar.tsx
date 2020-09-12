import React from "react";
import { Typography, Paper, withStyles, WithStyles } from "@material-ui/core";
import { Layers } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { UserMenu } from "../UserMenu";
import { styles } from "./styles";

interface Props extends WithStyles<typeof styles> {}

const topBar: React.FC<Props> = ({ classes }) => {
  return (
    <>
      <Paper className={classes.root}>
        <div className={classes.brandWrapper}>
          <Link className={classes.navLink} to="/manage/projects">
            <Typography className={classes.brand} variant="h3">
              DevPie
            </Typography>
          </Link>
        </div>
        <div className={classes.search} />
        <menu className={classes.menu}>
          <UserMenu />
        </menu>
      </Paper>
      <Paper className={classes.navMenu}>
        <ul className={classes.nav}>
          <li className={classes.navItem}>
            <Layers className={classes.navIcon} />
            <Link className={classes.navLink} to="/manage/projects">
              <Typography className={classes.navText} variant="button">
                Projects
              </Typography>
            </Link>
          </li>
        </ul>
      </Paper>
    </>
  );
};

export const TopBar = withStyles(styles)(topBar);
