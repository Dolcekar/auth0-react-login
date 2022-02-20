import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [dishes, setDishes] = useState([]);
  const [show, setShow] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  //const isVerified = user.email_verified;

  const init = async () => {
    try {
      const items = await getCart();
      setDishes(items);
    } catch (error) {
      console.log("🚀 ~ file: Cart.js ~ line 18 ~ init ~ error", error);
    }
  };

  const updateCart = async (dish, action) => {
    console.log("🚀 ~ file: Cart.js ~ line 28 ~ updateCart ~ dish", dish);
    await updateDishQuantity(dish);
    setDishes(getCart());
    setNotificationText(
      action === "increment" ? "ITEM_QTY_INCREASED" : "ITEM_QTY_DECREASED"
    );
    setShow(true);
  };

  const removeDish = async dish => {
    console.log("🚀 ~ file: Cart.js ~ line 33 ~ removeDish ~ dish", dish);
    await removeDishFromCart(dish._id, () => {
      setDishes(getCart());
    });
    setNotificationText("REMOVE_FROM_CART");
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

  const showCart = () => (
    <>
      {dishes.map(dish => (
        <div className='col-lg-4 col-md-5' key={dish._id}>
          <MenuCard
            dish={dish}
            updateCart={updateCart}
            removeDish={removeDish}
          />
        </div>
      ))}
    </>
  );

  const renderCart = () => {
    return (
      <>
        {displayNotification()}
        <div className='justify-content-center'>
          <h5>Your Cart contains {getTotalItemsInCart()} dish(es)</h5>
          <div>
            <button className='btn btn-primary'>
              Continue Shopping <strong>&#x27F9;</strong>
            </button>
          </div>
        </div>
        <div className='justify-content-center mt-2'>
          <div className=''>
            <div className='row justify-content-start'>{showCart()}</div>
          </div>
          <div className=''>
            <h5 style={{ textDecoration: "underline" }}>
              Total: <i className='fa fa-inr' />
              <span style={{ padding: "0 5px" }}>
                {/* {getCartTotal().toFixed(2)} */}
              </span>{" "}
            </h5>
            <Link to='/signin'>
              <button className='btn btn-success'>
                <i className='fa fa-lock' />{" "}
                <span style={{ padding: "5px 10px" }}>Signin to Checkout</span>
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className='container mt-4 mb-5'>
      <div className='row'>
        <div className='col col-md-4'>{renderCart()}</div>
        <div className='col col-md-8'>
          <div className='hero-wrapper'>
            <img className='mb-3 ' src={logo} alt='Pizza 42 logo' width='200' />
            <h1 className='mb-4'>PIZZA 42</h1>
            <h3>Authentic Italian recipes!</h3>
            <p>Try one of our new flavors today!</p>
          </div>
          <div className='menu-wrapper'>
            <h2>Our Menu</h2>
            <div className="menu-grid">
              {pizzaData.map(dish => (
                <MenuCard
                  key={dish.name}
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
