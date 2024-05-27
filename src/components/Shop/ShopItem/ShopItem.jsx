import React, { use, useActionState } from 'react';
import '../Shop.css';
import { CartContext } from '../../../App';

const fetchProducts = async () => {
  const res = await fetch(
    'http://localhost:8000/server/endpoints/getProducts.php'
  );
  return res.json();
};

const ShopItems = () => {
  const cart = use(CartContext);

  const allProducts = use(fetchProducts());

  const addToCartAction = async (prevState, formData) => {
    try {
      const product = formData.get('product');
      await cart.addToCart(product);
      return 'Tilføjet til kurven';
    } catch (e) {
      return 'Blev ikke tilføjet til kurven';
    }
  };

  const [message, formAction] = useActionState(addToCartAction, null);

  return (
    <div className="productsContainer">
      {allProducts.products.map((product, index) => (
        <div key={product.productID} className="productContainer">
          <img
            className="productImg"
            src={product.imgPath}
            alt={product.productName}
          />
          <h3 className="productName">{product.productName}</h3>
          <div className="productText">
            <p className="productP">{product.description}</p>
            <p className="productPrice">{product.price} kr.</p>
          </div>
          <form action={formAction}>
            <input
              type="hidden"
              name="product"
              value={JSON.stringify(product)}
            />
            <button type="submit">Køb produkt</button>
          </form>
          {message}
        </div>
      ))}
    </div>
  );
};

export default ShopItems;
