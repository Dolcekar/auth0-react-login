import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../assets/logo.png";
import MenuCard from "../components/MenuCard/MenuCard";
import "./Main.css";
import pizzaData from "../utils/pizzaData";
import {
  getTotalItemsInCart,
  getCartTotal,
  getCart,
  updateDishQuantity,
  removeDishFromCart
} from "../components/Cart/cartHandler";
import { Notification } from "../components/Notification/Notification";

const Hero = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [cart, setCart] = useState({});
  const [show, setShow] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  const init = async () => {
    try {
      const cart = await getCart();
      setCart(cart);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCart = async (dish, action) => {
    await updateDishQuantity(dish, action);
    setCart(getCart());
    setNotificationText(
      action === "increment"
        ? `${dish} added to cart`
        : `1 ${dish} removed from cart`
    );
    setShow(true);
  };

  const removeDish = async dish => {
    await removeDishFromCart(dish);
    setCart(getCart());
    setNotificationText(`${dish} removed from cart`);
    setShow(true);
  };

  useEffect(() => {
    init();
  }, []);

  const closeHandler = () => {
    setShow(false);
  };

  const displayNotification = () =>
    show && (
      <Notification show={show} text={notificationText} close={closeHandler} />
    );

  const renderCart = () => {
    const totalItemsInCart = getTotalItemsInCart();
    return (
      <>
        {displayNotification()}
        <div className='py-3 px-1'>
          <p>
            Your cart contains {totalItemsInCart} dish
            {totalItemsInCart === 1 ? "" : "es"}
          </p>
          <div className=''>
            <div className=''>
              {Object.entries(cart).map((dishArray, i) =>
                dishArray[1] === 0 ? null : (
                  <div key={i} className='cart-item'>
                    <div className='cart-item-top'>
                      <div className='cart-item-name'>{dishArray[0]}</div>
                      <div className='cart-item-price'>
                        $
                        {pizzaData.find(ele => ele.name === dishArray[0]).price}
                      </div>
                    </div>
                    <div className='cart-item-bottom'>
                      <div className='cart-item-quantity-bar'>
                        <button
                          className='cart-item-btn'
                          onClick={() => updateCart(dishArray[0], "decrement")}
                        >
                          -
                        </button>
                        <div className='cart-item-quantity'>{dishArray[1]}</div>
                        <button
                          className='cart-item-btn'
                          onClick={() => updateCart(dishArray[0], "increment")}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className='cart-item-remove'
                        onClick={() => removeDish(dishArray[0])}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <h5 className='cart-total'>
            <span>Total:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </h5>
          {isAuthenticated ? (
            <button className='btn btn-success'>Checkout</button>
          ) : (
            <button
              className='btn btn-success'
              onClick={() => loginWithRedirect()}
            >
              Sign in to checkout
            </button>
          )}
        </div>
      </>
    );
  };

  return (
    <div className='container mt-4 mb-5'>
      <div className='row'>
        <div className='col-12 order-2 col-md-4 order-md-1 cart'>
          {renderCart()}
        </div>
        <div className='col-12 order-1 col-md-8 order-md-2'>
          <div className='hero-wrapper'>
            <img className='mb-3 ' src={logo} alt='Pizza 42 logo' width='200' />
            <h1 className='mb-4'>PIZZA 42</h1>
            <h3>Authentic Italian recipes!</h3>
            <p>Try one of our new flavors today!</p>
          </div>
          <div className='menu-wrapper'>
            <h2>Our Menu</h2>
            <div className='menu-grid'>
              {pizzaData.map((dish, i) => (
                <MenuCard
                  key={i}
                  dish={dish}
                  updateCart={updateCart}
                  removeDish={removeDish}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
