import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Login from './components/Admin/Login';
import TabBar from './components/TabBar/TabBar';
import Dashboard from './components/Admin/Dashboard/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn')
  );

  return (
    <>
      <Header />
      {isLoggedIn ? <Dashboard /> : <Login />}

      {/* <TabBar/> */}
    </>
  );
}

export default App;
