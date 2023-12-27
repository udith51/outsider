import "../src/assets/css/App.css";
import React, { useState, createContext, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
// import Prime from "./pages/Prime";
// import Home from "./pages/Home";
// import Account from "./pages/Account";
// import Support from "./pages/Support";
import { TCartItem, TContextType, TUser } from "./types";
// import InfoProvider from "./pages/InfoProvider";
// import Dashboard from "./pages/Dashboard";
// import Details from "./pages/Details";
// import Success from "./pages/Success";
import Booking from "./pages/Booking";
const Details = lazy(() => import("./pages/Details"));
const Success = lazy(() => import("./pages/Success"));
const Prime = lazy(() => import("./pages/Prime"));
const Account = lazy(() => import("./pages/Account"));
const Support = lazy(() => import("./pages/Support"));
const InfoProvider = lazy(() => import("./pages/InfoProvider"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Home = lazy(() => import("./pages/Home"));

export const Context = createContext<TContextType | null>(null);
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("hotel");
  const [user, setUser] = useState<TUser>();
  const [path, setPath] = useState<string>("");
  const [accMode, setAccMode] = useState<string>("");
  const [userType, setUserType] = useState<string>("");
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cartItem, setCartItem] = useState<TCartItem[]>([]);
  const [assured, setAssured] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [rqdAmenities, setRqdAmenities] = useState<string[]>([]);
  return (
    <div className="App">
      <Suspense
        fallback={
          <div className="spinnerMain">
            <span className="loaderMain"></span>
          </div>
        }
      >
        <Context.Provider
          value={{
            user,
            setUser,
            path,
            setPath,
            accMode,
            setAccMode,
            userType,
            setUserType,
            activeTab,
            setActiveTab,
            showCart,
            setShowCart,
            cartItem,
            setCartItem,
            assured,
            setAssured,
            search,
            setSearch,
            rqdAmenities,
            setRqdAmenities,
          }}
        >
          <Routes>
            <Route path="/:category/:id" element={<Details />} />
            <Route path="/bookings" element={<Booking />} />
            <Route path="/success" element={<Success />} />
            <Route path="/prime" element={<Prime />} />
            <Route path="/account" element={<Account />} />
            <Route path="/support" element={<Support />} />
            <Route path="/info" element={<InfoProvider />} />
            <Route path="/dash" element={<Dashboard />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </Context.Provider>
      </Suspense>
    </div>
  );
};

export default App;
