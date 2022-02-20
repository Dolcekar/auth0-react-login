import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTotalItemsInCart, getCartTotal, getCart, updateDishQuantity, removeDishFromCart } from './cartHandler';
import { Notification } from '../Notification/Notification';
import MenuCard from '../MenuCard/MenuCard';

const Cart = () => {
  const [dishes, setDishes] = useState([]);
  const [show, setShow] = useState(false);
  const [notificationText, setNotificationText] = useState('');

  const init = async () => {
    try {
      const items = await getCart();
      setDishes(items);

    } catch (error) {
      console.log("🚀 ~ file: Cart.js ~ line 18 ~ init ~ error", error)
    }
  }

  const updateCart = async (dish, action) => {
    console.log("🚀 ~ file: Cart.js ~ line 28 ~ updateCart ~ dish", dish);
    await updateDishQuantity(dish);
    setDishes(getCart());
    setNotificationText(action === "increment" ? "ITEM_QTY_INCREASED" : "ITEM_QTY_DECREASED");
    setShow(true)
  }

  const removeDish = async (dish) => {
    console.log("🚀 ~ file: Cart.js ~ line 33 ~ removeDish ~ dish", dish)
    await removeDishFromCart(dish._id, () => { setDishes(getCart()); });
    setNotificationText("REMOVE_FROM_CART");
    setShow(true);
  }

  useEffect(() => {
    init();
  }, []);

  const closeHandler = () => {
    setShow(false);
  }

  const displayNotification = () => (
    show && <Notification show={show} text={notificationText} close={closeHandler} />
  )

  const showCart = () => (
    <>
      {dishes.map((dish) => (
        <div className="col-lg-4 col-md-5" key={dish._id}>
          <MenuCard dish={dish} updateCart={updateCart} removeDish={removeDish} />
        </div>
      ))}
    </>
  )

  const renderCart = () => {
    return (
      <>
        {displayNotification()}
        <div className="row justify-content-center mt-5 mb-32x32">
          <div className="col-12 col-lg-4">
            <h4>Your Cart contains {getTotalItemsInCart()} dish(es)</h4>
          </div>
          <div className="col-12 col-lg-auto">
            <button className="btn btn-primary">
              Continue Shopping <strong>&#x27F9;</strong>
            </button>

          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-lg-6 col-7">
            <div className="row justify-content-start">
              {showCart()}
            </div>
          </div>
          <div className="col-lg-5 col-md-6">
            <h5 style={{ textDecoration: 'underline' }}>Total: <i className="fa fa-inr" /><span style={{ padding: '0 5px' }}>{getCartTotal().toFixed(2)}</span> </h5>
            <Link to="/signin">
              <button className="btn btn-success" ><i className="fa fa-lock" /> <span style={{ padding: '5px 10px' }}>Signin to Checkout</span></button>
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {renderCart()}
    </>
  )
}

export default Cart
