import React, { use } from 'react';
import { CartContext } from '../../App';

const Cart = () => {
  const cart = use(CartContext);

  const uniqueItems = [];
  for (let i = 0; i < cart.cartItems.length; i++) {
    let currentItem = cart.cartItems[i];
    currentItem.amount = 1;
    let existingProduct = uniqueItems.find(
      (item) => item.productID === currentItem.productID
    );

    if (existingProduct === undefined) {
      uniqueItems.push(currentItem);
    } else {
      existingProduct.amount++;
    }
  }

  return (
    <>
      <h1 className="title">Din kurv</h1>
      <div className="productsContainer">
        {uniqueItems.map((product) => (
          <div key={product.productID} className="productContainer">
            <img
              className="productImg"
              key={product.imgPath}
              src={product.imgPath}
              alt={product.productName}
            />
            <h3 className="productName">{product.productName}</h3>
            <div className="productText">
              <p className="productP">{product.description}</p>
              <p className="productPrice">{product.price} kr.</p>
              <p className="productPrice">Antal: {product.amount}</p>
            </div>
            <button onClick={() => cart.deleteFromCart(product)}>Slet fra kurv</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cart;
