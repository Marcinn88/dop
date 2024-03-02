import styles from "./Schedule.module.css";
import { Nav } from "./Nav";
import mapa from "../images/poland.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import { addEvent, deleteEvent, editEvent } from "../services/operations";
import { nanoid } from "nanoid";

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
  const [data, setData] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [addEventModal, setAddEventModal] = useState(false);
  const [xValue, setXValue] = useState(50);
  const [yValue, setYValue] = useState(50);
  const [event, setEvent] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [editedId, setEditedId] = useState();

  const getEvents = async () => {
    try {
      const response = await axios.get(
        "https://65b15d5ed16d31d11bdec7f4.mockapi.io/events"
      );
      setData(response.data);
      console.log("lodaing events....");
      console.log(data);
      return response.data;
    } catch (error) {
      return console.error(error.message);
    }
  };

  const ref = () => {
    window.location.reload(false);
  };

  useEffect(() => {
    getEvents();
  }, []);

  const openEventModal = () => {
    setEditModal(false);
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

  const onsubmit = async (e) => {
    e.preventDefault();
    console.log(event);
    await addEvent(event);
    setAddEventModal(false);
    ref();
  };
  const onDelete = async (e) => {
    await deleteEvent(e);
    ref();
  };
  const onEdit = async (id) => {
    setEditModal(true);
    const newData = data.filter((e) => e.id === id);
    setEditedId(newData[0].id);
    setAddEventModal(true);
    setXValue(50);
    setYValue(50);
    setEvent({
      sort_date: newData[0].sort_date,
      city: newData[0].city,
      date: newData[0].date,
      description: newData[0].description,
      cordX: newData[0].cordX,
      cordY: newData[0].cordY,
    });
    console.log("event", event);
  };
  const onEditedSubmit = async (e) => {
    e.preventDefault();
    await editEvent(event, editedId);
    ref();
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
            <p className={styles.eventModalTitle}>
              {editModal ? `Edytuj event:` : `Dodaj nowy Event:`}
            </p>
            <div className={styles.eventModalWrapper}>
              <div className={styles.eventMapWrapper}>
                <img className={styles.eventMap} src={mapa} alt="Mapa Polski" />

                <input
                  value={editModal ? event.cordX : xValue}
                  onChange={(e) => {
                    setXValue(e.target.value);
                    setEvent({ ...event, cordX: e.target.value });
                    console.log(cordX);
                  }}
                  className={styles.mapBarHorizontal}
                  type="range"
                />
                <input
                  value={editModal ? 100 - event.cordY : 100 - yValue}
                  onChange={(e) => {
                    setYValue(100 - e.target.value);
                    setEvent({ ...event, cordY: 100 - e.target.value });
                  }}
                  className={styles.mapBarVertical}
                  type="range"
                />
                <div
                  style={
                    editModal
                      ? { left: event.cordX + "%", top: event.cordY + "%" }
                      : { left: xValue + "%", top: yValue + "%" }
                  }
                  className={styles.eventMarker}
                >
                  <div className={styles.eventMarkerCity}>
                    {editModal ? event.city : "Miasto"}
                  </div>
                  <div className={styles.eventMarkerDate}>
                    {editModal ? event.date : "01.01.2099"}
                  </div>
                </div>
              </div>

              <form
                onSubmit={editModal ? onEditedSubmit : onsubmit}
                className={styles.eventFormWrapper}
              >
                <p className={styles.eventTextLabel}>Miasto:</p>
                {editModal ? (
                  <input
                    required
                    value={event.city}
                    onChange={(e) => {
                      setEvent({ ...event, city: e.target.value });
                    }}
                    className={styles.eventTextInput}
                    type="text"
                    placeholder="Wpisz nazwę miasta"
                  />
                ) : (
                  <input
                    required
                    onChange={(e) => {
                      setEvent({ ...event, city: e.target.value });
                    }}
                    className={styles.eventTextInput}
                    type="text"
                    placeholder="Wpisz nazwę miasta"
                  />
                )}

                <p className={styles.eventTextLabel}>Data:</p>
                {editModal ? (
                  <input
                    required
                    value={event.date}
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
                ) : (
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
                )}

                <p className={styles.eventTextLabel}>Opis:</p>
                {editModal ? (
                  <textarea
                    value={event.description}
                    onChange={(e) => {
                      setEvent({ ...event, description: e.target.value });
                    }}
                    className={styles.eventTextArea}
                    placeholder="Napisz którki opis wydarzenia."
                  ></textarea>
                ) : (
                  <textarea
                    onChange={(e) => {
                      setEvent({ ...event, description: e.target.value });
                    }}
                    className={styles.eventTextArea}
                    placeholder="Napisz którki opis wydarzenia."
                  ></textarea>
                )}

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
            {data.map(({ cordX, cordY, city, date }, index) => {
              return (
                <div
                  key={nanoid()}
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
              {data
                .sort((a, b) => a.sort_date - b.sort_date)
                .map(({ city, date, description, id }, index) => {
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
                        <button
                          onClick={() => {
                            onEdit(id);
                          }}
                        >
                          Edytuj
                        </button>
                        <button
                          onClick={() => {
                            onDelete(id);
                          }}
                        >
                          Usuń
                        </button>
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
