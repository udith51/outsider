import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../App";
import { TContextType, TInfoProvider } from "../types";
import Item from "../components/Item";
import "../assets/css/Home.css";
import Cart from "../components/Cart";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BottomBar from "../components/BottomBar";

const Home: React.FC = () => {
  const {
    activeTab,
    showCart,
    user,
    assured,
    search,
    rqdAmenities,
    setSearch,
  } = useContext(Context) as TContextType;
  const [items, setItems] = useState<TInfoProvider[] | null>();
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    async function getData(): Promise<void> {
      await fetch(
        `https://outsider-backend.onrender.com/provider/all/${activeTab}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (response) => {
          const val = await response.json();
          setItems(val);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    getData();
  }, [activeTab, user]);

  useEffect(() => {
    if (showCart) {
      ref.current?.classList.add("ovHidden");
    } else {
      ref.current?.classList.remove("ovHidden");
    }
  }, [showCart]);

  return (
    <>
      <Navbar />
      <div className="home" ref={ref as React.MutableRefObject<HTMLDivElement>}>
        <div className="homeLeft">
          <Sidebar />
        </div>
        <div className="homeRight">
          <div className="homeSearch">
            <input
              type="text"
              name="search"
              id="search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
              placeholder="Search by name or city"
            />
          </div>
          {items?.map((item) => {
            if (
              (item?.name?.toLowerCase() as string).search(
                search.toLowerCase()
              ) !== -1 ||
              (item?.city?.toLowerCase() as string).search(
                search.toLowerCase()
              ) !== -1
            ) {
              if (rqdAmenities.every((am) => item.amenities?.includes(am))) {
                if (assured) {
                  if (item.assured ? item.assured >= 5000 : 0)
                    return <Item item={item} key={item.serviceId} />;
                } else {
                  return <Item item={item} key={item.serviceId} />;
                }
              }
            }
          })}
        </div>
      </div>
      {user && showCart && <Cart />}
      <BottomBar />
    </>
  );
};

export default Home;
