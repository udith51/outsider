import React, { useEffect } from "react";
import "../assets/css/Details.css";
import Hotel from "../components/Hotel";
import Banquet from "../components/Banquet";
import { useParams } from "react-router-dom";

const Details: React.FC = () => {
  const { category } = useParams();
  return (
    <div className="details">
      {category === "hotel" && <Hotel />}
      {category === "banquet" && <Banquet />}
    </div>
  );
};

export default Details;
