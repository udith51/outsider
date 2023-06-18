import React, { useState, useContext } from "react";
import "../assets/css/Navbar.css";
import { GiPartyFlags } from "react-icons/gi";
import { MdHotel } from "react-icons/md";
import { IoFastFood } from "react-icons/io5";
import { BiHomeHeart } from "react-icons/bi";
import { BsBusFrontFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Context } from "../App";
import { TContextType } from "../types";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const { setAccMode } = useContext(Context) as TContextType;

  const [activeTab, setActiveTab] = useState<String>("tab1");

  const handleAccount = (mode: string) => {
    setAccMode(mode);
    navigate("/account");
  };

  return (
    <div className="navbar">
      <div className="navContents">
        <div
          className="navLogo"
          onClick={() => {
            navigate("/");
          }}
        >
          Logo
        </div>

        <div className="navIcons">
          <div
            className={activeTab === "tab1" ? "navActive" : "navIcon"}
            onClick={() => {
              setActiveTab("tab1");
            }}
          >
            <GiPartyFlags className="w32 h32" />
            <span>Decors</span>
          </div>

          <div
            className={activeTab === "tab2" ? "navActive" : "navIcon"}
            onClick={() => {
              setActiveTab("tab2");
            }}
          >
            <MdHotel className="w32 h32" />
            <span>Hotel</span>
          </div>

          <div
            className={activeTab === "tab3" ? "navActive" : "navIcon"}
            onClick={() => {
              setActiveTab("tab3");
            }}
          >
            <IoFastFood className="w32 h32" />
            <span>Food</span>
          </div>

          <div
            className={activeTab === "tab4" ? "navActive" : "navIcon"}
            onClick={() => {
              setActiveTab("tab4");
            }}
          >
            <BiHomeHeart className="w32 h32" />
            <span>Banquet</span>
          </div>

          <div
            className={activeTab === "tab5" ? "navActive" : "navIcon"}
            onClick={() => {
              setActiveTab("tab5");
            }}
          >
            <BsBusFrontFill className="w32 h32" />
            <span>Travel</span>
          </div>
        </div>

        <div className="navRight">
          <div
            className="navPrime"
            onClick={() => {
              navigate("/prime");
            }}
          >
            JOIN PRIME
          </div>

          <div className="navAccount">
            <div className="dropbtn">My Account</div>
            <div className="dropdown-content">
              <div
                onClick={() => {
                  handleAccount("signup");
                }}
              >
                Sign Up
              </div>
              <div
                onClick={() => {
                  handleAccount("login");
                }}
              >
                Login
              </div>
            </div>
          </div>

          <div
            className="navSupport"
            onClick={() => {
              navigate("/support");
            }}
          >
            Support
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
