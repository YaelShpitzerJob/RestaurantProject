import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAppDomain = state => state.app || initialState;

const makeSelectCurrentOrder = () => 
  createSelector(
    selectAppDomain,
    globalState => globalState.currentOrder,
  );

const makeSelectDishesMenu = () => 
  createSelector(
    selectAppDomain,
    globalState => globalState.dishesMenu,
  );


const makeSelectOrdersLIst = () => 
  createSelector(
    selectAppDomain,
    globalState => globalState.orders,
  );
const makeSelectChefsNumber = () => 
  createSelector(
    selectAppDomain,
    globalState => globalState.chefsNumber,
  );
// export default ;
export { makeSelectCurrentOrder,makeSelectDishesMenu ,makeSelectOrdersLIst,makeSelectChefsNumber };
