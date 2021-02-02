import PropTypes from 'prop-types';
import { messages } from './messages';

export function UseTitleName(pathname) {
  const Url = pathname === messages.url;
  return Url ? messages.Edit : messages.Add;
}

UseTitleName.propTypes = {
  pathname: PropTypes.string,
};

export default UseTitleName;
