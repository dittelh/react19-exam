import React from 'react';
import './Dashboard.css';
import { postRequest } from '../../../functions';

const AddProduct = ({ addProduct }) => {
    
  const addProductAction = (formData) => {
    const newProduct = {
      name: formData.get('name'),
      imgPath: formData.get('imgPath'),
      price: formData.get('price'),
      description: formData.get('description'),
      category: formData.get('category'),
      stock: formData.get('stock'),
    };

    postRequest(
      'http://localhost:8000/server/endpoints/addProduct.php',
      newProduct
    )
      .then((res) => {
        addProduct(newProduct);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form action={addProductAction} className="forms">
        <h2>Opret produkt:</h2>
        <label htmlFor="name">Produkt navn:</label>
        <input
          type="text"
          required
          name="name"
          id="name"
          placeholder="Indsæt produktets navn"
        />

        <label htmlFor="imgPath">Billede sti:</label>
        <input
          type="text"
          required
          name="imgPath"
          id="imgPath"
          placeholder="Indsæt billedets sti"
        />

        <label htmlFor="price">Prisen:</label>
        <input
          type="number"
          required
          name="price"
          id="price"
          placeholder="Indsæt prisen"
        />

        <label htmlFor="description">Beskrivelsen:</label>
        <input
          type="text"
          required
          name="description"
          id="description"
          placeholder="Indsæt beskrivelsen"
        />

        <label htmlFor="category">Kategori:</label>
        <select name="category" id="category">
          <option value="Alcholic">Med alkohol</option>
          <option value="Non-alcholic">Uden alkohol</option>
        </select>

        <label htmlFor="stock">Antal:</label>
        <input
          type="number"
          required
          name="stock"
          id="stock"
          placeholder="Indsæt antal"
        />
        <button type="submit">Opret produkt</button>
      </form>
    </>
  );
};

export default AddProduct;
