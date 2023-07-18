import React from "react";
import "../assets/css/Booking.css";
import { TCartItem } from "../types";

interface ReservationProps {
  reservation: TCartItem;
}
type TgetDate = (date: Date) => string;

const getDate: TgetDate = (date) => {
  const d1 = date?.toString() as string;
  return `${d1.substring(8, 10)}/${d1.substring(5, 7)}/${d1.substring(0, 4)}`;
};

const ReserveBox: React.FC<ReservationProps> = ({ reservation }) => {
  const {
    customerName,
    customerPhone,
    customerEmail,
    category,
    bsGuests,
    prGuests,
    prPGuests,
    bsStartDate,
    bsEndDate,
    prStartDate,
    prEndDate,
    prPStartDate,
    prPEndDate,
    stRooms,
    dlRooms,
    stStartDate,
    stEndDate,
    dlStartDate,
    dlEndDate,
    halls,
    date,
  } = reservation;
  console.log(reservation);

  return (
    <div className="res">
      <div className="resBar">Client Name: {customerName}</div>
      <div className="resBar">
        Phone: <a href={`tel:+${customerPhone}`}>{customerPhone}</a>
      </div>
      <div className="resBar">
        Email: <a href={`mailto:${customerEmail}`}>{customerEmail}</a>
      </div>
      {category === "catering" && (
        <>
          {bsGuests !== 0 && (
            <>
              <div className="pb5"></div>
              <b>Basic Plan</b>
              <div className="resBar">Guests: {bsGuests}</div>
              <div className="resBar">
                Date: {getDate(bsStartDate as Date)} -{" "}
                {getDate(bsEndDate as Date)}
              </div>
            </>
          )}
          {prGuests !== 0 && (
            <>
              <div className="pb5"></div>
              <b>Premium Plan</b>
              <div className="resBar">Guests: {prGuests}</div>
              <div className="resBar">
                Date: {getDate(prStartDate as Date)} -{" "}
                {getDate(prEndDate as Date)}
              </div>
            </>
          )}
          {prPGuests !== 0 && (
            <>
              <div className="pb5"></div>
              <b>Premium Plus Plan</b>
              <div className="resBar">Guests: {prPGuests}</div>
              <div className="resBar">
                Date: {getDate(prPStartDate as Date)} -{" "}
                {getDate(prPEndDate as Date)}
              </div>
            </>
          )}
        </>
      )}
      {category === "hotel" && (
        <>
          {stRooms !== 0 && (
            <>
              <div className="pb5"></div>
              <b>Basic Plan</b>
              <div className="resBar">Rooms: {stRooms}</div>
              <div className="resBar">
                Date: {getDate(stStartDate as Date)} -{" "}
                {getDate(stEndDate as Date)}
              </div>
            </>
          )}
          {dlRooms !== 0 && (
            <>
              <div className="pb5"></div>
              <b>Premium Plan</b>
              <div className="resBar">Rooms: {dlRooms}</div>
              <div className="resBar">
                Date: {getDate(dlStartDate as Date)} -{" "}
                {getDate(dlEndDate as Date)}
              </div>
            </>
          )}
        </>
      )}
      {category === "banquet" && (
        <>
          <div className="pb5"></div>
          <div className="resBar">Halls: {halls}</div>
          <div className="resBar">Date: {getDate(date as Date)}</div>
        </>
      )}
      <div className="resBar"></div>
    </div>
  );
};

export default ReserveBox;
