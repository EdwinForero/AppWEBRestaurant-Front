import React, { useContext } from "react";
import CartContext from "../../Context/CartContext";
import { useParams } from 'react-router-dom';
import styles from "./styles.module.scss";

const Products = () => {
  const { addItemToCart, products } = useContext(CartContext);
  const { id: userId } = useParams();

  return (
    <div className={styles.productsContainer}>
      {products?.map(({ img, name, price, inCart }, i) => (
        <div key={i} className={styles.product}>
          <div className={styles.productImage}>
            <img src={img} alt={name} />
          </div>
          <div className={styles.productDetails}>
            <h3>{name}</h3>
            <p className={styles.productPrice}>${price}</p>
            {!inCart ? (
              <button className={styles.addToCartButton} onClick={() => addItemToCart({ img, name, price, inCart: true }, userId)}>
                Add to Cart
              </button>
            ) : (
              <button className={styles.inCartButton}>In Cart</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
