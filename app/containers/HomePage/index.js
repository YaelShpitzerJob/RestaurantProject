import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectContacts } from 'containers/App/selectors';
import messages from './messages';

import './index.scss';
export function HomePage() {
  return (
    <div className="home-page">
      <h1 className="h1-red">
        <FormattedMessage {...messages.header} />
      </h1>
    </div>
  );
}

HomePage.propTypes = {
  contacts: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  contacts: makeSelectContacts(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  memo,
)(HomePage);
