import React, { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import './Dashboard.css';
import { postRequest } from '../../../functions';

const Submit = () => {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit">
      {pending ? 'Loader...' : 'Opret produkt'}
    </button>
  );
};

const AddProduct = () => {
  const addProductAction = async (prevState, formData) => {
    const newProduct = {
      name: formData.get('name'),
      imgPath: formData.get('imgPath'),
      price: formData.get('price'),
      description: formData.get('description'),
      category: formData.get('category'),
      stock: formData.get('stock'),
    };

    var message = '';
    await postRequest(
      'https://react-synopsis.dittelh.dk/server/endpoints/addProduct.php',
      newProduct
    )
      .then((res) => {
        message = 'Produktet blev tilføjet!';
      })
      .catch((err) => {
        message = 'Produktet er ikke blevet tilføjet';
      });
    return message;
  };

  const [message, formAction] = useActionState(addProductAction, null);

  return (
    <>
      <form action={formAction} className="forms">
        <h2>Opret produkt:</h2>
        <label className="labels" htmlFor="name">
          Produkt navn:
        </label>
        <input
          type="text"
          required
          name="name"
          id="name"
          placeholder="Indsæt produktets navn"
        />

        <label className="labels" htmlFor="imgPath">
          Billede sti:
        </label>
        <input
          type="text"
          required
          name="imgPath"
          id="imgPath"
          placeholder="Indsæt billedets sti"
        />

        <label className="labels" htmlFor="price">
          Prisen:
        </label>
        <input
          type="number"
          required
          name="price"
          id="price"
          placeholder="Indsæt prisen"
        />

        <label className="labels" htmlFor="description">
          Beskrivelsen:
        </label>
        <input
          type="text"
          required
          name="description"
          id="description"
          placeholder="Indsæt beskrivelsen"
        />

        <label className="labels" htmlFor="category">
          Kategori:
        </label>
        <select name="category" id="category">
          <option value="Alcholic">Med alkohol</option>
          <option value="Non-alcholic">Uden alkohol</option>
        </select>

        <label className="labels" htmlFor="stock">
          Antal:
        </label>
        <input
          type="number"
          required
          name="stock"
          id="stock"
          placeholder="Indsæt antal"
        />
        <Submit />
        {message}
      </form>
    </>
  );
};

export default AddProduct;
