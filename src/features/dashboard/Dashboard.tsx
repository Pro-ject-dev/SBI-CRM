import React from "react";

interface DashboardProps {
  title: string;
  children: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ title, children }) => {
  return <>{children}</>;
};

export default Dashboard;
