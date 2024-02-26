import styles from './About.module.css';
import { Nav } from './Nav';
import { Review } from './Review';

export const About = ({ token }) => {
  return (
    <>
      <div className={styles.aboutWrapper}>
        <Nav selected={'about'} token={token} />
        <p className={styles.aboutTitle}>O mnie!</p>
        <p className={styles.aboutText}>Jestem motocyklerem!</p>
        <p className={styles.aboutText}>
          Na tej stronie pojawią się informacje o Mnie
        </p>
        <Review token={token} />
      </div>
    </>
  );
};
