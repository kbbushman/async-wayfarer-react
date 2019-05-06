import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ currentUser, logout }) => {
  const authLinks = (
    <>
      <li><NavLink exact to={`/profile/${currentUser}`}>Profile</NavLink></li>
      <li><span onClick={logout}>Log Out</span></li>
    </>
  );
  
  const links = (
    <>
      <li><NavLink exact to='/register'>Sign Up</NavLink></li>
      <li><NavLink exact to='/login'>Log In</NavLink></li>
    </>
  );

  return (
    <nav>
      <ul>
        <li><NavLink exact to='/'>Home</NavLink></li>
        <li><NavLink to='/cities'>Cities</NavLink></li>
        { currentUser ? authLinks : links }
      </ul>
    </nav>
  );
};

export default NavBar;
