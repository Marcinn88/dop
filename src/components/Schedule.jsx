import styles from "./Schedule.module.css";
import { Nav } from "./Nav";
import mapa from "../images/poland.svg";
import { useState } from "react";

const tablica = [
  {
    city: "Kraków",
    date: "25.02.2024",
    description: "Jazda na motorach połączona z oglądaniem filmów.",
    cordX: "57",
    cordY: "83",
  },
  {
    city: "Warszawa",
    date: "13.03.2024",
    description:
      "Wspólne zbieranie grzybów w akompaniamęcie największych religijnych hitów VIII wieku.",
    cordX: "64",
    cordY: "42",
  },
  {
    city: "Płock",
    date: "18.03.2024",
    description:
      "Krótka 8 godzinna pogadanka na temat ekologii. Ekologiczne paliwa do palenia gumy oraz jak dymić aby nie ocieplać klimatu.",
    cordX: "55",
    cordY: "40",
  },
  {
    city: "Gdańsk",
    date: "19.04.2024",
    description:
      "Tu będzie jeździł ktoś inny, nawet go nie znam. Ciekawe czy się zorientujecie.",
    cordX: "44",
    cordY: "7",
  },
];

export const Schedule = ({ token }) => {
  const [isShown, setIsShown] = useState(false);
  return (
    <>
      <div className={styles.scheduleWrapper}>
        <Nav selected={"schedule"} token={token} />
        <p className={styles.scheduleTitle}>Harmonogram!</p>
        <p className={styles.scheduleText}>
          Na tej stronie pojawi się harmonogram moich występów.
        </p>
        <div className={styles.mainWrapper}>
          <section className={styles.mapWrapper}>
            <img className={styles.map} src={mapa} alt="Mapa Polski" />
            {tablica.map(({ cordX, cordY, city, date }, index) => {
              return (
                <div
                  style={{ left: cordX + "%", top: cordY + "%" }}
                  className={styles.eventMarker}
                >
                  {isShown === index && (
                    <>
                      <div className={styles.eventMarkerCity}>{city}</div>
                      <div className={styles.eventMarkerDate}>{date}</div>
                    </>
                  )}
                </div>
              );
            })}
          </section>
          <section className={styles.eventWrapper}>
            <p className={styles.eventTitle}>Najlbiższe wydażenia:</p>
            <ul className={styles.eventListWrapper}>
              {tablica.map(({ city, date, description }, index) => {
                return (
                  <li
                    key={index}
                    className={styles.eventElement}
                    onMouseEnter={() => setIsShown(index)}
                    onMouseLeave={() => setIsShown(false)}
                  >
                    <span className={styles.eventTitleWrapper}>
                      <p className={styles.eventDate}>{date}</p>
                      <p className={styles.eventCity}>{city}</p>
                    </span>
                    <p className={styles.eventDescribe}>{description}</p>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};
