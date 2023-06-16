import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.scss';

const EditProfile = () => {
  const [nombre, setNombre] = useState('');
  const [contraseña, setContrasenia] = useState('');
  const [contraseñaConf, setContraseniaConf] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  

  const [name, setName] = useState('');

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




  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleContraseniaChange = (e) => {
    setContrasenia(e.target.value);
  };

  const handleContraseniaConfChange = (e) => {
    setContraseniaConf(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editUser = {
      nombre,
      contraseña,
      contraseñaConf,
    };

    if (nombre !== '' && contraseña !== '' && contraseñaConf !== '') {
      if (contraseña === contraseñaConf) {
        await axios
          .put(`http://20.121.138.44:5000/api/editprofile/${id}`, editUser)
          .then(() => {
            setMensaje('Información actualizada con éxito');
            setTimeout(() => {
              navigate(`/menu/${id}`);
            }, 1000);
          })
          .catch((error) => {
            console.error(error);
            setMensaje('Hubo un error al actualizar la información');
          });
      } else {
        setMensaje('Las contraseñas no coinciden');
      }
    } else {
      setMensaje('Por favor, complete todos los campos');
    }
  };

  return (
    <div className={styles.container}>
      <main>
        <h3>Edita tu perfil</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input placeholder='Ingresa tu nombre' type="text" value={nombre} onChange={handleNombreChange} />
          </label>
          <label>
            Contraseña:
            <input type="password" placeholder='Ingresa tu contraseña' value={contraseña} onChange={handleContraseniaChange} />
          </label>
          <label>
            Confirmar Contraseña:
            <input type="password" placeholder="Confirma tu contraseña" value={contraseñaConf} onChange={handleContraseniaConfChange} />
          </label>
          <button type="submit">Actualizar</button>{' '}
          <button type="button" onClick={() => navigate(`/menu/${id}`)}>
            Regresar
          </button>
        </form>
        <p>{mensaje}</p>
      </main>
    </div>
  );
};

export default EditProfile;
