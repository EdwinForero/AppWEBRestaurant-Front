import { createContext, useEffect, useState } from "react";
import axios from "axios";
import {useParams} from 'react-router-dom'


const CartContext = createContext();

export const CartProvider = ({ children }) => {
  /* Creamos un estado para el carrito */
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const userId = useParams().id.toString();

 
  const getProducts = async () => {
    await axios
      .get("http://20.121.138.44:5000/api/products")
      .then(({ data }) => setProducts(data.products));
  };


  const getUserCart = async () => {
    return await axios.get(`http://20.121.138.44:5000/api/products-getUserCart/${userId}`)
    .then(({data}) => setCartItems(data.userCart))
    .catch((error) => console.error(error));

  }


  useEffect(() => {
    getProducts();
    getUserCart();
  }, []);





  const addItemToCart = async (product, userId) => {
    const { name, img, price } = product;


    await axios.post(`http://20.121.138.44:5000/api/products-addCart/${userId}`, {name, img, price});

    getProducts();
    getUserCart();

  };



  const editItemToCart = async (id, query, amount) => {
    if (query === "del" && amount === 1) {
      await axios
        .delete(`http://20.121.138.44:5000/api/products-cart/${id}`)
        .then(({ data }) => console.log(data));
    } else {
      await axios
        .put(`http://20.121.138.44:5000/api/products-cart/${id}?query=${query}`, {
          amount,
        })
        .then(({ data }) => console.log(data));
    }

    getProducts();
    getUserCart();
  };

  return (
    /* Envolvemos el children con el provider y le pasamos un objeto con las propiedades que necesitamos por value */
    <CartContext.Provider
      value={{ cartItems, products, addItemToCart, editItemToCart, getUserCart}}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;