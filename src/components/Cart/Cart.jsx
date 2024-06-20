import React, { use, useState, useActionState } from 'react';
import { CartContext } from '../../App';
import './Cart.css';

const Cart = () => {
  const cart = use(CartContext);

  var totalPrice = 0;
  for (let i = 0; i < cart.cartItems.length; i++) {
    totalPrice += parseFloat(cart.cartItems[i].price);
  }

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

  const buyCartItems = (PrevState, FormData) => {
    const fullname = FormData.get('fullname');
    cart.buyItems();

    return 'Tak ' + fullname + ', for din ordre!';
  };

  const [message, formAction] = useActionState(buyCartItems, null);

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
            <button
              className="deleteBtn"
              onClick={() => cart.deleteFromCart(product)}
            >
              Slet fra kurv
            </button>
          </div>
        ))}
      </div>

      <form action={formAction} className="forms">
        {message !== null && <p className="orderSucces">{message}</p>}
        <h2>Dine oplysninger:</h2>
        <label className="labels" htmlFor="fullname">
          Fulde navn:
        </label>
        <input
          type="text"
          required
          name="fullname"
          id="fullname"
          placeholder="Indsæt dit fulde navn her"
        />
        <p className="labels">Pris i alt: {totalPrice} kr.</p>
        <button type="submit">Gennemfør ordren</button>
      </form>
    </>
  );
};

export default Cart;
