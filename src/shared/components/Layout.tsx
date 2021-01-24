import React from "react";
import { Page } from "./Page";
import { TopBar } from "./TopBar";
import Routes from "./Routes";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

const styles = createStyles({
  root: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
});

interface Props extends WithStyles<typeof styles> {}

const layout: React.FC<Props> = ({ classes }) => {
  return (
    <div data-test="component-layout" className={classes.root}>
      <TopBar />
      <Page>
        <Routes />
      </Page>
    </div>
  );
};

export const Layout = withStyles(styles)(layout);
