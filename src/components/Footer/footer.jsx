import React from 'react';
import styles from './styles.module.scss';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerSection}>
                    <h4>Sobre nosotros</h4>
                    <table>
                        <tbody>
                            <tr>
                                <td><a href="/aboutus/${id}">Equipo</a></td>
                            </tr>
                            <tr>
                                <td><a href="/aboutus/${id}">Contáctanos</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={styles.footerSection}>
                    <h4>Ayuda</h4>
                    <table>
                        <tbody>
                            <tr>
                                <td><a href="/aboutus/${id}">Certificados</a></td>
                            </tr>
                            <tr>
                                <td><a href="/aboutus/${id}">Tratamiento de datos</a></td>
                            </tr>
                            <tr>
                                <td><a href="/aboutus/${id}">Términos y Condiciones</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={styles.footerSection}>
                    <h4>Síguenos</h4>
                    <table>
                        <tbody>
                            <tr>
                                <td><a href="https://www.facebook.com">Facebook</a></td>
                            </tr>
                            <tr>
                                <td><a href="https://www.twitter.com">Twitter</a></td>
                            </tr>
                            <tr>
                                <td><a href="https://www.instagram.com">Instagram</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </div>
            <p className={styles.p}>
                    Rennala Restaurant®
                </p>
        </footer>
    );
}

export default Footer;
