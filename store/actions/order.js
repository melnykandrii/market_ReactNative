//cases/actions we want to have
import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://shopma-58377-default-rtdb.firebaseio.com/users/${userId}/orders.json?auth=${token}`
        // `https://shopma-58377-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`
        // `https://storefilern-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedOrders = [];

      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date),
            resData[key].refId
          )
        );
      }
      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (err) {
      throw err;
    }
  };
};

//export action creator that recieves two data
export const addOrder = (cartItems, totalAmount) => {
  //return action object with type - ADD_ORDER and key - orderData, we handel it in one object but could be stored in different
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const refId =
      "SM-" +
      new Date().toString().split(" ")[4].split(":")[2] +
      new Date().toString().split(" ")[4].split(":")[1] +
      new Date().toString().split(" ")[4].split(":")[0] +
      new Date().toString().split(" ")[3] +
      new Date().toString().split(" ")[2];
    const response = await fetch(
      `https://shopma-58377-default-rtdb.firebaseio.com/users/${userId}/orders.json?auth=${token}`,
      // `https://shopma-58377-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
      //`https://storefilern-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
          refId: refId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
        refId: refId,
      },
    });
  };
};
