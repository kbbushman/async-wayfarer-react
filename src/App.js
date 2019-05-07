import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { withCookies } from 'react-cookie';
import Routes from './config/routes';
import NavBar from './components/Layout/NavBar';

import './App.css';

const App = ({ history, cookies }) => {
  const [ currentUser, setCurrentUser ] = useState(localStorage.user);

  // const PrivateRoute = ({component: Component, ...rest}) => (
  //   <Route {...rest} render={(props) => (
  //     currentUser
  //       ? <Component {...props} />
  //       : <Redirect to='/login' />
  //   )} />
  // );

  const handleLogout = async () => {
    if (localStorage.user && window.confirm('I\'m sorry Dave. I can\'t let you do that...')) {
      localStorage.removeItem('user');
      const response = await axios.post(`${process.env.REACT_APP_API}/auth/logout`, {withCredentials: true});
      console.log(response);
      setCurrentUser(null);
      // cookies.remove('wsid');
      history.push('/login');
    }
  };

  return (
    <div>
      <NavBar currentUser={currentUser} logout={handleLogout} />
      <Routes currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </div>
  );
}

export default withRouter(withCookies(App));
