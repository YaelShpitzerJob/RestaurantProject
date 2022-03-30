import React, { memo, useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';
import {messages} from './messages';
import {addOrder,resetCurrentOrder} from '../App/actions'
import {makeSelectCurrentOrder, makeSelectDishesMenu,makeSelectOrdersLIst,makeSelectChefsNumber} from '../App/selectors'
import ContactForm from '../../components/OrderForm'
import './index.scss'

export function CreateOrderPage({
  currentOrder,
  dishesMenu,
  ordersList,
  chefsNumber,
  addNewOrder,
  history,
  resetOrder}) {
  useInjectSaga({ key: 'createOrderPage', saga });
  
  const emptyOrder = {
    firstName: '',
    lastName: '',
    tableNumber: '',
    totalPrice:'',
    preparationTime:'',
    menu:[]
  };
  const [order,setOrder] = useState(
    currentOrder ? currentOrder: emptyOrder
  )
  const [showModal, setShowModal] = useState(false)
  const [isDisabledButton, setIsDisableButton] = useState(true)
  
  useEffect(()=>{
    if(!order.orderId) {
      if (currentOrder) {
        setOrder({...currentOrder})
        setShowModal(true)
      } else {
        const isDisabled = order.firstName && order.lastName && 
          order.tableNumber && order.menu.length > 0 && isDisabledButton;
        isDisabled ? setIsDisableButton(false):null;
      }
    }
  })

  function handleChange(event, name, dishId) {
    if (dishId) {
      let list = [...order.menu];
      const existDish = getIndexOfDish(list, dishId)
      const amount = parseInt(event.target.value);
      if( amount > 0 ) {
        existDish < 0 ? list.push({dishId,amount:amount}) : 
          list[existDish].amount = amount;
      } else {
        list = existDish >= 0 && list.filter(item => item.dishId !== dishId);
      }
      setOrder({ ...order, [name]: [...list] })
    } else {
     setOrder({ ...order, [name]: event.target.value });
    }
  }

  function getIndexOfDish(list,id) {
    return list.findIndex(item => item.dishId.toString() === id.toString());
  }

  function calculateOrder() {
      let totalPrice = 0;
      let preparationTime = 0;
      const dishes = [...order.menu];
      dishes.map(dish=>{
        const indexOfDish = getIndexOfDish(dishesMenu,dish.dishId);
        const dishOfMenu = indexOfDish >= 0 && dishesMenu[indexOfDish];
        if (dishOfMenu) {
            totalPrice += (dishOfMenu.price*dish.amount);
            preparationTime += (dishOfMenu.preparationTime*dish.amount);
        }
      })
      ordersList.map(order=>preparationTime+=order.preparationTime);
      preparationTime /= chefsNumber;
      const newOrder = {...order,totalPrice,preparationTime};
      setOrder(newOrder)
  }

  function onSave() {
    const newOrder = {
      customerFullName: order.firstName + ' ' + order.lastName,
      tableNumber: parseInt(order.tableNumber),
      totalPrice: order.totalPrice,
      preparationTime: order.preparationTime,
      statusOrder: 0,
      menu: [...order.menu]
    }
    addNewOrder(newOrder)
  }
 
  function backToHome() {
    setShowModal(false),
    history.push('/'),
    resetOrder()
  }

  function getDishAmount(list, id) {
    return list.find(item =>item.dishId === id)?
            parseInt(list.find(item =>item.dishId === id).amount):''
  }
  return (
    <div className='create-order'>
      <ContactForm 
        messages={messages}
        isDisabled={isDisabledButton}
        order={order}
        calculateOrder={calculateOrder}
        dishesMenu={dishesMenu}
        onChange= {handleChange}
        onSave={onSave}
        showModal={showModal}
        getDishAmount={getDishAmount}
        setShowModal={backToHome} 
        />
    </div>
  );
}

CreateOrderPage.propTypes = {
  currentOrder: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dishesMenu: PropTypes.oneOfType([PropTypes.array,PropTypes.bool]),
  ordersList: PropTypes.oneOfType([PropTypes.array,PropTypes.bool]),
  chefsNumber: PropTypes.oneOfType([PropTypes.number,PropTypes.bool]),
  addNewOrder: PropTypes.func,
  resetOrder: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currentOrder: makeSelectCurrentOrder(),
  dishesMenu: makeSelectDishesMenu(),
  ordersList: makeSelectOrdersLIst(),
  chefsNumber: makeSelectChefsNumber()
});

function mapDispatchToProps(dispatch) {
  return {
    addNewOrder: (order) => dispatch(addOrder(order)),
    resetOrder:() => dispatch(resetCurrentOrder())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CreateOrderPage);
