import React, { Component } from 'react';
import axios from 'axios';
import Profile from '../components/Profile/Profile';

class ProfileContainer extends Component {
  state = {
    user: {},
    userPosts: [],
    error: null,
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    try {
      console.log('GETTING PROFILE...');
      const { match } = this.props;
      const userId = match.params.userId;
      const response = await axios.get(`${process.env.REACT_APP_API}/users/${userId}`, { withCredentials: true });
      this.setState({
        user: response.data.user,
        userPosts: response.data.posts
      });
    } catch (err) {
      err && err.response ? this.setState({error: err.response.data.errors}) : this.setState({error: err});
    }
  };
  
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.getProfile();
    }
  }

  render() {
    const { currentUser } = this.props;

    return <Profile currentUser={currentUser} user={this.state.user} userPosts={this.state.userPosts} error={this.state.error} />;
  }
}

export default ProfileContainer;
