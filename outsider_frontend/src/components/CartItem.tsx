import React from "react";
import { TCartItem } from "../types";
import hotel from "../assets/imgs/hotel.jpg";
// import "../assets/css/Cart.css";

interface IItemProps {
  item: TCartItem;
}

const CartItem: React.FC<IItemProps> = ({ item }) => {
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="cartItem">
      <img src={hotel} className="cartItemImg" />
      <div className="cartItemDetails">
        <div className="cartItemName">
          <div className="">{item.name.toUpperCase()}</div>
          <div className="cartCategory">{item.category.toUpperCase()}</div>
        </div>

        {item.category === "hotel" && (
          <>
            <div className="cartItemTypes">
              {item.stRooms !== 0 && (
                <div className="col">
                  <div>Standard Rooms (X{item.stRooms})</div>
                  <div className="dateCart">
                    <div className="">
                      {month[item.stStartDate?.getMonth() as number]}{" "}
                      {item.stStartDate?.getDate()},{" "}
                      {item.stStartDate?.getFullYear()}
                    </div>
                    <div className="">
                      {month[item.stEndDate?.getMonth() as number]}{" "}
                      {item.stEndDate?.getDate()},{" "}
                      {item.stEndDate?.getFullYear()}
                    </div>
                  </div>
                </div>
              )}
              {item.dlRooms !== 0 && (
                <div className="col">
                  <div>Deluxe Rooms (X{item.dlRooms})</div>
                  <div className="dateCart">
                    <div className="">
                      {month[item.dlStartDate?.getMonth() as number]}{" "}
                      {item.dlStartDate?.getDate()},{" "}
                      {item.dlStartDate?.getFullYear()}
                    </div>
                    <div className="">
                      {month[item.dlEndDate?.getMonth() as number]}{" "}
                      {item.dlEndDate?.getDate()},{" "}
                      {item.dlEndDate?.getFullYear()}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="cartItemTotal">
              &#8377;{" "}
              {(item.stRooms as number) * (item?.standardAmt as number) +
                (item.dlRooms as number) * (item?.deluxeAmt as number)}
            </div>
          </>
        )}

        {item.category === "catering" && (
          <>
            <div className="cartItemTypes">
              {item.bsGuests !== 0 && (
                <div className="col">
                  <div>Basic Plan (X{item.bsGuests})</div>
                  <div className="dateCart">
                    <div className="">
                      {month[item.bsStartDate?.getMonth() as number]}{" "}
                      {item.bsStartDate?.getDate()},{" "}
                      {item.bsStartDate?.getFullYear()}
                    </div>
                    <div className="">
                      {month[item.bsEndDate?.getMonth() as number]}{" "}
                      {item.bsEndDate?.getDate()},{" "}
                      {item.bsEndDate?.getFullYear()}
                    </div>
                  </div>
                </div>
              )}
              {item.prGuests !== 0 && (
                <div className="col">
                  <div>Premium Plan (X{item.prGuests})</div>
                  <div className="dateCart">
                    <div className="">
                      {month[item.prStartDate?.getMonth() as number]}{" "}
                      {item.prStartDate?.getDate()},{" "}
                      {item.prStartDate?.getFullYear()}
                    </div>
                    <div className="">
                      {month[item.prEndDate?.getMonth() as number]}{" "}
                      {item.prEndDate?.getDate()},{" "}
                      {item.prEndDate?.getFullYear()}
                    </div>
                  </div>
                </div>
              )}
              {item.prPGuests !== 0 && (
                <div className="col">
                  <div>Premium Plus Plan (X{item.prPGuests})</div>
                  <div className="dateCart">
                    <div className="">
                      {month[item.prPStartDate?.getMonth() as number]}{" "}
                      {item.prPStartDate?.getDate()},{" "}
                      {item.prPStartDate?.getFullYear()}
                    </div>
                    <div className="">
                      {month[item.prPEndDate?.getMonth() as number]}{" "}
                      {item.prPEndDate?.getDate()},{" "}
                      {item.prPEndDate?.getFullYear()}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="cartItemTotal">
              &#8377;{" "}
              {(item.basicAmt as number) * (item?.bsGuests as number) +
                (item.premiumAmt as number) * (item?.prGuests as number) +
                (item.premiumPlusAmt as number) * (item?.prPGuests as number)}
            </div>
          </>
        )}

        {item.category === "banquet" && (
          <>
            <div className="cartItemTypes">
              <div className="col">
                <div>Halls (X{item.halls})</div>
                <div className="dateCart">
                  <div className="">
                    {month[item.date?.getMonth() as number]}{" "}
                    {item.date?.getDate()}, {item.date?.getFullYear()}
                  </div>
                </div>
              </div>
            </div>
            <div className="cartItemTotal">
              &#8377; {(item.halls as number) * (item?.price as number)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartItem;
