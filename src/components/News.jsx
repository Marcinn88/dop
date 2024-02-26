import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './News.module.css';
import { nanoid } from 'nanoid';
import leftImage from '../images/left-img.jpg';
import rightImage from '../images/right-img.jpg';
import { getDay, getMonth, getDefYear } from '../services/DateFunctions';
import { addArticle, deleteArticle, editArticle } from '../services/operations';

const mockApi = 'https://65b15d5ed16d31d11bdec7f4.mockapi.io';

// zmiana
export const News = ({ token }) => {
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [post, setPost] = useState({});
  const [count, setCount] = useState(true);
  const [data, setData] = useState([]);
  const [editedId, setEditedId] = useState('');
  const [uploadModal, setUploadModal] = useState(false);
  const [apiFiles, setApiFiles] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const ref = () => {
    window.location.reload(false);
  };

  const getArticles = async () => {
    try {
      const response = await axios.get(`${mockApi}/articles`);
      setData(response.data);
      console.log('lodaing data....');
      return response.data;
    } catch (error) {
      return console.error(error.message);
    }
  };

  const uploadPhoto = () => {
    const formData = new FormData();
    formData.append('file', apiFiles);
    formData.append('upload_preset', 'dop-bike');
    console.log('formData', formData);
    axios
      .post('https://api.cloudinary.com/v1_1/djwth1q7u/image/upload', formData)
      .then(response => {
        console.log(response);
        console.log(response.data.secure_url);
        setPost({ ...post, photo: response.data.secure_url });
      });
    setUploadModal(!uploadModal);
  };

  useEffect(() => {
    getArticles();
  }, []);

  const openModal = () => {
    setPost({
      _id: nanoid(),
      title: '',
      date_day: getDay(),
      date_month: getMonth(),
      date_year: getDefYear(),
      photo_position: 'right',
      photo:
        'https://res.cloudinary.com/djwth1q7u/image/upload/v1708351807/default.jpg',
      text1: '',
      text2: '',
      text3: '',
      favorite: 'false',
    });
    setEditModal(false);
    setModal(true);
    setCount(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const toogleUploadModal = e => {
    e.preventDefault();
    setUploadModal(!uploadModal);
  };

  const handleSlider = e => setCount(!count);

  const sliderTypeLeft = () => {
    setPost({ ...post, photo_position: 'left' });
  };
  const sliderTypeRight = () => {
    setPost({ ...post, photo_position: 'right' });
  };
  const dateTrim = e => {
    const selectedData = e.target.value.toString();
    const day = selectedData.substr(8, 2);
    const month = selectedData.substr(5, 2);
    const year = selectedData.substr(0, 4);
    setPost({ ...post, date_day: day, date_month: month, date_year: year });
    console.log(post);
  };

  const submitModal = async e => {
    e.preventDefault();
    await addArticle(post);
    setModal(!modal);
    setData([
      ...data,
      {
        _id: post._id,
        title: post.title,
        date_day: post.date_day,
        date_month: post.date_month,
        date_year: post.date_year,
        photo_position: post.photo_position,
        photo: post.photo,
        text1: post.text1,
        text2: post.text2,
        text3: post.text3,
        favorite: post.favorite,
      },
    ]);
    ref();
  };

  const articleDelete = async index => {
    await deleteArticle(index);
    ref();
    // const newData = data.filter(e => e.id !== index);
    // setData(newData);
  };

  const articleEdit = index => {
    setEditedId(index);
    const newData = data.filter(e => e.id === index);
    setPost({
      ...post,
      _id: newData[0]._id,
      title: newData[0].title,
      date_day: newData[0].date_day,
      date_month: newData[0].date_month,
      date_year: newData[0].date_year,
      photo_position: newData[0].photo_position,
      photo: newData[0].photo,
      text1: newData[0].text1,
      text2: newData[0].text2,
      text3: newData[0].text3,
      favorite: newData[0].favorite,
    });
    setEditModal(true);
    setModal(true);
    console.log(post);
  };

  const submitEditedModal = async e => {
    e.preventDefault();
    setModal(!modal);
    await editArticle(post, editedId);
    ref();
  };

  const logOut = () => {
    localStorage.setItem('token', JSON.stringify({ token: '' }));
    setLoggedIn(!loggedIn);
    ref();
    console.log('Wylogowano');
  };
  const openNewsLetter = () => {
    console.log('newsletter wyslany');
  };

  return (
    <>
      {uploadModal && (
        <>
          <div
            onClick={toogleUploadModal}
            className={styles.uploadShadowBox}
          ></div>
          <div className={styles.uploadModal}>
            <input
              type="file"
              accept="image/*;capture=camera"
              onChange={e => {
                setApiFiles(e.target.files[0]);
                console.log(apiFiles);
              }}
            />

            <button
              className={styles.modalNewsBtn}
              onClick={() => uploadPhoto()}
            >
              Zapisz plik
            </button>
          </div>
        </>
      )}

      {token === 'admin' ? (
        <div className={styles.newsAdminPanel}>
          <button onClick={openModal} className={styles.addNewsBtn}>
            +
          </button>

          <button onClick={logOut} className={styles.loBtn}>
            Logout
          </button>

          <button
            onClick={() => {
              openNewsLetter();
            }}
            className={styles.sendNewsBtn}
          >
            NewsLetter
          </button>
        </div>
      ) : (
        <></>
      )}

      {modal && (
        <>
          <div onClick={closeModal} className={styles.shadowBox}></div>
          <div className={styles.addNewsModal}>
            {!editModal ? (
              <h1 className={styles.addNewsModalTitle}>Dodaj nowy wpis!</h1>
            ) : (
              <h1 className={styles.addNewsModalTitle}>Edytuj wpis!</h1>
            )}

            <form
              onSubmit={!editModal ? submitModal : submitEditedModal}
              className={styles.modalFormWrapper}
            >
              {!editModal ? (
                <input
                  className={styles.modalTitle}
                  type="text"
                  name="title"
                  maxLength="50"
                  placeholder="Wpisz tytuł"
                  onChange={e => {
                    setPost({ ...post, title: e.target.value });
                  }}
                  required
                ></input>
              ) : (
                <input
                  className={styles.modalTitle}
                  type="text"
                  name="title"
                  maxLength="50"
                  value={post.title}
                  placeholder="Wpisz tytuł"
                  onChange={e => {
                    setPost({ ...post, title: e.target.value });
                  }}
                  required
                ></input>
              )}

              <div className={styles.sliderContainer}>
                {!count ? (
                  <span className={styles.greenText}>Zdjęcie z lewej</span>
                ) : (
                  <span className={styles.greyText}>Zdjęcie z lewej</span>
                )}
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    name="slider"
                    value={!count ? 'Right' : 'Left'}
                    onChange={!count ? sliderTypeRight : sliderTypeLeft}
                    onClick={handleSlider}
                  />
                  <span className={styles.slider}></span>
                </label>
                {!count ? (
                  <span className={styles.greyText}>Zdjęcie z prawej</span>
                ) : (
                  <span className={styles.redText}>Zdjęcie z prawej</span>
                )}

                {!count ? (
                  <img
                    className={styles.switchImage}
                    src={leftImage}
                    alt="wzor formularza"
                  />
                ) : (
                  <img
                    className={styles.switchImage}
                    src={rightImage}
                    alt="wzor formularza"
                  />
                )}
              </div>

              <div className={styles.modalSmallWrapper}>
                {!editModal ? (
                  <button
                    className={styles.modalFile}
                    onClick={toogleUploadModal}
                  >
                    Załącz zdjęcie
                  </button>
                ) : (
                  <button
                    className={styles.modalFile}
                    onClick={toogleUploadModal}
                  >
                    Zmień zdjęcie
                  </button>
                )}
                {!editModal ? (
                  <input
                    className={styles.modalData}
                    type="date"
                    name="date"
                    onChange={dateTrim}
                  ></input>
                ) : (
                  <input
                    className={styles.modalData}
                    type="date"
                    name="date"
                    defaultValue={
                      editModal &&
                      `${post.date_year}-${post.date_month}-${post.date_day}`
                    }
                    onChange={dateTrim}
                  ></input>
                )}
              </div>
              {!editModal ? (
                <textarea
                  type="textarea"
                  maxLength="500"
                  name="paragraf"
                  placeholder="Wpisz zawartość pierwszego Paragrafu"
                  onChange={e => {
                    setPost({ ...post, text1: e.target.value });
                  }}
                  className={styles.modalParagraf}
                  required
                ></textarea>
              ) : (
                <textarea
                  type="textarea"
                  maxLength="500"
                  name="paragraf"
                  value={post.text1}
                  placeholder="Wpisz zawartość pierwszego Paragrafu"
                  onChange={e => {
                    setPost({ ...post, text1: e.target.value });
                  }}
                  className={styles.modalParagraf}
                  required
                ></textarea>
              )}
              {!editModal ? (
                <textarea
                  type="textarea"
                  maxLength="500"
                  name="paragraf"
                  placeholder="Wpisz zawartość drugiego Paragrafu (opcjonalnie)"
                  onChange={e => {
                    setPost({ ...post, text2: e.target.value });
                  }}
                  className={styles.modalParagraf}
                ></textarea>
              ) : (
                <textarea
                  type="textarea"
                  maxLength="500"
                  name="paragraf"
                  value={post.text2}
                  placeholder="Wpisz zawartość drugiego Paragrafu (opcjonalnie)"
                  onChange={e => {
                    setPost({ ...post, text2: e.target.value });
                  }}
                  className={styles.modalParagraf}
                ></textarea>
              )}
              {!editModal ? (
                <textarea
                  type="textarea"
                  maxLength="500"
                  name="paragraf"
                  placeholder="Wpisz zawartość trzeciego Paragrafu (opcjonalnie)"
                  onChange={e => {
                    setPost({ ...post, text3: e.target.value });
                  }}
                  className={styles.modalParagraf}
                ></textarea>
              ) : (
                <textarea
                  type="textarea"
                  maxLength="500"
                  name="paragraf"
                  value={post.text3}
                  placeholder="Wpisz zawartość trzeciego Paragrafu (opcjonalnie)"
                  onChange={e => {
                    setPost({ ...post, text3: e.target.value });
                  }}
                  className={styles.modalParagraf}
                ></textarea>
              )}

              <div className={styles.addNewsModalBtns}>
                {!editModal ? (
                  <button className={styles.modalNewsBtn}>Dodaj</button>
                ) : (
                  <button className={styles.modalNewsBtn}>Zapisz</button>
                )}
                <button className={styles.modalNewsBtn} onClick={closeModal}>
                  Zamknij
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      <div className={styles.news}>
        <div className={styles.newsTitleBox}>
          <p className={styles.newscommentTitle}>Co slychac w DOP?</p>
          <h1 className={styles.newsTitle}>Aktualności</h1>
        </div>

        {data
          .toReversed()
          .map(
            ({
              id,
              title,
              date_day,
              date_month,
              date_year,
              photo_position,
              photo,
              text1,
              text2,
              text3,
              favorite,
            }) => {
              return (
                <div
                  className={styles.newsElement}
                  key={nanoid()}
                  id={id ?? nanoid()}
                >
                  <div className={styles.newsTtleContainer}>
                    <p className={styles.newsSubTitle}>{title}</p>
                    {token === 'admin' ? (
                      <button
                        className={styles.newsBtn}
                        id={id}
                        onClick={() => articleDelete(id)}
                      >
                        Usuń
                      </button>
                    ) : (
                      <></>
                    )}
                    {token === 'admin' ? (
                      <button
                        className={styles.newsBtn}
                        id={id}
                        onClick={() => articleEdit(id)}
                      >
                        Edytuj
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                  <p className={styles.newsDate}>
                    {date_day}.{date_month}.{date_year}
                  </p>
                  <div className={styles.newsContainer}>
                    {photo_position === 'left' ? (
                      <>
                        <div className={styles.newsImg}>
                          <img src={photo} alt="bike" />
                        </div>
                        <div className={styles.newsText}>
                          <p>{text1}</p>
                          <p>{text2}</p>
                          <p>{text3}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={styles.newsText}>
                          <p>{text1}</p>
                          <p>{text2}</p>
                          <p>{text3}</p>
                        </div>
                        <div className={styles.newsImg}>
                          <img src={photo} alt="bike" />

                          {/* <img src={require(`../images/${photo}`)} alt="bike" /> */}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            }
          )}
      </div>
    </>
  );
};
