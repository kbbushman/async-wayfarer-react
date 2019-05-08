import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setCurrentUser, history }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState(null);

  const handleChange = event => {
    if (event.target.name === 'email') setEmail(event.target.value);
    if (event.target.name === 'password') setPassword(event.target.value);
  }

  const handleSubmit = async event => {
    event.preventDefault();
    const userData = { email, password };
    
    try {
      // const options = {
      //   url: `${process.env.REACT_APP_API}/auth/login`,
      //   method: 'POST',
      //   data: JSON.stringify(userData),
      //   withCredentials: true, 
      //   headers: { 'Content-Type': 'application/json' },
      // }

      const response = await axios.post(`${process.env.REACT_APP_API}/auth/login`, userData, { withCredentials: true });
      console.log(response);
      // FETCH EXAMPLE
      // const response = await fetch(`${process.env.REACT_APP_API}/auth/login`, {
      //   method: 'POST',
      //   credentials: 'include',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(userData)
      // });

      const currentUser = response.data.currentUser;
      localStorage.user = currentUser;
      setCurrentUser(currentUser);
      history.push(`/profile/${currentUser}`);
    } catch (err) {
      console.log(err);
      setError(err.response.data.errors);
    }
  }

  return (
    <section className="form">
      <div>{error ? error : null}</div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" placeholder="Email Address" value={email} onChange={handleChange} autoFocus={true} />
        <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} />
        <input type="submit" value="Submit"/>
      </form>
    </section>
  )
}

export default Login;
