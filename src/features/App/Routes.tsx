import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Account } from "../Account";
import { NoMatch } from "./NoMatch";
import { Projects } from "../Projects";
import { SelectedProject } from "../Project";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route
        exact={true}
        path="/"
        render={() => <Redirect to={`/manage/projects`} />}
      />

      <Route exact={true} path="/manage/account" component={Account} />
      <Route exact={true} path="/manage/projects" component={Projects} />
      <Route path="/manage/projects/:id" component={SelectedProject} />

      <Route component={NoMatch} />
    </Switch>
  );
};

export default Routes;
