import React, { useState, useEffect } from 'react';
import axios from 'axios';
import City from '../components/Cities/City';
// import NewPostModal from '../Posts/NewPostModal';
// import Posts from '../Posts/Posts';

const CityContainer = ({ currentUser, currentCity, setCurrentCity, match }) => {
  const [ cityPosts, setCityPosts ] = useState([]);
  // const [ currentCity, setCurrentCity ] = useState({});
  const [ openModal, setOpenModal ] = useState(false);
  const [ error, setError ] = useState(null);
  // const cityId = location.pathname.split('/')[2];
  const cityId = match.params.cityId;

  useEffect(() => {
    const getCityPosts = async () => {
      try {
        console.log('GETTING CITY POSTS...');
        const result = await axios.get(`${process.env.REACT_APP_API}/cities/${match.params.cityId}/posts`, { withCredentials: true });
        setCityPosts(result.data);
        cityId ? setCurrentCity(result.data.find(city => city._id === cityId)) : setCurrentCity(result.data[0]);
      } catch (err) {
        console.log(err);
      }
    };

    getCityPosts();
    // cityId ? setCurrentCity(result.data.find(city => city._id === cityId)) : setCurrentCity(result.data[0]);
  }, [match.params.cityId]);


  const deletePost = async postId => {
    if (window.confirm('You sure about that...?')) {
      try {
        console.log('DELETING CITY POSTS...');
        await axios.delete(`${process.env.REACT_APP_API}/posts/${postId}`, { withCredentials: true });
        const updatedPosts = cityPosts.filter(post => post._id !== postId);
        setCityPosts(updatedPosts);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const addNewPost = async newPost => {
    setCityPosts([
      ...cityPosts,
      newPost
    ]);
  };

  const newPostButton = currentUser ? <div className='new-post-button'><button onClick={() => setOpenModal(true)}>Add New Post</button></div> : null;

  return <City currentUser={currentUser} currentCity={currentCity} cityPosts={cityPosts} addNewPost={addNewPost} deletePost={deletePost} />
};

export default CityContainer;
