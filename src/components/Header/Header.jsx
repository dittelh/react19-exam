import React, { use } from 'react';
import logo from '../../assets/logo.png';
import './Header.css';
import { CartContext } from '../../App';

const Header = ({ setCurrentComponent }) => {
  const cart = use(CartContext);

  const setComponent = (component) => {
    setCurrentComponent(component);
  };

  return (
    <div className="header">
      <img className="logo" src={logo} alt="Logo" />
      <div className='buttonDiv'>
        <button className='headerBtn' onClick={() => setComponent('shop')}>Shoppen</button>
        <button className='headerBtn' onClick={() => setComponent('cart')}>
          Kurv {cart.cartItems.length}
        </button>
        <button className='headerBtn' onClick={() => setComponent('admin')}>Admin login</button>
      </div>
    </div>
  );
};

export default Header;
