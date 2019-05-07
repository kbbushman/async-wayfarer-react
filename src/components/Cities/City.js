import React from 'react';
import Posts from '../Posts/Posts';

const City = ({ currentUser, currentCity, cityPosts, deletePost, setOpenModal, error }) => {
  
  const newPostButton = currentUser ? <div className='new-post-button'><button onClick={() => setOpenModal(true)}>Add New Post</button></div> : null;

  return (
    <div className="city-container">
      {error ? error : null}
      <h2>{currentCity.name}</h2>
      <h3>{currentCity.country}</h3>
      {newPostButton}
      <Posts posts={cityPosts} currentUser={currentUser} deletePost={deletePost} />
    </div>
  );
};

export default City;
