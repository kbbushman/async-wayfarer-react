import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  overlay: {
    background: 'rgba(0,0,0,0.7)',
  },
  content: {
    top: '10%',
    left: '30%',
    right: '30%',
    bottom: '20%',
  }
};

const NewPostModal = ({ open, setOpenModal, addNewPost, setError, match }) => {
  const [ newPost, setNewPost ] = useState({title: '', body: ''});

  const handleChange = e => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/cities/${match.params.cityId}/posts`, newPost, { withCredentials: true });
      console.log(response);
      setNewPost({title: '', body: ''});
      setOpenModal(false);
      addNewPost(response.data);
    } catch (err) {
      console.log(err);
      setOpenModal(false);
      setError(err.response.data.errors);
    }
  }

  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setOpenModal(false)}
      style={customStyles}
    >
      <h2>Add New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" value={newPost.title} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <textarea type="textarea" name="body" onChange={handleChange} required />
        </div>
        <div className='button-group'>
          <button type='submit' className="right">Submit</button>
          <button type='button' className='cancel right' onClick={() => setOpenModal(false)}>Cancel</button>
        </div>
      </form>
    </Modal>
  )
}

export default NewPostModal;
