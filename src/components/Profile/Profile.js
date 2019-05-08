import React from 'react';
import Post from '../Posts/Post';

const Profile = ({ currentUser, user, userPosts, error, deletePost }) => {
  console.log('Profile Posts', userPosts)
  const signUpDate = user && `${new Date(user.sign_up_date).toLocaleDateString()} @ ${new Date(user.sign_up_date).toLocaleTimeString()}`;
  // const signUpDate =  `${new Date(user.sign_up_date).toUTCString()}`;

  const posts = userPosts
    .sort((a,b) => new Date(b.date_created) - new Date(a.date_created))
    .map(post => <Post key={post._id} post={post} titleOnly={true} showButtons={true} currentUser={currentUser} deletePost={deletePost} />);

  return (
    <main className='user-profile'>
      <section>
        { error ? error : null }
        <h2>Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Current City:</strong> {user.city}</p>
        <p><strong>Sign Up Date:</strong> {signUpDate}</p>
        {currentUser === user._id ? <button>Edit</button> : null}
      </section>
      <section>
        <h2>Posts</h2>
        {posts}
      </section>
    </main>
  );
};

export default Profile;
