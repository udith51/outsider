import React, { useContext, useEffect, useRef } from "react";
import "../assets/css/Details.css";
import Hotel from "../components/Hotel";
import Banquet from "../components/Banquet";
import { useParams } from "react-router-dom";
import Cart from "../components/Cart";
import { Context } from "../App";
import { TContextType } from "../types";
import Navbar from "../components/Navbar";

const Details: React.FC = () => {
  const { showCart } = useContext(Context) as TContextType;

  const { category } = useParams();

  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (showCart) {
      ref.current?.classList.add("ovHidden");
    } else {
      ref.current?.classList.remove("ovHidden");
    }
  }, [showCart]);

  return (
    <>
      <Navbar />
      <div
        className="details"
        ref={ref as React.MutableRefObject<HTMLDivElement>}
      >
        {category === "hotel" && <Hotel />}
        {category === "banquet" && <Banquet />}
      </div>
      {showCart && <Cart />}
    </>
  );
};

export default Details;
