import React, { useContext, useState, useEffect } from "react";
import { TContextType, TInfoProvider } from "../types";
import "../assets/css/Item.css";
import { HiLocationMarker } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { Context } from "../App";
import { useNavigate } from "react-router-dom";

interface ItemProps {
  item: TInfoProvider;
}

const Item: React.FC<ItemProps> = ({ item }) => {
  const { activeTab } = useContext(Context) as TContextType;
  const [price, setPrice] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === "hotel") setPrice(item.standardAmt as number);
    else if (activeTab === "banquet") setPrice(item.price as number);
    else if (activeTab === "catering") setPrice(item.basicAmt as number);
  }, []);

  const handleClick = () => {
    navigate(`/${activeTab}/${item._id}`);
  };
  return (
    <div className="item">
      <div className="itemImg"></div>
      <div className="sb">
        <div className="itemInfo">
          <div className="itemLeft">
            <div className="itemName">{item.name}</div>
            <div className="itemLocation">
              <>
                <HiLocationMarker />
              </>
              <>
                {item.city}, {item.state}
              </>
            </div>
            <div className="itemFacilities">
              {item.amenities?.map((amenity) => {
                return (
                  <div className="itemFacility" key={amenity}>
                    {amenity}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="itemRight">
            <div className="itemPrev">
              Assured by: <b>{item.assured ? item.assured : 1278}</b>
            </div>
            <div className="itemPriceInfo">Starting from</div>
            <div className="itemPrice">
              <div className="striked">&#8377; {price + 0.15 * price}</div>
              <div className="actual">&#8377; {price}</div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="itemDetails" onClick={handleClick}>
            View Details
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
