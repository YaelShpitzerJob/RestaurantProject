import React, { memo,useEffect } from 'react';
import { Switch, Route, Redirect,NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import {messages} from './messages';
import HomePage from '../HomePage/index';
import CreateOrder from '../CreateOrderPage/index';
import TrackOrder from '../TrackOrder/index';
import {loadKitchenDetails, loadOrders} from './actions';

export function App({onloadKitchenDetails,onLoadOrders}) {
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    onloadKitchenDetails();
    onLoadOrders();
  },[])
  return (
    <div>
      <Switch>
        <Route exact path="/track-order" component={TrackOrder} />
        <Route exact path="/create-order" component={CreateOrder} />
        <Route exact path="/home-page" component={HomePage} />
        <Redirect path="/" to="/home-page" />
      </Switch>
    </div>
  );
}

App.propTypes = {
  onloadKitchenDetails: PropTypes.func,
  onLoadOrders: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    onloadKitchenDetails: () => dispatch(loadKitchenDetails()),
    onLoadOrders: () => dispatch(loadOrders())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(App);
