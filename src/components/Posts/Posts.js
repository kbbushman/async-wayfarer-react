import React from 'react';
import Post from './Post';

const Posts = ({ posts, deletePost, currentUser }) => {

  // SORT POSTS BY DESC Date
  let postList = posts
    .sort((a,b) => new Date(b.date_created) - new Date(a.date_created))
    .map(post => <Post key={post._id} post={post} titleOnly={false} showButtons={true} deletePost={deletePost} currentUser={currentUser} />);


  return postList;
};

export default Posts;
