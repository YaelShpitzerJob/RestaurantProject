import {
  LOAD_KITCHEN_DETAILS,
  LOAD_KITCHEN_DETAILS_SUCCESS,
  LOAD_KITCHEN_DETAILS_ERROR,
  LOAD_ORDERS,
  LOAD_ORDERS_SUCCESS,
  LOAD_ORDERS_ERROR,
  ADD_ORDER,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_ERROR,
  RESET_CURRENT_ORDER,
  GET_ORDER,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR
} from './constants';

// GET MENU
export function loadKitchenDetails() {
  return {
    type: LOAD_KITCHEN_DETAILS,
  };
}
export function kitchenDetailsLoaded(dishesMenu,chefsNumber) {
  return {
    type: LOAD_KITCHEN_DETAILS_SUCCESS,
    dishesMenu,
    chefsNumber
  };
}
export function kitchenDetailsLoadingError(error) {
  return {
    type: LOAD_KITCHEN_DETAILS_ERROR,
    error,
  };
}

// GET ORDERS
export function loadOrders() {
  return {
    type: LOAD_ORDERS,
  };
}
export function ordersLoaded(orders) {
  return {
    type: LOAD_ORDERS_SUCCESS,
    orders
  };
}
export function ordersLoadingError(error) {
  return {
    type: LOAD_ORDERS_ERROR,
    error,
  };
}

// ADD ORDER
export function addOrder(order) {
  return {
    type: ADD_ORDER,
    order
  };
}
export function addOrderSuccess(order,orders) {
  return {
    type: ADD_ORDER_SUCCESS,
    orders,
    order
  };
}
export function addOrderError(error) {
  return {
    type: ADD_ORDER_ERROR,
    error,
  };
}

// SEARCH ORDER
export function getOrder(orderId) {
  return {
    type: GET_ORDER,
    orderId
  };
}
export function getOrderSuccess(order) {
  return {
    type: GET_ORDER_SUCCESS,
    order
  };
}
export function getOrderError(error) {
  return {
    type: GET_ORDER_ERROR,
    error,
  };
}

// RESET CURRENT ORDER
export function resetCurrentOrder() {
  return {
    type: RESET_CURRENT_ORDER
  };
}