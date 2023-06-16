import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import axios from 'axios';

const Pay = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const price = queryParams.get('total');
  const [mensaje, setMensaje] = useState('');
  const { id } = useParams();
  const [name, setName] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const navigate = useNavigate();


  const obtenerFecha = () => {
    const date = new Date();
    const dates = date.toLocaleDateString();
    const time = date.toLocaleTimeString();
    return `${dates} ${time}`;
  }

  useEffect(() => {
    const finalDate = setInterval(() => {
      const date = obtenerFecha();
      setCurrentDate(date);
    }, 500);

    return () => {
      clearInterval(finalDate);
    };
  }, []);

  useEffect(() => {
    axios.get(`http://20.121.138.44:5000/api/user/${id}`)
      .then(({ data }) => setName(data.nombre.charAt(0).toUpperCase() + data.nombre.slice(1)))
      .catch((error) => console.error(error));
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const fPrice = {
      price,
    };

    await axios.post(`http://20.121.138.44:5000/api/pay/${id}`, fPrice)
      .then(() => {
        axios.delete(`http://20.121.138.44:5000/api/pay-delete/${id}`);
        axios.delete("http://20.121.138.44:5000/api/products-emptyCart");

        setMensaje(
          'Pedido realizado. En unos momentos llegará el pedido a tu mesa'
        );

        setTimeout(() => {
          navigate(`/menu/${id}`);
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
        setMensaje('Error al procesar el pedido. Inténtalo de nuevo más tarde.');
      });
  };

  return (
    <div className={styles.payContainer}>
      <form onSubmit={handleSubmit}>
        <h1 className={styles.payTitle}>Confirma tu pedido</h1>
        <div className={styles.factura}>
          <div className={styles.facturaItem}>
            <span className={styles.facturaLabel}>ID de Usuario:</span>
            <span className={styles.facturaValue}>{id}</span>
          </div>
          <div className={styles.facturaItem}>
            <span className={styles.facturaLabel}>Nombre: </span>
            <span className={styles.facturaValue}>{name}</span>
          </div>
          <div className={styles.facturaItem}>
            <span className={styles.facturaLabel}>Fecha: </span>
            <span className={styles.facturaValue}>{currentDate}</span>
          </div>
          <div className={styles.facturaItem}>
            <span className={styles.facturaLabel}>Precio Total:</span>
            <span className={styles.facturaValue}>${price}</span>
          </div>
        </div>
        <button className={styles.payButton} type="submit">Pedir</button> <button className={styles.payButton} onClick={() => navigate(`/menu/${id}`)}>Regresar</button>
      </form>
      <div className={styles.toast}>{mensaje}</div>
    </div>
  );
};

export default Pay;
