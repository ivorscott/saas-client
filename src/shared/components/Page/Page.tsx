import React from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "./styles";

interface PageProps extends WithStyles<typeof styles> {
  classes: any;
  children: any;
}

const page: React.FC<PageProps> = ({ classes, children }) => (
  <div className={classes.root}>{children}</div>
);

export const Page = withStyles(styles)(page);
