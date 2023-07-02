import React from "react";
import "../assets/css/Details.css";
import Hotel from "../components/Hotel";
import Banquet from "../components/Banquet";

const Details: React.FC = () => {
  return (
    <div className="details">
      <Hotel />
      {/* <Banquet /> */}
    </div>
  );
};

export default Details;
