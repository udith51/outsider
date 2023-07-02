import React, { useState } from "react";
import "../assets/css/Service.css";
import banquet from "../assets/imgs/banquet.jpg";
import { AiOutlineClockCircle, AiOutlineEye } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Banquet: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [halls, setHalls] = useState<number>(1);
  return (
    <div className="banquetMain">
      <div className="banquetTop">
        <div className="banquetName">NAME</div>
        <div className="banquetAdd">Address1, Address2, City, State</div>
      </div>
      <div className="banquetMid">
        <div className="banquetImgs">
          <img src={banquet} alt="banquetImg" className="banquetMainImg" />
        </div>
        <div className="banquetRight">
          <div className="banquetView pb5">
            <AiOutlineEye className="green f20" />{" "}
            {Math.floor(Math.random() * 100)} viewing
          </div>
          <div className="banquetBooked pb5">
            <AiOutlineClockCircle className="green f20" /> Last booked:{" "}
            {Math.floor(Math.random() * 10)} hours ago
          </div>
          <div className="br"></div>
          <div className="banquetInfo">
            <b>ACCOMODATION:</b> Upto 1500 people <div className="pb5"></div>
            <b>TOTAL HALLS:</b> 5
          </div>
          <div className="br"></div>
          <div className="banquetAmenities">Amenities</div>
        </div>
      </div>
      <div className="banquetOverview">
        <b>OVERVIEW</b>
        <div className="pb5"></div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis nisi
        possimus modi. Repellendus facilis eius autem, facere dolore distinctio
        placeat quas magni, mollitia amet quidem nisi asperiores natus libero
        numquam? Reprehenderit, hic eius aliquid dignissimos quibusdam at quae
        quis facere aperiam non ratione, ut maxime sed dolorum possimus aut
        quisquam neque quasi sapiente quia fuga! Quasi error veniam magnam quam!
        Perferendis ut unde distinctio libero vel nisi blanditiis architecto eos
        officiis a est, error sint officia, doloribus dolore quaerat nam magni
        praesentium. Neque alias similique molestiae illo itaque voluptatum
        eius? Aspernatur asperiores voluptatum sit enim, alias nihil
        reprehenderit animi quas consequuntur? Commodi necessitatibus odit
        voluptatem itaque minima. Possimus laudantium deleniti perferendis
        culpa! Praesentium placeat eius sequi. Pariatur, dolor? Qui, quaerat.
      </div>
      <div className="pb20"></div>
      <div className="banquetBooking">
        <div className="hall">
          <div className="hallLeft">
            <img src={banquet} alt="" className="imgSml" />
          </div>
          <div className="hallMid">
            <div className="col">
              Enter Event Date
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date as Date)}
                className="date"
                placeholderText="MM/DD/YYYY"
              />
            </div>
            <div className="col">
              Enter no. of Halls
              <input
                type="number"
                name="halls"
                value={halls}
                onChange={() => {
                  setHalls((halls) => halls + 1);
                }}
                min={1}
                max={5}
                className="hallNo"
              />
            </div>
          </div>
          <div className="hallRight">
            <div className="bookNow">BOOK NOW</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banquet;
