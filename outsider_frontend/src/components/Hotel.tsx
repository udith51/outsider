import React from "react";
import "../assets/css/Hotel.css";
import hotel from "../assets/imgs/hotel.jpg";
import { AiOutlineEye, AiOutlineClockCircle } from "react-icons/ai";

const Hotel: React.FC = () => {
  return (
    <div className="hotelMain">
      <div className="hotelTop">
        <div className="hotelName">NAME</div>
        <div className="hotelAdd">Address1, Address2, City, State</div>
      </div>
      <div className="hotelMid">
        <div className="hotelImgs">
          <img src={hotel} alt="hotel-img" className="hotelMainImg" />
        </div>
        <div className="hotelRight">
          <div className="hotelView pb5">
            <AiOutlineEye className="green f20" />{" "}
            {Math.floor(Math.random() * 100)} viewing
          </div>
          <div className="hotelBooked pb5">
            <AiOutlineClockCircle className="green f20" /> Last booked:{" "}
            {Math.floor(Math.random() * 10)} hours ago
          </div>
          <div className="br"></div>
          <div className="hotelTimings">
            <b>CHECKIN:</b> 1:00 P.M. <div className="pb5"></div>
            <b>CHECKOUT:</b> 11:00 A.M.
          </div>
          <div className="br"></div>
          <div className="hotelAmenities">Amenities</div>
        </div>
      </div>
      <div className="hotelOverview">
        <b>OVERVIEW</b>
        <div className="pb5"></div>
        Situated within walking distance from Colva, one of the finest beaches,
        The Golden Palms offers guests luxurious accommodation. Previously known
        as Pearl Oceanique Resort, this 4-star property features everything from
        a fully-equipped gymnasium to state-of-the-art conference halls,
        business centre, swimming pool and parking area. /n/nThere are 50
        well-appointed rooms available with cosy beds and large windows spanning
        from floor to ceiling. Impressive portraits, beautiful curtains and
        elegant light fittings adorn the interiors of the rooms. Rooms at ground
        floor are open to the private lawn, while rooms at the first floor have
        balconies that overlook the pool. Air-conditioner, working desk, LCD TV,
        mini-refrigerator, tea/coffee maker and Wi-Fi internet are some of the
        amenities that are available in each room./n/nBuilt in an area of 1305
        sq ft, the on-site restaurant called The Bamboo Top is one of the main
        highlights of the hotel. Wood and glass panels on the walls beautify the
        interiors of the restaurant. Apart from mouth-watering delicacies, a
        variety of domestic and international alcoholic beverages are also
        served at the restaurant.
      </div>
      <div className="pb20"></div>
      <b>CHOOSE ROOM:</b>
      <div className="pb20"></div>
      <div className="hotelRoom">
        <div className="hotelStandard">
          <div className="roomLeft">PIC</div>
          <div className="roomMid">FROM TO ROOMS</div>
          <div className="roomRight">BOOK</div>
        </div>
        <div className="hotelDeluxe">
          <div className="roomLeft"></div>
          <div className="roomMid"></div>
          <div className="roomRight"></div>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
