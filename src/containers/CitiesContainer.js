import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import CitiesSidebar from '../components/Cities/CitiesSidebar';
import CityContainer from './CityContainer';
// import City from '../components/Cities/City';

const CitiesContainer = ({ currentUser, match, location }) => {
  const [ cities, setCities ] = useState([]);
  const [ currentCity, setCurrentCity ] = useState({});
  const [ error, setError ] = useState(null);
  const cityId = location.pathname.split('/')[2];

  useEffect(() => {
    const getCities = async () => {
      try {
        console.log('GETTING CITIES...');
        const cityId = window.location.pathname.split('/')[2];
        const result = await axios.get(`${process.env.REACT_APP_API}/cities`, { withCredentials: true });
        setCities(result.data);
        cityId ? setCurrentCity(result.data.find(city => city._id === cityId)) : setCurrentCity(result.data[0]);
      } catch(err) {
        console.log(err);
        setError(err.response.data.errors);
      }
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
      <Route exact path={`${match.path}/:cityId`} render={props => <CityContainer {...props} currentCity={currentCity} currentUser={currentUser} />} />
    </section>
  );
};

export default CitiesContainer;
