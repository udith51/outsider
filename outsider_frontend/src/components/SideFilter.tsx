import React, { useContext, useState, useEffect } from "react";
import "../assets/css/Sidebar.css";
import { Context } from "../App";
import { TContextType } from "../types";
import {
  banquetAmenities,
  cateringAmenities,
  hotelAmenities,
} from "../lib/utils";

export default function SideFilter() {
  const { assured, setAssured, activeTab, search, setSearch, setRqdAmenities } =
    useContext(Context) as TContextType;

  var am = new Array(11).fill("amenity");
  const [amenityArr, setAmenityArr] = useState<string[]>(am);
  const [amenities, setAmenities] = useState<string[]>([]);

  useEffect(() => {
    if (activeTab === "hotel") setAmenities(hotelAmenities);
    else if (activeTab === "catering") setAmenities(cateringAmenities);
    else if (activeTab === "banquet") setAmenities(banquetAmenities);
    setAmenityArr(am);
    setRqdAmenities([]);
  }, [activeTab]);
  return (
    <div>
      <div className="sideAmenitiesTab">
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
                  setRqdAmenities((amts) => {
                    var tempAmm = amts.slice();
                    if (tempAmm.find((t) => t === amenity)) {
                      return tempAmm.filter((t) => {
                        return t !== amenity;
                      });
                    }
                    return [...amts, amenity];
                  });
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
}
