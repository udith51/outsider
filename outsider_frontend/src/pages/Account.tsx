import React, { useEffect, useState, useContext } from "react";
import "../assets/css/Account.css";
import Registration from "../components/Registration";
import Login from "../components/Login";
import { Context } from "../App";
import { TContextType } from "../types";

const Account: React.FC = () => {
  const { setPath, accMode, userType, setUserType } = useContext(
    Context
  ) as TContextType;

  useEffect(() => {
    setPath("none");
    setUserType("provider");
    return () => {
      setPath("");
    };
  }, []);

  return (
    <div className="account">
      <div className="bgImg"></div>

      <div className="accContents">
        <div className="accTab">
          <div
            className={userType === "provider" ? "provider-active" : "provider"}
            onClick={() => {
              setUserType("provider");
            }}
          >
            Provider
          </div>

          <div
            className={userType === "customer" ? "customer-active" : "customer"}
            onClick={() => {
              setUserType("customer");
            }}
          >
            Customer
          </div>
        </div>

        <div className="accForm">
          {accMode === "signup" ? <Registration /> : <Login />}
        </div>
      </div>
    </div>
  );
};

export default Account;
