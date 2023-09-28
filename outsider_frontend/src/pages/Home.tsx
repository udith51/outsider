import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../App";
import { TContextType, TInfoProvider } from "../types";
import Item from "../components/Item";
import "../assets/css/Home.css";
import Cart from "../components/Cart";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home: React.FC = () => {
  const { activeTab, showCart, user, assured, search, rqdAmenities } =
    useContext(Context) as TContextType;
  const [items, setItems] = useState<TInfoProvider[] | null>();
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    async function getData(): Promise<void> {
      await fetch(`http://localhost:3000/provider/all/${activeTab}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          const val = await response.json();
          setItems(val);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    if (!user) console.log("No user");
    else {
      getData();
    }
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
      {user ? (
        <>
          <div
            className="home"
            ref={ref as React.MutableRefObject<HTMLDivElement>}
          >
            <div className="homeLeft">
              <Sidebar />
            </div>
            <div className="homeRight">
              {items?.map((item) => {
                if (
                  (item?.name?.toLowerCase() as string).search(
                    search.toLowerCase()
                  ) !== -1 ||
                  (item?.city?.toLowerCase() as string).search(
                    search.toLowerCase()
                  ) !== -1
                ) {
                  if (
                    rqdAmenities.every((am) => item.amenities?.includes(am))
                  ) {
                    if (assured) {
                      if (item.assured ? item.assured >= 5000 : 0)
                        return <Item item={item} key={item._id} />;
                    } else {
                      return <Item item={item} key={item._id} />;
                    }
                  }
                }
              })}
            </div>
          </div>
          {showCart && <Cart />}
        </>
      ) : (
        <div className="plain">Home</div>
      )}
    </>
  );
};

export default Home;
