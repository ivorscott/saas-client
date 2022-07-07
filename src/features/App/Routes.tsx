import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Loader } from "../../components/Loader";
const Account = lazy(() => import("../Account"));
const NoMatch = lazy(() => import("../NoMatch"));
const Projects = lazy(() => import("../Projects"));
const SelectedProject = lazy(() => import("../Project"));

const AppRoutes: React.FC = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <Routes>
        <Route path="manage">
          <Route path="account" element={<Account />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<SelectedProject />} />
        </Route>
        <Route path="/" element={<Navigate to={`/manage/projects`} />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;
