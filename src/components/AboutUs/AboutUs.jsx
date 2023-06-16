import styles from "./styles.module.scss";
import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer";
import  {useParams, useNavigate, } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import axios from "axios";


const AboutUs = () => {
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };
  const [mensaje, setMensaje] = useState('');

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

  
 

    const handleSubmit = () => {
      const comentario = { comentario: userInput };
      if(userInput !== ""){
        axios.post(`http://20.121.138.44:5000/api/comment/${id}`, comentario)
        .then(() => {
          setMensaje("Reseña enviada correctamente");
          setUserInput("");
        })
        .catch((error) => {
          console.error(error);
          setMensaje('La reseña no se pudo enviar');
        });
      }else{
         setMensaje("No puede estar vacio el comentario");
      }

    };
    

  return (

    <div className={styles.container}>
      <Navbar />
      
        <div className={styles.container}>
          <div className={styles.feature}>
            <h4>La mejor comida del oeste</h4>
            <p>
              Somos la mejor opción de restaurante porque nos esforzamos constantemente
              la mejor experiencia culinaria y de servicio a nuestros
              clientes. Contamos con un equipo de chefs y personal de atención al cliente
              personal de servicio al cliente que están comprometidos con la
              lo que hacen. Además, utilizamos ingredientes frescos y de alta calidad
              en todas nuestras preparaciones para garantizar el mejor sabor y
              valor nutricional. Tanto si busca una cena romántica
              para dos, una celebración especial o simplemente una deliciosa comida, estamos
              estamos seguros de que disfrutará de su experiencia en nuestro
              restaurante. Venga a visitarnos y descubra por qué somos la mejor
              opción en la ciudad.
            </p>
          </div>
          <div className={styles.features}>

            <div className={styles.feature}>
              <h4>Ingredientes de calidad</h4>
              <p>
                Nuestros platos se preparan con ingredientes frescos y de alta calidad
                para garantizar el mejor sabor y valor nutritivo.
              </p>
            </div>
            <div className={styles.feature}>
              <h4>Servicio excepcional</h4>
              <p>
                Nuestro personal se compromete a ofrecer un servicio excepcional para
                garantizar que nuestros clientes tengan la mejor experiencia.
              </p>
            </div>
            <div className={styles.feature}>
              <h4>Ambiente acogedor</h4>
              <p>
                Nuestro restaurante ofrece un ambiente acogedor que hace que nuestros clientes se sientan como en casa.
              </p>
            </div>
            <div className={styles.feature}>
              <h4>Tu opinión cuenta</h4>
              <p>
                Envía tus felicitaciones, sugerencias o peticiones. Estamos dispuestos a escucharte.
              </p>
              <label>
                <input type="text" value={userInput} onChange={handleInputChange} />
              </label>
              <button className={styles.button} onClick={handleSubmit}>Enviar</button>
            </div>
              {mensaje && <div className={styles.toast}>{mensaje}</div>}
          </div>
          <Footer />
        </div>
      
      
    </div>
  );
};

export default AboutUs;