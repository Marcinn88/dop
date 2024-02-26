import styles from './Contact.module.css';
import { Nav } from './Nav';

export const Contact = ({ token }) => {
  return (
    <>
      <div className={styles.contactWrapper}>
        <Nav selected={'contact'} token={token} />
        <p className={styles.contactTitle}>Kontakt!</p>
        <p className={styles.contactText}>
          Na tej stronie pojawią się informacje kontaktowe.
        </p>
      </div>
    </>
  );
};
