import styles from "./Schedule.module.css";
import { Nav } from "./Nav";
import mapa from "../images/poland.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import { addEvent, deleteEvent, editEvent } from "../services/operations";
import { nanoid } from "nanoid";

const cityHelper = [
  { city: "Płock", cordX: "55", cordY: "35", position: "right" },
  { city: "Świnoujście", cordX: "4", cordY: "14", position: "left" },
  { city: "Toruń", cordX: "45", cordY: "32", position: "right" },
  { city: "Szczecin", cordX: "6", cordY: "22", position: "right" },
  { city: "Kołobrzeg", cordX: "16", cordY: "10", position: "left" },
  { city: "Koszalin", cordX: "22", cordY: "11", position: "right" },
  { city: "Władysławowo", cordX: "44", cordY: "2", position: "right" },
  { city: "Gdańsk", cordX: "45", cordY: "9", position: "right" },
  { city: "Olsztyn", cordX: "62", cordY: "19", position: "right" },
  { city: "Suwałki", cordX: "85", cordY: "13", position: "right" },
  { city: "Białystok", cordX: "87", cordY: "31", position: "right" },
  { city: "Bydgoszcz", cordX: "39", cordY: "30", position: "left" },
  { city: "Gorzów Wielkopolski", cordX: "11", cordY: "34", position: "left" },
  { city: "Zielona Góra", cordX: "13", cordY: "48", position: "right" },
  { city: "Poznań", cordX: "28", cordY: "41", position: "right" },
  { city: "Łódź", cordX: "51", cordY: "52", position: "right" },
  { city: "Warszawa", cordX: "66", cordY: "44", position: "right" },
  { city: "Radom", cordX: "67", cordY: "59", position: "right" },
  { city: "Lublin", cordX: "83", cordY: "62", position: "right" },
  { city: "Zamość", cordX: "90", cordY: "71", position: "right" },
  { city: "Rzeszów", cordX: "76", cordY: "82", position: "right" },
  { city: "Przemyśl", cordX: "83", cordY: "87", position: "right" },
  { city: "Kielce", cordX: "62", cordY: "68", position: "right" },
  { city: "Kraków", cordX: "54", cordY: "82", position: "right" },
  { city: "Częstochowa", cordX: "48", cordY: "69", position: "left" },
  { city: "Katowice", cordX: "47", cordY: "77", position: "left" },
  { city: "Bielsko-Biała", cordX: "47", cordY: "83", position: "left" },
  { city: "Wrocław", cordX: "28", cordY: "62", position: "right" },
  { city: "Zakopane", cordX: "55", cordY: "93", position: "right" },
];

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
                {cityHelper.map(({ city, cordX, cordY, position }) => {
                  return (
                    <div
                      style={{ left: cordX + "%", top: cordY + "%" }}
                      className={styles.eventCityHelper}
                    >
                      <span className={styles.eventCityHelperMarker}></span>
                      <span
                        style={
                          position === "right"
                            ? { left: 15 + "px" }
                            : { left: -40 + "px" }
                        }
                        className={styles.eventCityHelperName}
                      >
                        {city}
                      </span>
                    </div>
                  );
                })}
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
                    {/* {`x: ${xValue}, y: ${yValue}`} */}
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
                        {token === "admin" ? (
                          <>
                            {" "}
                            <button
                              onClick={() => {
                                onEdit(id);
                              }}
                              className={styles.Btn}
                            >
                              Edytuj
                            </button>
                            <button
                              onClick={() => {
                                onDelete(id);
                              }}
                              className={styles.Btn}
                            >
                              Usuń
                            </button>
                          </>
                        ) : (
                          <></>
                        )}
                      </span>
                      <p className={styles.eventDescribe}>{description}</p>
                    </li>
                  );
                })}
            </ul>
          </section>
        </div>
        <div className={styles.mainMoreWrapper}>
          <p className={styles.moreWrapperTitle}>Kolejne wydarzenia:</p>
        </div>
      </div>
    </>
  );
};
