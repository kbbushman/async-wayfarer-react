import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewPostModal from '../components/Posts/NewPostModal';
import Posts from '../components/Posts/Posts';

const City = ({ currentUser, currentCity, match }) => {
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
        const response = await axios.delete(`${process.env.REACT_APP_API}/posts/${postId}`, { withCredentials: true });
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

  const newPostButton = currentUser ? <div className='new-post-button'><button onClick={() => setOpenModal(true)}>Add New Post</button></div> : null;

  return (
    <div className="city-container">
      {error ? error : null}
      <h2>{currentCity.name}</h2>
      <h3>{currentCity.country}</h3>
      {newPostButton}
      <Posts posts={cityPosts} currentUser={currentUser} deletePost={deletePost} />
      <NewPostModal match={match} open={openModal} setOpenModal={setOpenModal} setError={setError} addNewPost={addNewPost} />
    </div>
  );
};

export default City;
