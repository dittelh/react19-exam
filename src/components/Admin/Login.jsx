import React from 'react';
import './Login.css';
import { postRequest } from '../../functions';

const Login = () => {

  const loginAction = (formData) => {
    const loginData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    postRequest('http://localhost:8000/server/endpoints/login.php', loginData)
      .then((res) => {
        if (res.code === 200) {
          console.log('Logget ind');
          localStorage.setItem('isLoggedIn', 'true');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form action={loginAction} className="loginForm">
      <label htmlFor="email">Email</label>
      <input
        required
        type="text"
        name="email"
        id="email"
        placeholder="Indsæt email"
      />

      <label htmlFor="password">Adgangskode</label>
      <input
        required
        type="password"
        name="password"
        id="password"
        placeholder="Indsæt adgangskode"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
