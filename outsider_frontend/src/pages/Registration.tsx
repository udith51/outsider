import React, { useEffect, useState } from "react";
import "../assets/css/Registration.css";
import ProviderRegistration from "../components/ProviderRegistration";
import Login from "../components/Login";
import { act } from "@testing-library/react";

const Registration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("provider");
  return (
    <div className="registration">
      <div className="bgImg"></div>

      <div className="regContents">
        <div className="regTab">
          <div
            className={
              activeTab === "provider" ? "provider-active" : "provider"
            }
            onClick={() => {
              setActiveTab("provider");
            }}
          >
            Provider
          </div>
          <div
            className={
              activeTab === "customer" ? "customer-active" : "customer"
            }
            onClick={() => {
              setActiveTab("customer");
            }}
          >
            Customer
          </div>
        </div>
        <div className="regForm">
          <ProviderRegistration />
          {/* <Login /> */}
        </div>
      </div>
    </div>
  );
};

export default Registration;
