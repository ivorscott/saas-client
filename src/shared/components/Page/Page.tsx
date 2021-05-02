import React from "react";

interface PageProps {
  children: any;
}

export const Page = ({ children }: PageProps) => <div>{children}</div>;
