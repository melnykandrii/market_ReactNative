import { ADD_ORDER, SET_ORDERS } from "../actions/order";
import Order from "../../models/order";

const initialSate = {
  orders: [],
};

export default (state = initialSate, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders,
      };
    //create a new order creater object wich would be work with the modal: order.js file
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date,
        action.orderData.refId
      );
      //adding new order to order array
      return {
        ...state,
        //add a new item in to array a return the new array with new array
        orders: state.orders.concat(newOrder),
      };
  }

  return state;
};
