import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../components/Home';
import Register from '../components/Auth/Register';
import Login from '../components/Auth/Login';
import ProfileContainer from '../containers/ProfileContainer';
import CitiesContainer from '../containers/CitiesContainer';
import PostContainer from '../containers/PostContainer';

const routes = ({ currentUser, setCurrentUser }) => (
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
)

export default routes;
