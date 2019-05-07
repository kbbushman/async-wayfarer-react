import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ post, titleOnly, showButtons, deletePost, currentUser }) => {
  return (
    <article>
      <h4><Link to={`/posts/${post._id}`}>{post.title}</Link></h4>
      {!titleOnly
        ? <><small><strong>By:</strong> <Link to={`/profile/${post.userId._id}`}>{post.userId.name}</Link></small>
          <p>{post.body}</p></>
        : null}
        {showButtons // && currentUser === post.userId._id
          ? <div className='button-group'>
              <button className='right'>Edit</button>
              <button className='delete right' onClick={() => deletePost(post._id)}>Delete</button>
            </div>
          : null}
    </article>
  );
};

export default Post;
