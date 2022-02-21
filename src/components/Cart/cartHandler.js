import pizzaData from "../../utils/pizzaData";

export const createCart = () => {
  if (window.localStorage.getItem("cart")) return;
  const cart = {};
  pizzaData.forEach(dish => {
    cart[dish.name] = 0;
  });
  window.localStorage.setItem("cart", JSON.stringify(cart));
};

export const getCart = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(window.localStorage.getItem("cart"));
      return cart;
    }

    return {};
  }

  return {};
};

export const getCartTotal = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(window.localStorage.getItem("cart"));
      let totalPrice = 0;
      pizzaData.forEach(dish => {
        const quantity = cart[dish.name];
        totalPrice += dish.price * quantity;
      });
      return totalPrice;
    }
    return 0;
  }
};

export const getTotalItemsInCart = () => {
  if (typeof window !== "undefined") {
    let cart;
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(window.localStorage.getItem("cart"));
    }
    let totalItems = 0;
    Object.values(cart).forEach(dishQuantity => {
      console.log(dishQuantity);
      totalItems += dishQuantity;
    });
    return totalItems;
  }

  return 0;
};

export const updateDishQuantity = (dish, action) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(window.localStorage.getItem("cart"));
      if (action === "increment") {
        cart[dish]++;
      } else if (action === "decrement") {
        if (cart[dish] - 1 >= 0) cart[dish]--;
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
};

export const removeDishFromCart = dish => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(window.localStorage.getItem("cart"));
      cart[dish] = 0;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
};
