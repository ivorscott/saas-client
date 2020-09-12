import React from "react";
import { Link } from "react-router-dom";
import { MenuItem } from "@material-ui/core";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "./styles";

interface Props extends WithStyles<typeof styles> {
  to: string;
  children: any;
  className?: string;
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const menulink: React.FC<Props> = ({
  classes,
  className,
  children,
  ...custom
}) => {
  return (
    <Link className={classes.menuLink} {...custom}>
      <MenuItem className={className}>{children}</MenuItem>
    </Link>
  );
};

export const MenuLink = withStyles(styles)(menulink);
