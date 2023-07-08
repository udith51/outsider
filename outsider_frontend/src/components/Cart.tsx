import React, { useContext } from "react";
import "../assets/css/Cart.css";
import { Context } from "../App";
import { TContextType } from "../types";
import { AiOutlineLeft, AiOutlineShopping } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { TiDeleteOutline } from "react-icons/ti";
import CartItem from "./CartItem";

const Cart: React.FC = () => {
  const { cartItem, setShowCart, setCartItem } = useContext(
    Context
  ) as TContextType;

  const navigate = useNavigate();

  const handleConfirmation = () => {
    navigate("/success");
    setShowCart(false);
    setCartItem([]);
  };

  return (
    <div className="cartWrapper">
      <div className="cartContainer">
        <button
          type="button"
          className="cartHeading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cartNumItems">({cartItem.length} items)</span>
        </button>

        {cartItem.length < 1 && (
          <div className="emptyCart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link to="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn emptyBtn"
              >
                Continue Browsing
              </button>
            </Link>
          </div>
        )}
        {cartItem.length !== 0 && (
          <div className="productContainer">
            {cartItem.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </div>
        )}

        {cartItem.length >= 1 && (
          <div className="btnContainer">
            <button type="button" className="btn" onClick={handleConfirmation}>
              Continue to Enquire
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;