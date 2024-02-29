import styles from "./Schedule.module.css";
import { Nav } from "./Nav";

export const Schedule = ({ token }) => {
  return (
    <>
      <div className={styles.scheduleWrapper}>
        <Nav selected={"schedule"} token={token} />
        <p className={styles.scheduleTitle}>Harmonogram!</p>
        <p className={styles.scheduleText}>
          Na tej stronie pojawi się harmonogram moich występów.
        </p>
      </div>
    </>
  );
};
