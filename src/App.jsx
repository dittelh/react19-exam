import { useState, createContext, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Login from './components/Admin/Login';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import Shop from './components/Shop/Shop';
import Cart from './components/Cart/Cart';

// Cart context
export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const cart = {
    cartItems: cartItems,
    addToCart: (product) => {
      let parsedItem = JSON.parse(product);
      setCartItems((oldItems) => [...oldItems, parsedItem]);
    },
    buyItems: () => {
      let orders = [];
      if (localStorage.getItem('orders') !== null) {
        orders = JSON.parse(localStorage.getItem('orders'));
      }
      orders.push(cartItems);
      localStorage.setItem('orders', JSON.stringify(orders));
      setCartItems([]);
    },
    deleteFromCart: (product) => {
      let cartItemsArray = cartItems;

      cartItemsArray = cartItemsArray.filter((item) => {
        return item !== product;
      });
      setCartItems(cartItemsArray);
    },
  };

  return <CartContext value={cart}>{children}</CartContext>;
};

// App komponentet
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn')
  );

  const [currentComponent, setCurrentComponent] = useState('shop');

  return (
    <>
      <CartProvider>
        <Header setCurrentComponent={setCurrentComponent} />
        {isLoggedIn && currentComponent === 'admin' && (
          <Dashboard setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
        )}
        {!isLoggedIn && currentComponent === 'admin' && (
          <Login setIsLoggedIn={setIsLoggedIn} />
        )}
        {currentComponent === 'shop' && <Shop />}
        {currentComponent === 'cart' && <Cart />}
      </CartProvider>
    </>
  );
}

export default App;
