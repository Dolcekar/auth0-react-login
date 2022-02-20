import React, { useState } from "react";
import "./MenuCard.css";

const MenuCard = ({ dish, updateCart, removeDish }) => {
  const [count, setCount] = useState(dish.count);

  const handleCartOperation = action => {
    console.log(
      "🚀 ~ file: MenuCard.js ~ line 13 ~ handleCartOperation ~ action",
      action
    );

    let newDish, newCount;

    switch (action) {
      case "increment":
        newDish = { ...dish };
        newCount = count + 1;
        newDish.count = newCount;
        setCount(newCount);
        console.log(newCount);
        updateCart(newDish, "increment");
        break;
      case "decrement":
        newDish = { ...dish };
        newCount = count - 1;
        if (newCount === 0) {
          return;
        }
        newDish.count = newCount;
        console.log(newCount);
        setCount(newCount);
        updateCart(newDish, "decrement");
        break;
      case "remove":
        removeDish(dish);
        break;
      default:
        break;
    }
  };

  const renderCard = () => (
    <div className='menu-card'>
      <div className='title'>{dish.name}</div>
      <div>{dish.description}</div>
      <div>
        <img src={dish.image} alt={dish.name} className='dish-img' />
      </div>

      {/* <div className='quantity'>Qty: {dish.count}</div> */}
      <div className='price'>
        <i className='fa fa-inr'>{dish.price.toFixed(2)}</i>
      </div>
      <div className='d-flex controls'>
        <div className='descrease mr-4'>
          <button
            className='fa fa-minus'
            data-placement='top'
            title='Decrease Quantity'
            onClick={() => handleCartOperation("decrement")}
          >
            Minus
          </button>
          {/* <i
            className='fa fa-minus'
            data-placement='top'
            title='Decrease Quantity'
            onClick={() => handleCartOperation("decrement")}
          ></i> */}
        </div>
        <div className='increase mr-4'>
          <button
            className='fa fa-plus'
            data-placement='top'
            title='Increase Quantity'
            onClick={() => handleCartOperation("increment")}
          >
            Plus
          </button>
          {/* <i
            className='fa fa-plus'
            data-placement='top'
            title='Increase Quantity'
            onClick={() => handleCartOperation("increment")}
          ></i> */}
        </div>
        <div className='remove'>
          <i
            className='fa fa-trash '
            data-placement='top'
            title='Remove Dish'
            onClick={() => handleCartOperation("remove")}
          ></i>
        </div>
      </div>
    </div>
  );

  return <>{renderCard()}</>;
};

export default MenuCard;
