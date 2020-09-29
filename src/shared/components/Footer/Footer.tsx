import { withStyles, WithStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { Copyright } from "@material-ui/icons";
import React from "react";
import styles from "./styles";

interface Props extends WithStyles<typeof styles> {}

const footer: React.FC<Props> = ({ classes }) => (
  <Paper className={classes.appFooter}>
    <Copyright className={classes.copy} /> <span>Powered by DevPie</span>
  </Paper>
);

export const Footer = withStyles(styles)(footer);
