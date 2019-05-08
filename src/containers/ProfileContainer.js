import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profile from '../components/Profile/Profile';

const ProfileContainer = ({ currentUser, match }) => {
  const [ user, setUser ] = useState({});
  const [ userPosts, setUserPosts ] = useState([]);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        console.log('GETTING PROFILE AND POSTS...');
        const userId = match.params.userId;
        const response = await axios.get(`${process.env.REACT_APP_API}/users/${userId}`, { withCredentials: true });
        // FETCH EXAMPLE
        // const response = await fetch(`${process.env.REACT_APP_API}/auth/users`, { method: 'GET', credentials: 'include' });
        // const data = await response.json();
        setUser(response.data.user);
        setUserPosts(response.data.userPosts);
      } catch (err) {
        err && err.response ? setError(err.response.data.errors) : setError(err);
      }
    };

    getProfile();
  }, [match.params.userId]);


  const deletePost = async postId => {
    if (window.confirm('Are you sure about that...?')) {
      try {
        console.log('DELETING PROFILE POST...');
        await axios.delete(`${process.env.REACT_APP_API}/posts/${postId}`, { withCredentials: true });
        const updatedPosts = userPosts.filter(post => post._id !== postId);
        setUserPosts(updatedPosts);
      } catch (err) {
        console.log(err);
        err.response ? setError(err.response.data.error) : setError(err);
      }
    }
  };

  return <Profile currentUser={currentUser} user={user} userPosts={userPosts} error={error} deletePost={deletePost} />;
}

export default ProfileContainer;
