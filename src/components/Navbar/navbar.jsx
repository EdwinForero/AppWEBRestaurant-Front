import React, { useEffect, useState } from "react";
import styles from './styles.module.scss';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

const Navbar = () => {

  const navigate = useNavigate();
  const [name, setName] = useState();

  const {id}  = useParams();

 


  useEffect(() => {
    axios.get(`http://20.121.138.44:5000/api/user/${id}`)
      .then(({ data }) => setName(data.nombre.charAt(0).toUpperCase() + data.nombre.slice(1)))
      .catch((error) => console.error(error));
  }, [id]);



  return (
    <nav className={styles.navbar}>
      <div>
        <p className={styles.p}>Bienvenido {name}</p>
      </div>
      <NavLink className={styles.navtitle} to={`/inicio/${id}`}>
        <div>
          <span>Inicio</span>
        </div>
      </NavLink>
      <NavLink className={styles.navtitle} to={`/menu/${id}`}>
        <div>
          <span>Menú</span>
        </div>
      </NavLink>
      <button className={styles.button} onClick={() => navigate(`/aboutus/${id}`)}>Sobre nosotros</button>
      <button className={styles.button} onClick={() => navigate(`/editprofile/${id}`)}>Actualiza tu perfil</button>
      <button className={styles.button} onClick={() => navigate('/')}>
        Cerrar sesión
      </button>
    </nav>
  );
};

export default Navbar;