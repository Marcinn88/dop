import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const Footer = ({ token }) => {
  const [loginModal, setloginModal] = useState(false);
  const [loginData, setLoginData] = useState({});
  const ref = () => {
    window.location.reload(false);
  };
  const openLoginModal = () => {
    setloginModal(true);
    setLoginData({
      login: '',
      password: '',
    });
    console.log('ModalLogin Opened');
  };
  const closeLoginModal = () => {
    setloginModal(false);
    console.log('Modal Closed');
  };

  const adminLogin = () => {
    if (loginData.login === 'admin' && loginData.password === '123') {
      console.log('loginData', loginData);
      setloginModal(false);
      localStorage.setItem('token', JSON.stringify({ token: 'admin' }));
      ref();
    } else {
      alert('Zle haslo');
    }
  };
  const errorMsg = () => {
    alert('Jesteś zalogowany');
  };

  return (
    <>
      {loginModal && (
        <>
          <div
            onClick={closeLoginModal}
            className={styles.loginShadowBox}
          ></div>

          <div className={styles.loginModal}>
            <p className={styles.loginTitle}>Zaloguj się</p>
            <input
              type="text"
              className={styles.loginTextBox}
              placeholder="login"
              onChange={e => {
                setLoginData({ ...loginData, login: e.target.value });
              }}
            />
            <input
              type="password"
              className={styles.loginTextBox}
              placeholder="hasło"
              onChange={e => {
                setLoginData({ ...loginData, password: e.target.value });
              }}
            />
            <button className={styles.modalNewsBtn} onClick={adminLogin}>
              Zaloguj się
            </button>
          </div>
        </>
      )}

      <div className={styles.footer}>
        <div className={styles.footer_lists}>
          <div className={styles.footer_list_container}>
            <p>Nawigacja:</p>
            <ul className={styles.footer_list}>
              <li className={styles.footer_list_element}>
                <Link to="/dop-bike/">Newsy</Link>
              </li>
              <li className={styles.footer_list_element}>
                <Link to="/dop-bike/about">O mnie</Link>
              </li>
              <li className={styles.footer_list_element}>
                <Link to="/dop-bike/gallery">Galeria</Link>
              </li>
              <li className={styles.footer_list_element}>
                <Link to="/dop-bike/contact">Kontakt</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footer_list_container}>
            <p>Moje Social Media:</p>
            <ul className={styles.footer_list}>
              <li className={styles.footer_list_element}>YouTube</li>
              <li className={styles.footer_list_element}>Instagram</li>
              <li className={styles.footer_list_element}>Facebook</li>
            </ul>
          </div>
          <div className={styles.footer_list_container}>
            <p className={styles.footer_link_admin}>Admin Tools</p>
            <i
              onClick={token === '' ? openLoginModal : errorMsg}
              className={styles.demoIconDesktop}
            >
              &#xf108;
            </i>
          </div>
        </div>
        <p className={styles.copyright}>
          © 2024 Copyright:
          <a href="." className={styles.footer_list_copyLink}>
            Piórkowski
          </a>
        </p>
      </div>
    </>
  );
};
