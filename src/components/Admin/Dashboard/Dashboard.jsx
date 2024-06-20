import React, { use, Suspense, useState } from 'react';
import './Dashboard.css';
import AddProduct from './AddProduct';
import { postRequest } from '../../../functions';

const fetchProducts = async () => {
  const res = await fetch(
    'https://react-synopsis.dittelh.dk/server/endpoints/getProducts.php'
  );
  return res.json();
};

const ProductItem = ({ product, removeProduct }) => {
  const deleteProduct = (formData) => {
    postRequest('https://react-synopsis.dittelh.dk/server/endpoints/deleteProduct.php', {
      id: formData.get('id'),
    })
      .then((res) => {
        removeProduct(product);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="itemContainer">
        <img
          className="itemImg"
          src={product.imgPath}
          alt={product.productName}
        />
        <div className="itemText">
          <h3 className="itemName">{product.productName}</h3>
          <p className="itemPrice">{product.price} kr.</p>
        </div>
        <form action={deleteProduct}>
          <input type="hidden" id="id" name="id" value={product.productID} />
          <button className="deleteBtn" type="submit">
            Slet produkt
          </button>
        </form>
      </div>
    </>
  );
};

const ProductItems = () => {
  const productsRequest = use(fetchProducts());
  const [allProducts, setAllProducts] = useState(productsRequest.products);

  const removeProduct = (product) => {
    setAllProducts(
      allProducts.filter((item) => {
        return item !== product;
      })
    );
  };

  return (
    <div>
      {allProducts.map((product, index) => (
        <ProductItem
          key={index}
          product={product}
          removeProduct={removeProduct}
        />
      ))}
    </div>
  );
};

const Dashboard = ({ setIsLoggedIn }) => {
  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="centerDiv">
        <h1 className="titleH2">Admin panel</h1>
        <p>
          På denne side kan der redigeres i produkterne. Der kan slettes,
          opdateres og oprettes.
        </p>
        <button className="logoutBtn" onClick={logout}>
          Log ud
        </button>
      </div>
      <AddProduct />
      <div className="addedProductDiv">
        <h2 className="titleH2">Oprettede produkter:</h2>
        <div className="addedDiv">
          <Suspense fallback={<h2>Indlæser...</h2>}>
            <ProductItems />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
