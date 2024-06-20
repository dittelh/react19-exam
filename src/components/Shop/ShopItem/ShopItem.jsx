import React, { use } from 'react';
import '../Shop.css';
import { CartContext } from '../../../App';

const fetchProducts = async () => {
  const res = await fetch('https://react-synopsis.dittelh.dk/server/endpoints/getProducts.php');
  return res.json();
};

const ShopItems = () => {
  const cart = use(CartContext);

  

  const allProducts = use(fetchProducts());

  const addToCartAction = (formData) => {
    const product = formData.get('product');
    cart.addToCart(product);
  };

  return (
    <div className="productsContainer">
      {allProducts.products.map((product) => (
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
          <form action={addToCartAction}>
            <input
              type="hidden"
              name="product"
              value={JSON.stringify(product)}
            />
            <button type="submit">Køb produkt</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default ShopItems;
