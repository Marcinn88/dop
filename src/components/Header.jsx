import styles from './Header.module.css';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import newsLetterImg from '../images/news.jpg';
import { Nav } from './Nav';

export const Header = ({ token }) => {
  const [modal, setModal] = useState(false);
  const [smallModal, setSmallModal] = useState(false);
  const [newsletter, setNewsletter] = useState({});

  const openModal = () => {
    setModal(!modal);
    setNewsletter({
      name: 'Nieznajomy',
      email: '',
    });
  };
  const closeModal = e => {
    e.preventDefault();
    setModal(!modal);
  };

  const submitNewsletter = e => {
    e.preventDefault();
    console.log(newsletter);
    setSmallModal(!smallModal);
    setModal(!modal);
  };

  const submitSmallModal = () => {
    setSmallModal(!smallModal);
  };

  return (
    <>
      {smallModal && (
        <>
          <div onClick={openModal} className={styles.smallShadowBox}></div>
          <div className={styles.newsLetterSmallModal}>
            <p className={styles.newsSmallModalSubtitle}>
              Pomyślnie zapisano do newslettera!
            </p>
            <button className={styles.modalNewsBtn} onClick={submitSmallModal}>
              Ok
            </button>
          </div>
        </>
      )}
      {modal && (
        <>
          <div onClick={openModal} className={styles.shadowBox}></div>
          <div className={styles.newsLetterModal}>
            <h1 className={styles.newsModalTitle}>
              Zapisz się do Newslettera!
            </h1>
            <p className={styles.newsModalSubtitle}>
              Chcesz otrzymywać powiadomienia o najnowszych wydarzeniach?
            </p>
            <p className={styles.newsModalSubtitle}>
              Jeżeli tak, to koniecznie zapisz się do{' '}
              <strong>NewsLettera!</strong>
            </p>
            <img
              className={styles.newsLetterImg}
              src={newsLetterImg}
              alt="człowiek na motorze pośród emaili"
            ></img>
            <form onSubmit={submitNewsletter} className={styles.newsLetterForm}>
              <div className={styles.newsLetterInputContainer}>
                <input
                  className={styles.newsLetterFormEl}
                  type="text"
                  placeholder="imię"
                  required
                  onChange={e => {
                    setNewsletter({ ...newsletter, name: e.target.value });
                  }}
                ></input>
                <input
                  className={styles.newsLetterFormEl}
                  type="email"
                  placeholder="email"
                  required
                  onChange={e => {
                    setNewsletter({ ...newsletter, email: e.target.value });
                  }}
                ></input>
              </div>
              <div className={styles.newsLetterBtnContainer}>
                <button className={styles.modalNewsBtn} type="submit">
                  Zapisz się
                </button>
                <button className={styles.modalNewsBtn} onClick={closeModal}>
                  Zamknij
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      <div className={styles.main} id={nanoid()}>
        <Nav selected={'news'} token={token} />
        <div className={styles.mainTitle}>DOP</div>
        <div className={styles.subTitle}>Maciej Bielicki</div>

        <button onClick={openModal} className={styles.mainButton}>
          Newsletter
        </button>
      </div>
    </>
  );
};
