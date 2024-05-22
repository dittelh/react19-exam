import React, { useState, use, Suspense } from 'react';
import './Dashboard.css';
import AddProduct from './AddProduct';

const fetchProducts = async () => {
  const res = await fetch(
    'http://localhost:8000/server/endpoints/getProducts.php'
  );
  return res.json();
};

const ProductItem = ({ product }) =>  {
  return (
    <div>
      <h3>{product.productName}</h3>
    </div>
  )
}

const ProductItems = () => {
  const allProducts = use(fetchProducts());
  console.log(allProducts.products);

  return (
    <div>
        {allProducts.products.map((product, index) => (
        <ProductItem key={index} product={product} />
      ))}
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
      <Suspense fallback={<h2>Indlæser...</h2>}>
        <ProductItems />
      </Suspense>
    
    </>
  );
};

export default Dashboard;
