import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Login from './components/Admin/Login';
import TabBar from './components/TabBar/TabBar';

function App() {
  return (
    <>
      <Header />
      <Login/>
      {/* <TabBar/> */}
    </>
  );
}

export default App;
