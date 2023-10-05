import React, { useEffect, useContext, useState } from "react";
import "../assets/css/Booking.css";
import ReserveBox from "../components/ReserveBox";
import { Context } from "../App";
import { TCartItem, TContextType } from "../types";
import { useNavigate } from "react-router-dom";

const Booking: React.FC = () => {
  const { user, setUser } = useContext(Context) as TContextType;
  const [reservations, setReservation] = useState<TCartItem[]>([]);
  console.log(reservations);

  useEffect(() => {
    async function getData() {
      await fetch(
        `http://localhost:3000/reserve/${user?.category}/${user?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (data) => {
          const resp = await data.json();
          setReservation(resp);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    getData();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div className="dashNav">
        <div className="dashNavContents">
          <div
            className="navLogo"
            onClick={() => {
              navigate("/dash");
            }}
          >
            Logo
          </div>
          <div className="navAccount">
            <div className="dropbtn">Hi {user?.name.split(" ")[0]}</div>
            <div className="dropdown-content">
              <div
                onClick={() => {
                  setUser(undefined);
                  navigate("/");
                }}
              >
                Log Out
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bookingsWrapper">
        <div className="booking">
          {reservations.map((reservation, index) => {
            return <ReserveBox key={index} reservation={reservation} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Booking;
