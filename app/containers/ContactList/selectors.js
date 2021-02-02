import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectContactListDomain = state => state.contactList || initialState;
const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectcontacts = () =>
  createSelector(
    selectContactListDomain,
    globalState => globalState.contacts,
  );

const makeSelectCurrentContact = () =>
  createSelector(
    selectContactListDomain,
    globalState => globalState.currentContact,
  );
// const makeSelectLoading = () =>
//   createSelector(
//     selectContactListDomain,
//     globalState => globalState.loading,
//   );

// const makeSelectError = () =>
//   createSelector(
//     selectContactListDomain,
//     globalState => globalState.error,
//   );
export default makeSelectcontacts;
export { makeSelectcontacts, makeSelectCurrentContact, makeSelectLocation };
