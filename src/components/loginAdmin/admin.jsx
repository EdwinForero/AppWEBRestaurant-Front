import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';


const AdminPanel = () => {
  const [invoices, setInvoices] = useState([]);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState('');
  const [showInvoices, setShowInvoices] = useState(true);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    axios
      .get(`http://20.121.138.44:5000/api/admin/${id}`)
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
    fetchComments();
  }, [id, navigate]);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('http://20.121.138.44:5000/api/admin-payment/');
      setInvoices(response.data.esta);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get('http://20.121.138.44:5000/api/get-comments');
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (invoiceId, newStatus) => {
    try {
      await axios.put(`http://20.121.138.44:5000/api/admin-payment/${id}/${invoiceId}`, { state: newStatus });
      fetchInvoices();

      if (newStatus === 'Por pagar') {
        showToast('El estado se ha cambiado a "Por pagar"');
      } else if (newStatus === 'Pagado') {
        showToast('El estado se ha cambiado a "Pagado"');
      }
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

  const handleShowInvoices = () => {
    setShowInvoices(true);
    setShowComments(false);
  };

  const handleShowComments = () => {
    setShowInvoices(false);
    setShowComments(true);
  };

  return (
    <div>
      <div className={styles.navbar}>
        <div></div>
        <div className={styles.logoutContainer}>
          <button onClick={handleShowComments} className={styles.logoutButton}>Ver Comentarios</button> <button onClick={handleShowInvoices} className={styles.logoutButton}>Pedidos</button> <button onClick={() => navigate('/')} className={styles.logoutButton}>Cerrar Sesión</button>
        </div>
      </div>

      {showInvoices && (
        <table className={styles.invoicesTable} cellSpacing='5'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Descripción</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice._id}>
                <td>{invoice._id}</td>
                <td>{invoice.username}</td>
                <td>{invoice.price}</td>
                <td>{invoice.state}</td>
                <td>{invoice.descripcion}</td>
                <td>{moment(invoice.date).format('DD-MM-YYYY-HH:mm:ss')}</td>
                <td>
                  <select
                    value={invoice.state}
                    onChange={(e) => handleStatusChange(invoice._id, e.target.value)}
                    disabled={invoice.state === 'En cocina' || invoice.state === 'Pagado'}
                  >
                    <option value="Por pagar">Por Pagar</option>
                    <option value="Pagado">Pagado</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showComments && (
        <table className={styles.commentsTable} cellSpacing='10'>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Comentario</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment.id}>
                <td>{comment.correo}</td>
                <td>{comment.comentario}</td>
                <td>{moment(comment.date).format('DD-MM-YYYY-HH:mm:ss')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {toastMessage && <div className={styles.toast}>{toastMessage}</div>}
    </div>
  );
};

export default AdminPanel;
