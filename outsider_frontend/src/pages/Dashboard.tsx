import React, { useContext } from "react";
import { Context } from "../App";
import { TContextType } from "../types";
import "../assets/css/Dashboard.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/imgs/logo-no-background.png";

const Dashboard: React.FC = () => {
  const { user, setUser } = useContext(Context) as TContextType;
  const navigate = useNavigate();

  return (
    <>
      <div className="dashboard">
        <div className="dashNav">
          <div className="dashNavContents">
            <div
              className="navLogo"
              onClick={() => {
                navigate("/dash");
              }}
            >
              <img src={logo} className="logo" />
            </div>
            <div className="navAccount">
              <div className="dropbtn">Hi {user?.name.split(" ")[0]}</div>
              <div className="dropdown-Content">
                <div
                  onClick={() => {
                    setUser(undefined);
                    navigate("/");
                  }}
                >
                  Log Out
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dashTabs">
          <div
            className="dashTab"
            onClick={() => {
              navigate("/bookings");
            }}
          >
            BOOKINGS
          </div>
          <div
            className="dashTab"
            onClick={() => {
              navigate("/info");
            }}
          >
            EDIT DETAILS
          </div>
        </div>
      </div>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
