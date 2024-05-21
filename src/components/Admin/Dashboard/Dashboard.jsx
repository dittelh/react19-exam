import React, { useState } from 'react';
import './Dashboard.css';
import AddProduct from './AddProduct';

const ProductItem = ({ product }) => {
  return (
    <div>
      <h3>{product.name}</h3>
    </div>
  );
};

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  const addProduct = (newProduct) => {
    setProducts((products) => [...products, newProduct]);
  };

  return (
    <>
      <h1>Admin panel</h1>
      <p>
        På denne side kan der redigeres i produkterne. Der kan slettes,
        opdateres og oprettes.
      </p>
      <AddProduct addProduct={addProduct} />
      {products.map((product, index) => (
        <ProductItem key={index} product={product} />
      ))}
    </>
  );
};

export default Dashboard;
