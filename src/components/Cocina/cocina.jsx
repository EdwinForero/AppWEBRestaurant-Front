import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.scss';
import { useNavigate, useParams } from 'react-router-dom';

const Cocina = () => {
  const [invoices, setInvoices] = useState([]);
  const [name, setName] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    axios
      .get(`http://20.121.138.44:5000/api/cocinero/${id}`)
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

    fetchInvoices();
  }, [id, navigate]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('http://20.121.138.44:5000/api/admin-payment/');
      setInvoices(response.data.esta);
    } catch (error) {
      console.error(error);
    }
  };

  const showToast = (message) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleStatusChange = async (invoiceId, newStatus) => {
    try {
      await axios.put(`http://20.121.138.44:5000/api/cocinero-payment/${id}/${invoiceId}`, { state: newStatus });
      fetchInvoices();

      if (newStatus === 'En cocina') {
        showToast('El estado se ha cambiado a "En cocina"');
      } else if (newStatus === 'Por pagar') {
        showToast('El estado se ha cambiado a "Por pagar"');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className={styles.navbar}>
        <div></div>
        <div className={styles.logoutContainer}>
          <button onClick={() => navigate('/')} className={styles.logoutButton}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      <table className={styles.invoicesTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice._id}>
              <td>{invoice._id}</td>
              <td>{invoice.username}</td>
              <td>{invoice.descripcion}</td>
              <td>{invoice.state}</td>
              <td>{invoice.date}</td>
              <td>
                {invoice.state === 'Pagado' ? (
                  <span>Finalizado</span>
                ) : (
                  <select
                    value={invoice.state}
                    onChange={(e) => handleStatusChange(invoice._id, e.target.value)}
                  >
                    <option value="En cocina" disabled={invoice.state === 'Por pagar'}>
                      En cocina
                    </option>
                    <option value="Por pagar">Por pagar</option>
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {toastMessage && <div className={styles.toast}>{toastMessage}</div>}
    </div>
  );
};

export default Cocina;
