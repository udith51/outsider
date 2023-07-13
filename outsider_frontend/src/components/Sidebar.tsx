import React, { useContext, useEffect, useState } from "react";
import "../assets/css/Sidebar.css";
import { Context } from "../App";
import { TContextType } from "../types";
import {
  banquetAmenities,
  cateringAmenities,
  hotelAmenities,
} from "../lib/utils";

const Sidebar: React.FC = () => {
  const { assured, setAssured, activeTab, search, setSearch } = useContext(
    Context
  ) as TContextType;

  var am = new Array(11).fill("amenity");
  const [amenityArr, setAmenityArr] = useState<string[]>(am);
  const [amenities, setAmenities] = useState<string[]>([]);

  useEffect(() => {
    if (activeTab === "hotel") setAmenities(hotelAmenities);
    else if (activeTab === "catering") setAmenities(cateringAmenities);
    else if (activeTab === "banquet") setAmenities(banquetAmenities);
    setAmenityArr(am);
  }, [activeTab]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "search") {
      setSearch(e.target.value);
    } else if (e.target.name === "assured") {
      setAssured((prev) => !prev);
    }
  };

  return (
    <div className="sideBar">
      <div className="sideSearch">
        <input
          type="text"
          name="search"
          id="search"
          onChange={handleChange}
          value={search}
          placeholder="Search by name or city"
        />
      </div>

      <div className="sideAssured">
        <div className="">Outsider Assured</div>
        <input
          type="checkbox"
          className="checkbox"
          name="assured"
          id="assured"
          checked={assured}
          onChange={handleChange}
        />
      </div>

      <div className="sideAmenities">
        <div className="">Amenities</div>
        <div className="sideAmenity">
          {amenities.map((amenity, index) => {
            return (
              <div
                key={index}
                className={amenityArr[index]}
                onClick={() => {
                  var temp = amenityArr.slice();
                  temp[index] =
                    temp[index] === "amenity" ? "activeAmenity" : "amenity";
                  setAmenityArr(temp);
                }}
              >
                {amenity}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
