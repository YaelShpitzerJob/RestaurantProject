import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import { Button, Dropdown,SplitButton} from 'react-bootstrap';
import Modal from './Modal'
import TextInput from './Textinput';
import '../containers/CreateOrderPage/index.scss'

const OrderForm = ({
  messages,
  order,
  dishesMenu,
  isDisabled,
  calculateOrder,
  onSave,
  getDishAmount,
  onChange,
  showModal,
  setShowModal
}) => (
  <div>
    <form className="form">
      <h1>
        <strong>
          {messages.createOrderTitle}
        </strong>
      </h1>
      <TextInput
        type='string'
        name={messages.firstName}
        label={messages.FirstName}
        value={order.firstName}
        onChange={onChange}
      />
      <TextInput
        type='string'
        name={messages.lastName}
        label={messages.LastName}
        value={order.lastName}
        onChange={onChange}
      />
      <TextInput
        type='number'
        name={messages.tableNumber}
        label={messages.TableNumber}
        value={order.tableNumber}
        onChange={onChange}
      />
      <div className='dishesMenu'>
        <h3>{messages.dishesOfMenu}</h3>
        <div className='menuDetais'>
          <div>{messages.NameOfDish}</div>
          <div>{messages.preparationTime}</div>
          <div>{messages.Price}</div>
          <div>{messages.amount} </div>
        </div>
      {dishesMenu && dishesMenu.map(dish =>
      <div key={dish.dishId} className='dishDetails'>
        <div>{dish.nameOfDish}</div>
        <div>{dish.preparationTime}</div>
        <div>{dish.price}</div>
        <TextInput 
          type='number'
          name={messages.menu} 
          value={getDishAmount(order.menu, dish.dishId)}
          onChange={(event,name)=>onChange(event,name,dish.dishId)}/>
      </div>
      )}</div>

      <Button
        onClick={calculateOrder}
        variant="success"
        disabled={isDisabled}
      >
        {messages.CalculateOrder}
      </Button>
      <NavLink to="/"><Button variant="outline-success">{messages.cancel}</Button></NavLink>
      {order.totalPrice && order.preparationTime && <div className='total-order'>
        <div className='header'>{messages.TotalOrder}</div>
        <div><strong>{messages.preparationTime}:</strong> {Math.floor((order.preparationTime/60))} :
        {Math.floor((order.preparationTime%60))} </div>
        <div><strong>{messages.totalPrice}:</strong> {order.totalPrice}</div>
        <Button
        className="buttonsave"
        onClick={onSave}
        variant="success"
      >
        {messages.save.toUpperCase()}

      </Button>
      </div>}
      
      {order.orderId && showModal && <Modal
        body={<div>{messages.yourOrderNumber}: <strong>{order.orderId}</strong></div>}
        head={messages.orderCompletedTitle}
        show={showModal}
        onHide={setShowModal}
        />}
      
    
    </form>
  </div>
);

OrderForm.propTypes = {
    messages: PropTypes.object,
    order: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    dishesMenu: PropTypes.oneOfType([PropTypes.array,PropTypes.bool]),
    isDisabled: PropTypes.bool,
    getDishAmount: PropTypes.func,
    calculateOrder: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default OrderForm;
