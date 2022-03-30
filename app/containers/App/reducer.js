/*
 *
 * App reducer
 *
 */
import produce from 'immer';
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
  GET_ORDER_ERROR,
  GET_ORDER_SUCCESS,
  GET_ORDER

} from './constants';

export const initialState = {
  loading: false,
  error: false,
  currentOrder: false,
  orders: false,
  chefsNumber: false,
  dishesMenu: false
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_KITCHEN_DETAILS:
        draft.loading = true;
        draft.error = false;
        break;
      case ADD_ORDER:
      case LOAD_ORDERS:
      case GET_ORDER:
        draft.loading = true;
        draft.error = false;
        break;
      case GET_ORDER_ERROR:
      case ADD_ORDER_ERROR:
      case LOAD_ORDERS_ERROR:
      case LOAD_KITCHEN_DETAILS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case LOAD_KITCHEN_DETAILS_SUCCESS:
        draft.dishesMenu = action.dishesMenu;
        draft.chefsNumber = action.chefsNumber;
        draft.loading = false;
        break;
      case LOAD_ORDERS_SUCCESS:
        draft.orders = action.orders;
        draft.loading = false;
        break;
      case ADD_ORDER_SUCCESS:
        draft.orders = action.orders;
        draft.currentOrder = action.order;
        draft.loading = false;
        break;
      case RESET_CURRENT_ORDER:
        draft.currentOrder = false;
        break;
      case GET_ORDER_SUCCESS:
        draft.currentOrder = action.order;
        break;
    }
  });

export default appReducer;
