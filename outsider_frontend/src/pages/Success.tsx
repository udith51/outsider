import React, { useEffect } from "react";
import "../assets/css/Success.css";
import { BsBagCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { runFireworks } from "../lib/utils";

const Success: React.FC = () => {
  useEffect(() => {
    runFireworks();
  }, []);
  return (
    <div className="success">
      <div className="successWrapper">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank You for using Outsider.</h2>
        <div className="description">
          Details of your booking have been sent to respective providers. They
          will contact your soon through email.
        </div>
        <Link to="/">
          <button type="button" className="successBtn">
            Continue Browsing
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
