import React, { useState, useContext, useEffect } from "react";
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

  const { activeTab, setActiveTab, setAccMode, setShowCart, user, setUser } =
    useContext(Context) as TContextType;

  const handleAccount = (mode: string) => {
    setAccMode(mode);
    navigate("/account");
  };

  const handleCart = () => {
    setShowCart(true);
  };
  const handleTab = (tab: string) => {
    setActiveTab(tab);
    navigate("/");
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
          {/* <div
            className={activeTab === "decors" ? "navActive" : "navIcon"}
            onClick={() => {
              setActiveTab("decors");
            }}
          >
            <GiPartyFlags className="w32 h32" />
            <span>Decors</span>
          </div> */}

          <div
            className={activeTab === "hotel" ? "navActive" : "navIcon"}
            onClick={() => {
              handleTab("hotel");
            }}
          >
            <MdHotel className="w32 h32" />
            <span>Hotel</span>
          </div>

          <div
            className={activeTab === "catering" ? "navActive" : "navIcon"}
            onClick={() => {
              handleTab("catering");
            }}
          >
            <IoFastFood className="w32 h32" />
            <span>Catering</span>
          </div>

          <div
            className={activeTab === "banquet" ? "navActive" : "navIcon"}
            onClick={() => {
              handleTab("banquet");
            }}
          >
            <BiHomeHeart className="w32 h32" />
            <span>Banquet</span>
          </div>

          {/* <div
            className={activeTab === "travel" ? "navActive" : "navIcon"}
            onClick={() => {
              setActiveTab("travel");
            }}
          >
            <BsBusFrontFill className="w32 h32" />
            <span>Travel</span>
          </div> */}
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
          {!user ? (
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
          ) : (
            <div className="navAccount">
              <div className="dropbtn">Hi {user.name.split(" ")[0]}</div>
              <div className="dropdown-content">
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
          )}

          <div
            className="navSupport"
            onClick={() => {
              navigate("/support");
            }}
          >
            Support
          </div>
          {user?.userType === "customer" && (
            <div className="navCart" onClick={handleCart}>
              {" "}
              My Cart
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
