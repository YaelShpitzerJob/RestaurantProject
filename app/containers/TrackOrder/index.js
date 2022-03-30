import React, { memo,useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {makeSelectCurrentOrder,makeSelectDishesMenu} from '../App/selectors'
import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';
import {messages} from './messages';
import TextInput from '../../components/Textinput'
import {getOrder, resetCurrentOrder} from '../App/actions'
import Bill from './bill'
import './index.scss'

export function TrackOrder({
  currentOrder,
  searchOrder,
  dishesMenu,
  resetOrder}) {
  useInjectSaga({ key: 'trackOrder', saga });
  const [isShowSearchOption,setIsShowSearchOption] = useState(true)
  const [isShowBill,setIsShowBill] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  useEffect(()=>{
    currentOrder ? setIsShowSearchOption(false):null
  })
  function getStatusOrder(statusId) {
    switch (statusId) {
      case 0:
        return messages.waitingOrder;
      case 1:
        return messages.processedOrder;
      default:
        return messages.orderCompleted
    }
  }

  function getDishOfMenu(id) {
    return dishesMenu.find(item => item.dishId === id)
  }
  return (
    <div className='track-order'>
      <NavLink to="/" onClick={()=>resetOrder()}><Button variant="outline-success">{messages.back}</Button></NavLink>
      <h1>{messages.trackOrderTitle}</h1>
      
      {isShowSearchOption ? <div className='search'>
        <TextInput
          type='number'
          name={messages.orderNumber}
          label={messages.enterOrderNumber}
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
        />
      <Button
        className="buttonsave"
        onClick={() => searchOrder(parseInt(orderNumber))}
        variant="success"
      >
        {messages.search}
      </Button>
      </div>:
        <div className='orderDetail'>
          <div><strong>{messages.fullName}:</strong> {currentOrder.customerFullName}</div>
          <div><strong>{messages.orderStatus}:</strong> {getStatusOrder(currentOrder.statusOrder)}</div>
          {currentOrder.statusOrder !=2 && <div><strong>{messages.preparationTime}: </strong> 
            {Math.floor((currentOrder.preparationTime/60))}:
            {Math.floor((currentOrder.preparationTime%60))}</div>}
          <div><strong>{messages.totalPrice}:</strong> {currentOrder.totalPrice}</div>
          {
          // only when the order completed ,customer can see his bill
          }
          <Button variant="success" disabled={currentOrder.statusOrder !== 2} onClick={() => setIsShowBill(true)}>{messages.showBill}</Button>
          {isShowBill && <Bill currentOrder={currentOrder} getDishOfMenu={getDishOfMenu} />}
          
        </div>
      }
    </div>
  );
}

TrackOrder.propTypes = {
  currentOrder: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  searchOrder: PropTypes.func,
  resetOrder: PropTypes.func,
  dishesMenu: PropTypes.oneOfType([PropTypes.array,PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  currentOrder: makeSelectCurrentOrder(),
  dishesMenu: makeSelectDishesMenu(),
})

function mapDispatchToProps(dispatch) {
  return {
    resetOrder:() => dispatch(resetCurrentOrder()),
    searchOrder: (orderNumber) => dispatch(getOrder(orderNumber))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TrackOrder);
