import React, { useState } from "react";
import "./MenuCard.css";

const MenuCard = ({ dish, updateCart, removeDish }) => {
  const handleCartOperation = action => {
    switch (action) {
      case "increment":
        updateCart(dish.name, "increment");
        break;
      case "decrement":
        updateCart(dish.name, "decrement");
        break;
      case "remove":
        removeDish(dish.name);
        break;
      default:
        break;
    }
  };

  return (
    <div className='menu-card'>
      <img src={dish.image} alt={dish.name} className='dish-img' />
      <div className='dish-info'>
        <div className='dish-name'>{dish.name}</div>
        <div classname='dish-description'>{dish.description}</div>
        <div className='dish-price'>${dish.price.toFixed(2)}</div>
        <button
          className='btn btn-success mt-2'
          onClick={() => handleCartOperation("increment")}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
