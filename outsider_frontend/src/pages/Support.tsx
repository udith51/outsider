import React from "react";
import Navbar from "../components/Navbar";
import "../assets/css/Support.css";

const Support: React.FC = () => {
  return (
    <div className="supportScreen">
      <Navbar />
      <div className="support">
        <div className="supportBox">
          <p className="supportBody">
            For any support and queries, contact{" "}
            <span className="nowrap">011 2424 2424</span> from Mon-Fri between
            10a.m. to 6p.m.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Support;
