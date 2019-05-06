import React, { useState } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
import { withCookies } from 'react-cookie';
import NavBar from './components/Layout/NavBar';
import Home from './components/Home';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import ProfileContainer from './containers/ProfileContainer';
import CitiesContainer from './containers/CitiesContainer';
import PostContainer from './containers/PostContainer';

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
      cookies.remove('wsid');
      history.push('/login');
    }
  };

  // console.log(document.cookie.split(';'))

  return (
    <div>
      <NavBar currentUser={currentUser} logout={handleLogout} />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/register' component={Register} />
        <Route path='/cities' render={props => <CitiesContainer {...props} currentUser={currentUser} />} />
        <Route path='/login' render={(props) => <Login {...props} setCurrentUser={setCurrentUser} />} />
        <Route path='/profile/:userId' render={props => <ProfileContainer {...props} currentUser={currentUser} />} />
        <Route path='/profile/' render={() => <Redirect to='/login' />} />
        <Route path='/posts/:postId' component={PostContainer} />
        <Route path='*' render={() => <section><h2>Not Found</h2></section>} />
      </Switch>
    </div>
  );
}

export default withRouter(withCookies(App));
