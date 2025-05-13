import React from "react";

interface DashboardProps {
  title: string;
  children: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ title, children }) => {
  console.log(title);
  return <>{children}</>;
};

export default Dashboard;
