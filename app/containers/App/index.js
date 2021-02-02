import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { ToastContainer } from 'react-toastify';
import CreateContact from '../CreateContact/index';
import ContactsListPage from '../ContactList/index';
import 'react-toastify/dist/ReactToastify.css';
import 'style.scss';
function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/contact-list" component={ContactsListPage} />
        <Route exact path="/update-contact" component={CreateContact} />
        <Route exact path="/create-contact" component={CreateContact} />
        <Redirect path="/" to="/contact-list" />
        <Route component={NotFoundPage} />
      </Switch>
      
      <ToastContainer outoClose={2000} hideProgressBar />
    </div>
  );
}

export default App;
