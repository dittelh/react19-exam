import React from 'react';
import './Login.css';

const Login = () => {
  async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST', // GET, POST, PUT, DELETE
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const loginAction = (formData) => {
    const loginData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    postData('http://localhost:8000/server/endpoints/login.php', loginData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form action={loginAction} className="loginForm">
      <label htmlFor="email">Email</label>
      <input type="text" name="email" id="email" placeholder="Indsæt email" />

      <label htmlFor="password">Adgangskode</label>
      <input
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
