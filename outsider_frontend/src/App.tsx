import "../src/assets/css/App.css";
import React, { useState, createContext } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Prime from "./pages/Prime";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Support from "./pages/Support";
import { TCartItem, TContextType, TInfoProvider } from "./types";
import InfoProvider from "./pages/InfoProvider";
import Dashboard from "./pages/Dashboard";
import Hotel from "./components/Hotel";
import Details from "./pages/Details";

export const Context = createContext<TContextType | null>(null);
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("hotel");
  const [path, setPath] = useState<string>("");
  const [accMode, setAccMode] = useState<string>("");
  const [userType, setUserType] = useState<string>("");
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cartItem, setCartItem] = useState<TCartItem[]>([]);
  return (
    <div className="App">
      {/* <Details /> */}
      <Context.Provider
        value={{
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
        }}
      >
        {!showCart && <Navbar />}
        <Routes>
          <Route path="/:category/:id" element={<Details />} />
          <Route path="/prime" element={<Prime />} />
          <Route path="/account" element={<Account />} />
          <Route path="/support" element={<Support />} />
          <Route path="/info" element={<InfoProvider />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </Context.Provider>
    </div>
  );
};

export default App;
