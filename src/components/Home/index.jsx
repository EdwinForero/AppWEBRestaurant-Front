import styles from './styles.module.scss'
import Cart from  '../Cart';
import Products from '../Products'
import  {CartProvider} from "../../Context/CartContext";
import Navbar from "../Navbar/navbar"
import Footer from "../Footer/footer"
import  {useParams, useNavigate, } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import axios from "axios";

const Home = () => { 

  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    axios
      .get(`http://20.121.138.44:5000/api/user/${id}`)
      .then(({ data }) => {
        if (data.nombre) {
          setName(data.nombre);
        } else {
          navigate('/');
        }
      })
      .catch((error) => {
        console.error(error);
        navigate('/');
      });
    });




  return (
    <CartProvider>
    <div className={styles.home}>
    <Navbar/>
    <h2 className={styles.h2}>Elige lo que mas desees!</h2>
    <h1></h1>
        <Cart />
        <Products />
    </div>
    </CartProvider>
  )
}

export default Home;