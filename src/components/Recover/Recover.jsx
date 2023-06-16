import React, { useState } from "react";
import axios from "axios";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";


const PasswordRecovery = () => {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mail = {
      correo,
    };

    if(correo !== ""){
      await axios.put("http://20.121.138.44:5000/api/recover", mail)
      .then(() => {
        setMensaje("El correo ha sido enviado a " + mail.correo);
      })
    }else{
      setMensaje("Correo no enviado intente de nuevo");
    }

  };
  return (
    <div className={styles.passwordrecovery}>
      <h2 className={styles.h2}>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="correo">Ingrese su correo electrónico</label>
        <input className={styles.input} placeholder="example@example.com" type="email" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        <button type="submit">Recuperar</button> <button onClick={() => navigate("/")}>Regresar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default PasswordRecovery;
