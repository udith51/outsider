import React, { useState } from "react";
import "../assets/css/Navbar.css";
import { GiPartyFlags } from "react-icons/gi";
import { MdHotel } from "react-icons/md";
import { IoFastFood } from "react-icons/io5";
import { BiHomeHeart } from "react-icons/bi";
import { BsBusFrontFill } from "react-icons/bs";

const Navbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<String>("tab1");

  return (
    <div className="navbar">
      <div className="navContents">
        <div className="navLogo">Logo</div>
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
          <div className="navPrime">Join Outsider Prime</div>
          <div className="navAccount">
            <div className="dropbtn">My Account</div>
            <div className="dropdown-content">
              <a href="/">Sign Up</a>
              <a href="/">Login</a>
            </div>
          </div>
          <div className="navSupport">Support</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
