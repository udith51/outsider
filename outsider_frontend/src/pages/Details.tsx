import React, { useContext } from "react";
import "../assets/css/Details.css";
import Hotel from "../components/Hotel";
import Banquet from "../components/Banquet";
import { useParams } from "react-router-dom";
import Cart from "../components/Cart";
import { Context } from "../App";
import { TContextType } from "../types";

const Details: React.FC = () => {
  const { showCart } = useContext(Context) as TContextType;
  const { category } = useParams();
  return (
    <>
      {showCart ? (
        <Cart />
      ) : (
        <div className="details">
          {category === "hotel" && <Hotel />}
          {category === "banquet" && <Banquet />}
        </div>
      )}
    </>
  );
};

export default Details;
