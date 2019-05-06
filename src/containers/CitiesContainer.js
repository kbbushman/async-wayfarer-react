import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import CitiesSidebar from '../components/Cities/CitiesSidebar';
// import City from '../components/Cities/City';
import CityContainer from '../containers/CityContainer';

const CitiesContainer = ({ currentUser, location, match }) => {
  const [ cities, setCities ] = useState([]);
  const [ currentCity, setCurrentCity ] = useState({});
  const [ error, setError ] = useState(null);
  const cityId = location.pathname.split('/')[2];
  // const cityId = match.params.cityId;

  useEffect((cityId) => {
    const getCities = async () => {
      console.log('GETTING CITIES...')
      const result = await axios.get(`${process.env.REACT_APP_API}/cities`, { withCredentials: true });
      setCities(result.data);
      cityId ? setCurrentCity(result.data.find(city => city._id === cityId)) : setCurrentCity(result.data[0]);
    };

    getCities();
  }, []);


  if (!cityId && currentCity._id) {
    return <Redirect to={`/cities/${currentCity._id}`} />
  }

  return (
    <section className='cities-container'>
      {error ? error : null}
      <CitiesSidebar cities={cities} setCurrentCity={setCurrentCity} />
      <Route exact path={`${match.path}/:cityId`} render={props => <CityContainer {...props} currentUser={currentUser} currentCity={currentCity} setCurrentCity={setCurrentCity} />} />
    </section>
  );
};

export default CitiesContainer;
