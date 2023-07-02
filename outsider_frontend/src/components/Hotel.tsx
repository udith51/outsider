import React, { useState } from "react";
import "../assets/css/Service.css";
import hotel from "../assets/imgs/hotel.jpg";
import { AiOutlineEye, AiOutlineClockCircle } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Hotel: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [stRooms, setStRooms] = useState<number>(1);
  const [dlRooms, setDlRooms] = useState<number>(1);
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
        <b>STANDARD ROOM</b>
        <div className="hotelStandard">
          <div className="roomLeft">
            <img src={hotel} alt="" className="imgSml" />
          </div>
          <div className="roomMid">
            <div className="col">
              Enter CheckIn Date
              <DatePicker
                selectsStart
                selected={startDate}
                onChange={(date) => setStartDate(date as Date)}
                startDate={startDate}
                placeholderText="MM/DD/YYYY"
                className="date"
              />
            </div>
            <div className="col">
              Enter CheckOut Date
              <DatePicker
                selectsEnd
                selected={endDate}
                onChange={(date) => setEndDate(date as Date)}
                endDate={endDate}
                startDate={startDate}
                minDate={startDate}
                placeholderText="MM/DD/YYYY"
                className="date"
              />
            </div>
            <div className="col">
              Enter no. of Rooms
              <input
                type="number"
                name="stRooms"
                value={stRooms}
                onChange={() => {
                  setStRooms((rooms) => rooms + 1);
                }}
                min={1}
                max={5}
                className="roomNo"
              />
            </div>
          </div>
          <div className="roomRight">
            <div className="bookNow">BOOK NOW</div>
          </div>
        </div>
        <b>DELUXE ROOM</b>
        <div className="hotelDeluxe">
          <div className="roomLeft">
            <img src={hotel} alt="" className="imgSml" />
          </div>
          <div className="roomMid">
            <div className="col">
              Enter CheckIn Date
              <DatePicker
                selectsStart
                selected={startDate}
                onChange={(date) => setStartDate(date as Date)}
                startDate={startDate}
                placeholderText="MM/DD/YYYY"
                className="date"
              />
            </div>
            <div className="col">
              Enter CheckOut Date
              <DatePicker
                selectsEnd
                selected={endDate}
                onChange={(date) => setEndDate(date as Date)}
                endDate={endDate}
                startDate={startDate}
                minDate={startDate}
                placeholderText="MM/DD/YYYY"
                className="date"
              />
            </div>
            <div className="col">
              Enter no. of Rooms
              <input
                type="number"
                name="dlRooms"
                value={dlRooms}
                onChange={() => {
                  setDlRooms((rooms) => rooms + 1);
                }}
                min={1}
                max={5}
                className="roomNo"
              />
            </div>
          </div>
          <div className="roomRight">
            PRICE
            <div className="bookNow">BOOK NOW</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
