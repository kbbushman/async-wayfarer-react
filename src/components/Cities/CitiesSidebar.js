import React from 'react';
import { NavLink } from 'react-router-dom';

const CitiesSidebar = ({ cities, setCurrentCity }) => {
  const handleClick = (city) => {
    // const links = event.target.parentNode.childNodes;
    // links.forEach(link => link.classList.remove('active'));
    // event.target.classList.add('active');
    setCurrentCity(city);
  }

  // const cityButtons = cities.map(city => (
  //   <button key={city._id} onClick={(event) => handleClick(event, city)}>{city.name}</button>
  // ));

  const cityLinks = cities.map(city => (
    <NavLink onClick={() => handleClick(city)} className='city-link' key={city._id} to={`/cities/${city._id}`}>{city.name}</NavLink>
  ));

  return (
    <div className='cities-sidebar'>
      <h2>Cities</h2>
      {cityLinks}
    </div>
  );
};

export default CitiesSidebar;
