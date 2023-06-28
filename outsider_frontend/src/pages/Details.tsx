import React from "react";
import "../assets/css/Details.css";
import Hotel from "../components/Hotel";
import Navbar from "../components/Navbar";

const Details: React.FC = () => {
  return (
    <div className="details">
      <Hotel />
    </div>
  );
};

export default Details;
