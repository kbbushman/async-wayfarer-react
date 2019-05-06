import React, { useState } from 'react';
import Posts from '../Posts//Posts';
import NewPostModal from '../Posts/NewPostModal';


const City = ({ currentUser, currentCity, cityPosts, addNewPost, deletePost, match }) => {
  // const [ cityPosts, setCityPosts ] = useState([]);
  const [ openModal, setOpenModal ] = useState(false);
  const [ error, setError ] = useState(null);


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
