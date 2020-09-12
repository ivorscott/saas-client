import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Account } from "./Account";
import { NoMatch } from "./NoMatch";
import { Project } from "./Project";
import { Projects } from "./Projects";

const Routes: React.FC = () => (
  <Switch>
    <Route
      exact={true}
      path="/"
      render={() => <Redirect to={`/manage/projects`} />}
    />

    <Route exact={true} path="/manage/account" component={Account} />
    <Route exact={true} path="/manage/projects" component={Projects} />
    <Route path="/manage/projects/:id" component={Project} />

    <Route component={NoMatch} />
  </Switch>
);

export default Routes;
