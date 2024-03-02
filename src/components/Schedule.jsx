import styles from "./Schedule.module.css";
import { Nav } from "./Nav";
import mapa from "../images/poland.svg";
import { useState } from "react";

const tablica = [
  {
    sort_date: "1708843494",
    city: "Kraków",
    date: "25.02.2024",
    description: "Jazda na motorach połączona z oglądaniem filmów.",
    cordX: "57",
    cordY: "83",
  },
  {
    sort_date: "1716615894",
    city: "Warszawa",
    date: "25.05.2024",
    description:
      "Wspólne zbieranie grzybów w akompaniamęcie największych religijnych hitów VIII wieku.",
    cordX: "64",
    cordY: "42",
  },
  {
    sort_date: "1710744294",
    city: "Płock",
    date: "18.03.2024",
    description:
      "Krótka 8 godzinna pogadanka na temat ekologii. Ekologiczne paliwa do palenia gumy oraz jak dymić aby nie ocieplać klimatu.",
    cordX: "55",
    cordY: "40",
  },
  {
    sort_date: "1713505494",
    city: "Gdańsk",
    date: "19.04.2024",
    description:
      "Tu będzie jeździł ktoś inny, nawet go nie znam. Ciekawe czy się zorientujecie.",
    cordX: "44",
    cordY: "7",
  },
].sort((a, b) => a.sort_date - b.sort_date);

export const Schedule = ({ token }) => {
  const [isShown, setIsShown] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [addEventModal, setAddEventModal] = useState(false);
  const [xValue, setXValue] = useState(50);
  const [yValue, setYValue] = useState(50);
  const [event, setEvent] = useState({});

  const ref = () => {
    window.location.reload(false);
  };

  const openEventModal = () => {
    setAddEventModal(true);
    setXValue(50);
    setYValue(50);
    setEvent({
      sort_date: Date.now(),
      city: "",
      date: "",
      description: "",
      cordX: "50",
      cordY: "50",
    });
  };
  const closeEventModal = () => {
    setAddEventModal(false);
  };
  const logOut = () => {
    localStorage.setItem("token", JSON.stringify({ token: "" }));
    setLoggedIn(!loggedIn);
    ref();
    console.log("Wylogowano");
  };

  const onsubmit = (e) => {
    e.preventDefault();
    console.log(event);
    // setAddEventModal(false);
  };
  return (
    <>
      {token === "admin" ? (
        <div className={styles.newsAdminPanel}>
          <button
            onClick={() => {
              openEventModal();
            }}
            className={styles.addScheduleBtn}
          >
            +
          </button>

          <button
            onClick={() => {
              logOut();
            }}
            className={styles.loBtn}
          >
            Logout
          </button>
        </div>
      ) : (
        <></>
      )}
      {addEventModal && (
        <>
          <div
            className={styles.eventShadowbox}
            onClick={() => {
              closeEventModal();
            }}
          ></div>
          <div className={styles.newEventModal}>
            <button
              className={styles.eventCloseBtn}
              onClick={() => {
                closeEventModal();
              }}
            >
              +
            </button>
            <p className={styles.eventModalTitle}>Dodaj nowy Event:</p>
            <div className={styles.eventModalWrapper}>
              <div className={styles.eventMapWrapper}>
                <img className={styles.eventMap} src={mapa} alt="Mapa Polski" />
                <input
                  onChange={(e) => {
                    setXValue(e.target.value);
                    setEvent({ ...event, cordX: e.target.value });
                  }}
                  className={styles.mapBarHorizontal}
                  type="range"
                />
                <input
                  onChange={(e) => {
                    setYValue(100 - e.target.value);
                    setEvent({ ...event, cordY: e.target.value });
                  }}
                  className={styles.mapBarVertical}
                  type="range"
                />
                <div
                  style={{ left: xValue + "%", top: yValue + "%" }}
                  className={styles.eventMarker}
                >
                  <div className={styles.eventMarkerCity}>Miasto</div>
                  <div className={styles.eventMarkerDate}>01.01.2099</div>
                </div>
              </div>

              <form onSubmit={onsubmit} className={styles.eventFormWrapper}>
                <p className={styles.eventTextLabel}>Miasto:</p>
                <input
                  required
                  onChange={(e) => {
                    setEvent({ ...event, city: e.target.value });
                  }}
                  className={styles.eventTextInput}
                  type="text"
                  placeholder="Wpisz nazwę miasta"
                />
                <p className={styles.eventTextLabel}>Data:</p>

                <input
                  required
                  onChange={(e) => {
                    setEvent({
                      ...event,
                      date: e.target.value,
                      sort_date: Date.UTC(
                        new Date(e.target.value).getFullYear(),
                        new Date(e.target.value).getMonth(),
                        new Date(e.target.value).getDate()
                      ),
                    });
                  }}
                  className={styles.eventTextDate}
                  type="date"
                />
                <p className={styles.eventTextLabel}>Opis:</p>

                <textarea
                  onChange={(e) => {
                    setEvent({ ...event, description: e.target.value });
                  }}
                  className={styles.eventTextArea}
                  placeholder="Napisz którki opis wydarzenia."
                ></textarea>
                <button type="Submit" className={styles.eventBtn}>
                  Zapisz
                </button>
              </form>
            </div>
          </div>
        </>
      )}
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
                  className={styles.eventMarkerWrapper}
                >
                  {isShown === index && (
                    <>
                      <div className={styles.eventMarkerCity}>{city}</div>
                      <div className={styles.eventMarkerDate}>{date}</div>
                    </>
                  )}

                  <div className={styles.eventMarker}></div>
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
                      <button>Edytuj</button>
                      <button>Usuń</button>
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
