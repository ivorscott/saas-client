import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Loading } from "../../shared/components/Loading";
const Account = lazy(() => import("../Account"));
const NoMatch = lazy(() => import("../NoMatch"));
const Projects = lazy(() => import("../Projects"));
const SelectedProject = lazy(() => import("../Project"));

const Routes: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route
          exact={true}
          path="/"
          render={() => <Redirect to={`/manage/projects`} />}
        />
        <Route exact path="/manage/account" component={Account} />
        <Route exact path="/manage/projects" component={Projects} />
        <Route path="/manage/projects/:id" component={SelectedProject} />
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default Routes;
