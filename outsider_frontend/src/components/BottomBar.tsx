import React, { useContext, useEffect, useState } from "react";
import "../assets/css/Bottombar.css";
import { MdHotel } from "react-icons/md";
import { BiHomeHeart } from "react-icons/bi";
import { IoFastFood } from "react-icons/io5";
import { Context } from "../App";
import { TContextType } from "../types";
import { useNavigate } from "react-router-dom";
import {
  banquetAmenities,
  cateringAmenities,
  hotelAmenities,
} from "../lib/utils";

export default function BottomBar() {
  const navigate = useNavigate();
  const { activeTab, setActiveTab, assured, setAssured, setRqdAmenities } =
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

  const handleTab = (tab: string) => {
    setActiveTab(tab);
    navigate("/");
  };
  const toggleAssured = () => {
    setAssured((prev) => !prev);
  };

  const [showFilter, setShowFilter] = useState(false);

  return (
    <>
      <div className="bottomBar">
        <div
          className={`btmLeft ${assured && "activeBar"}`}
          onClick={toggleAssured}
        >
          Outsider Assured
        </div>
        <div className="btmMid">
          <div className="icns">
            <MdHotel
              className={`w26 h26 icn ${
                activeTab === "hotel" ? "activeTab" : ""
              }`}
              onClick={() => {
                setActiveTab("hotel");
              }}
            />
            <IoFastFood
              className={`w26 h26 icn ${
                activeTab === "catering" ? "activeTab" : ""
              }`}
              onClick={() => {
                setActiveTab("catering");
              }}
            />
            <BiHomeHeart
              className={`w26 h26 icn ${
                activeTab === "banquet" ? "activeTab" : ""
              }`}
              onClick={() => {
                setActiveTab("banquet");
              }}
            />
          </div>
        </div>
        <div
          className="btmRight"
          onClick={() => {
            setShowFilter((p) => !p);
          }}
        >
          Filter
        </div>
      </div>
      {showFilter && (
        <div className="filterTab">
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
      )}
    </>
  );
}
