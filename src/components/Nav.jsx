import styles from './Nav.module.css';
import { Link } from 'react-router-dom';

export const Nav = ({ selected, token }) => {
  return (
    <>
      <div className={styles.mainNav}>
        {token === 'admin' && (
          <>
            <div className={styles.helloNav}>
              <p>
                Zalogowany: <strong>Admin</strong>
              </p>
            </div>
          </>
        )}

        <ul className={styles.mainNavList}>
          <li className={styles.mainNavEl}>
            <Link to="/dop-bike/">
              {selected === 'news' ? (
                <p className={styles.mainNavElTextSelected}>News</p>
              ) : (
                <p className={styles.mainNavElText}>News</p>
              )}
            </Link>
          </li>
          <li className={styles.mainNavEl}>
            <Link to="/dop-bike/about">
              {selected === 'about' ? (
                <p className={styles.mainNavElTextSelected}>O mnie</p>
              ) : (
                <p className={styles.mainNavElText}>O mnie</p>
              )}
            </Link>
          </li>
          <li className={styles.mainNavEl}>
            <Link to="/dop-bike/gallery">
              {selected === 'gallery' ? (
                <p className={styles.mainNavElTextSelected}>Galeria</p>
              ) : (
                <p className={styles.mainNavElText}>Galeria</p>
              )}
            </Link>
          </li>
          <li className={styles.mainNavEl}>
            <Link to="/dop-bike/contact">
              {selected === 'contact' ? (
                <p className={styles.mainNavElTextSelected}>Kontakt</p>
              ) : (
                <p className={styles.mainNavElText}>Kontakt</p>
              )}
            </Link>
          </li>
        </ul>
        <ul className={styles.socialNav}>
          <li className={styles.socialNavEl}>
            <a
              href="https://www.youtube.com/@maciejdop7079"
              target="_blank"
              rel="noreferrer"
            >
              <i className={styles.demoIconYt}>&#xf16a;</i>
            </a>
          </li>
          <li className={styles.socialNavEl}>
            <a
              href="https://www.instagram.com/maciejdop/"
              target="_blank"
              rel="noreferrer"
            >
              <i className={styles.demoIconInsta}>&#xf16d;</i>
            </a>
          </li>
          <li className={styles.socialNavEl}>
            <a
              href="https://www.facebook.com/profile.php?id=100004323405905"
              target="_blank"
              rel="noreferrer"
            >
              <i className={styles.demoIconFb}>&#xf308;</i>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
