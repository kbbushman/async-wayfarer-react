import React, { useState, useEffect } from 'react';
import axios from 'axios';
import City from '../components/Cities/City';
import NewPostModal from '../components/Posts/NewPostModal';

const CityContainer = ({ currentUser, currentCity, match }) => {
  const [ cityPosts, setCityPosts ] = useState([]);
  const [ openModal, setOpenModal ] = useState(false);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    const getCityPosts = async () => {
      try {
        console.log('GETTING CITY POSTS...');
        const result = await axios.get(`${process.env.REACT_APP_API}/cities/${match.params.cityId}/posts`, { withCredentials: true });
        setCityPosts(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    getCityPosts();
  }, [match.params.cityId]);


  const deletePost = async postId => {
    if (window.confirm('You sure about that...?')) {
      try {
        console.log('DELETING CITY POSTS...');
        await axios.delete(`${process.env.REACT_APP_API}/posts/${postId}`, { withCredentials: true });
        const updatedPosts = cityPosts.filter(post => post._id !== postId);
        setCityPosts(updatedPosts);
      } catch (err) {
        console.log(err.response);
        if (err.response.status === 401) {
          return setError('You do not have permission to delete this post');
        }
        setError(err.response.statusText);
      }
    }
  };

  const addNewPost = async newPost => {
    setCityPosts([
      ...cityPosts,
      newPost
    ]);
  };

  return (
    <div className="city-container">
      <City
        currentUser={currentUser}
        currentCity={currentCity}
        cityPosts={cityPosts}
        deletePost={deletePost}
        setOpenModal={setOpenModal}
        error={error}
      />
      <NewPostModal
        match={match}
        open={openModal}
        setOpenModal={setOpenModal}
        setError={setError}
        addNewPost={addNewPost}
      />
    </div>
  );
};

export default CityContainer;
