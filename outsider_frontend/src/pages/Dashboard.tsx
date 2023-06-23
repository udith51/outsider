import React, { useContext, useEffect } from "react";
import { Context } from "../App";
import { TContextType } from "../types";

const Dashboard: React.FC = () => {
  const { setPath } = useContext(Context) as TContextType;

  useEffect(() => {
    setPath("none");
    return () => {
      setPath("");
    };
  });
  return <div>Dashboard</div>;
};

export default Dashboard;
