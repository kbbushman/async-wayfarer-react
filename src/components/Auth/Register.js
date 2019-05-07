import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ history }) => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ city, setCity ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ password2, setPassword2 ] = useState('');
  const [ errors, setErrors ] = useState([]);

  const handleChange = event => {
    switch(event.target.name) {
      case 'name':
        return setName(event.target.value);
      case 'email':
        return setEmail(event.target.value);
      case 'city':
        return setCity(event.target.value);
      case 'password':
        return setPassword(event.target.value);
      case 'password2':
        return setPassword2(event.target.value);
      default:
        return;
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const userData = { name, email, city, password, password2 };
    
    try {
      await axios.post(`${process.env.REACT_APP_API}/auth/register`, userData, {withCredentials: true});
      history.push('/login');
    } catch (err) {
      console.log(err.response.data.errors)
      setErrors(err.response.data.errors);
    }
  };

  return (
    <section className="form">
      <div>{errors ? errors.map(error => `${error.message}. `) : errors}</div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={name} onChange={handleChange} autoFocus={true} />
        <input type="text" name="email" placeholder="Email Address" value={email} onChange={handleChange} />
        <input type="text" name="city" placeholder="City" value={city} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} />
        <input type="password" name="password2" placeholder="Confirm Password" value={password2} onChange={handleChange} />
        <input type="submit" value="Submit"/>
      </form>
    </section>
  );
};

export default Register;
