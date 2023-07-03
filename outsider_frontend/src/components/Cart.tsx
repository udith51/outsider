import React, { useContext } from "react";
import "../assets/css/Cart.css";
import { Context } from "../App";
import { TContextType } from "../types";
import { AiOutlineLeft, AiOutlineShopping } from "react-icons/ai";
import { Link } from "react-router-dom";
import { TiDeleteOutline } from "react-icons/ti";

const Cart: React.FC = () => {
  const { cartItem, setShowCart } = useContext(Context) as TContextType;
  console.log(cartItem.length);

  const total = 2;

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
                className="btn"
              >
                Continue Browsing
              </button>
            </Link>
          </div>
        )}

        <div className="productContainer">
          {cartItem.length >= 1 &&
            cartItem.map((item) => {
              return (
                <div className="product" key={item.id}>
                  {/* <img
                    src={urlFor(item?.image[0])}
                    className="cart-product-image"
                  /> */}
                  <div className="cartProductImg"></div>
                  <div className="cartItemDesc">
                    <div className="flex top">
                      <h5>{item.name}</h5>
                      {/* <h4>${item.price}</h4> */}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {cartItem.length >= 1 && (
          <div className="cartBottom">
            <div className="btnContainer">
              <button type="button" className="btn">
                Continue to Enquire
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
