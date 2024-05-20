import React, { useState, useEffect } from 'react';
import './TabBar.css';

const TabBar = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [tabStyle, setTabStyle] = useState('home-style');

  const handleTabClick = (e, tab) => {
    e.preventDefault();
    e.stopPropagation();

    if (tab === activeTab) {
      return;
    }

    setActiveTab(tab);
    setTabStyle(`${tab}-style`);
  };

  useEffect(() => {
    const uls = document.querySelectorAll('ul');

    uls.forEach((ul) => {
      const resetClass = ul.parentNode.getAttribute('class');

      ul.parentNode.setAttribute(
        'class',
        `${resetClass.split(' ')[0]} ${tabStyle}`
      );
    });
  }, [tabStyle]);

  return (
    <div className="container">
      <div className={`tabbar tab-style4 ${tabStyle}`}>
        <ul className="flex-center">
          <li
            className={`home ${activeTab === 'home' ? 'active' : ''}`}
            data-where="home"
            onClick={(e) => handleTabClick(e, 'home')}
          >
            <span className="material-icons-outlined">home</span>
          </li>
          <li
            className={`products ${activeTab === 'products' ? 'active' : ''}`}
            data-where="products"
            onClick={(e) => handleTabClick(e, 'products')}
          >
            <span className="material-icons-outlined">shopping_bag</span>
          </li>
          <li
            className={`help ${activeTab === 'help' ? 'active' : ''}`}
            data-where="help"
            onClick={(e) => handleTabClick(e, 'help')}
          >
            <span className="material-icons-outlined">shopping_cart</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TabBar;
