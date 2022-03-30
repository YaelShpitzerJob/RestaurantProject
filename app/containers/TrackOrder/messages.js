/*
 * TrackOrder Messages
 *
 * This contains all the text for the TrackOrder container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.TrackOrder';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the TrackOrder container!',
  },
});
export const messages = {
  trackOrderTitle:' Track your order',
  enterOrderNumber: 'Enter the order number',
  orderNumber: 'orderNumber',
  fullName: 'Full name',
  search: 'Search',
  orderStatus: 'Order status',
  preparationTime: 'Preparation time',
  totalPrice: 'Total Price',
  waitingOrder: 'An order is waiting for the chef',
  processedOrder:'Chef is working on your order',
  orderCompleted: 'Order completed',
  price: 'Price',
  amount: 'Amount',
  dishName: 'Dish',
  back: 'Back',
  showBill: 'Show bill'
}