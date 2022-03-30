import React, { memo } from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectContacts } from 'containers/App/selectors';
import {messages} from './messages';

import './index.scss';
export function HomePage() {
  return (
    <div className="home-page">
      <h1>{messages.WelcomeRestaurantTitle}</h1>
      <div className='nav-links'>
        <NavLink to="/create-order">
          <Button
            variant="btn btn-outline-success"
            className="contactlistbutton"
          >
            {messages.createOrder}
          </Button>
        </NavLink>
        <NavLink to="/track-order">
          <Button
            variant="btn btn-outline-success"
            className="contactlistbutton"
          >
            {messages.trackOrder}
          </Button>
        </NavLink>
      </div>
    </div>
  );
}

HomePage.propTypes = {
  
};

const mapStateToProps = createStructuredSelector({
  
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  memo,
)(HomePage);
