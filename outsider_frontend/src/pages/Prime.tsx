import React from "react";
import Navbar from "../components/Navbar";
import "../assets/css/Prime.css";

const Prime: React.FC = () => {
  return (
    <div className="primeScreen">
      <Navbar />
      <div className="prime">
        <div className="primeBox">
          <h1 className="primeHead">Welcome to Outsider Prime!</h1>
          <p className="primeBody">
            Elevate your events with prime services—stellar suggestions and
            lightning-fast solutions guaranteed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Prime;
