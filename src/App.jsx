import { useState, createContext } from 'react';
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
          <Dashboard setIsLoggedIn={setIsLoggedIn} />
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
