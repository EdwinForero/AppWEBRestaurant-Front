import React, { useState, useEffect} from "react";
import styles from "./styles.module.scss";
import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer";
import axios from "axios";
import  {useParams, useNavigate} from 'react-router-dom';



const Inicio = () => {
  const [userInput, setUserInput] = useState('');
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


  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = () => {
    // Aquí puedes realizar alguna acción con el texto ingresado por el usuario
    console.log(userInput);
  };

  const recomendacionDelDia = "Ceviche de camarones";
  const imagenRecomendacion = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.comedera.com%2Fceviche-de-camarones-ecuatoriano-riquisimo-y-muy-facil%2F&psig=AOvVaw1nstYtOyp0DziUBxA25kyN&ust=1685935635995000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMjUz9nVqP8CFQAAAAAdAAAAABAJ";

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.feature}>
          <h4>¡Bienvenido a nuestro restaurante!</h4>
          <p>
            En nuestro establecimiento, nos enorgullece ofrecerte una experiencia culinaria única. Nos apasiona preparar platos deliciosos que despierten tus sentidos y te transporten a un mundo lleno de sabores auténticos.
            Nuestro compromiso se basa en utilizar ingredientes frescos y de la más alta calidad para brindarte una experiencia gastronómica inigualable. Cada plato es cuidadosamente elaborado por nuestros talentosos chefs, quienes combinan técnicas culinarias innovadoras con recetas tradicionales para crear verdaderas obras maestras culinarias.
            En nuestro menú, encontrarás una amplia selección de opciones exquisitas que harán las delicias de tu paladar. Desde platos clásicos reinventados hasta creaciones únicas inspiradas en diversas culturas, nuestro objetivo es sorprenderte con cada bocado.
            Además de nuestra pasión por la comida, nos esforzamos por ofrecerte un ambiente acogedor y un servicio excepcional. Queremos que te sientas como en casa, relajado y bien atendido, para que tu visita sea una experiencia verdaderamente placentera.
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
            <h4>Recomendación del Día</h4>
            <p>¡No puedes perderte nuestro plato estrella: El Ceviche con camarones!</p>
            <div className={styles.img}>
                <img src="https://www.eltiempo.com/uploads/2021/11/04/6184795f1ffc2.jpeg"></img>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Inicio;
