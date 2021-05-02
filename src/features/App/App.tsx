import React from "react";
import { SideBar } from "../../shared/components/Sidebar";
import { Layout } from "../../shared/components/Layout";
import { Footer } from "../../shared/components/Footer";
import "./App.css";

export const App = () => {
  return (
    <div className="App">
      <SideBar />
      <div>
        <Layout />
        <Footer />
      </div>
    </div>
  );
};
