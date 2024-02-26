import styles from './Gallery.module.css';
import selectStyles from './SelectMenuModal.module.css';
import { Nav } from './Nav';
import { useState, useEffect } from 'react';
import { addAlbum, saveAlbum, deleteAlbum } from '../services/operations';
import { nanoid } from 'nanoid';
import axios from 'axios';

import ico from '../images/more.png';
import ico_star from '../images/star.png';
import ico_del from '../images/delete.png';
import ico_hidden from '../images/hidden.png';
import ico_unhidden from '../images/unhidden.png';

import defaultPhoto from '../images/default.jpg';

export const Gallery = ({ token }) => {
  const [gallery, setGallery] = useState(false);
  const [addGalleryModal, setAddGalleryModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [uploadedOne, setUploadedOne] = useState(false);
  const [newAlbumModal, setNewAlbumModal] = useState(false);
  const [album, setAlbum] = useState({});
  const [newAlbum, setNewAlbum] = useState({});
  const [data, setData] = useState([]);
  const [apiFiles, setApiFiles] = useState({});
  const [selectModal, setSelectModal] = useState(false);
  const [selectName, setSelectName] = useState(`Wybierz album z listy`);
  const [placeholder, setPlaceholder] = useState('Wybierz album z listy');
  const [delFactor, setDelFactor] = useState(false);
  const [currentGallery, setCurrentGallery] = useState({});
  const [currentPhotoGallery, setCurrentPhotoGallery] = useState([]);
  const [activePhoto, setActivePhoto] = useState(0);

  const ref = () => {
    window.location.reload(false);
  };
  const getAlbums = async () => {
    try {
      const response = await axios.get(
        `https://65d784e727d9a3bc1d7b3c59.mockapi.io/gallery/`
      );
      setData(response.data);
      console.log('lodaing Albums....');
      console.log(response.data);
      return response.data;
    } catch (error) {
      return console.error(error.message);
    }
  };

  useEffect(() => {
    getAlbums();
  }, []);

  const openGallery = () => {
    setGallery(true);
  };

  const closeGallery = () => {
    setGallery(false);
  };

  const openAddGallery = () => {
    setAddGalleryModal(true);
    setUploadedOne(false);
    setPlaceholder('Wybierz album z listy');
    setSelectName('Wybierz album z listy');
    setAlbum({
      album: '',
      id: '1',
      main_id: '0',
      hidden: false,
      description: '',
      photos: [],
    });
  };

  const closeAddGallery = () => {
    setAddGalleryModal(false);
  };

  const logOut = () => {
    localStorage.setItem('token', JSON.stringify({ token: '' }));
    setLoggedIn(!loggedIn);
    ref();
  };

  const toogleUploadOne = () => {
    setUploadedOne(!uploadedOne);
  };

  const openNewAlbumModal = () => {
    setNewAlbumModal(true);
    setNewAlbum({
      album: '',
      main_id: '0',
      hidden: false,
      description: '',
      photos: [],
    });
  };
  const closeNewAlbumModal = () => {
    setNewAlbumModal(false);
  };

  const onSubmit = async () => {
    console.log('Submit wciśnięty.');
    console.log('Gotowy do wyslania album', album);
    await saveAlbum(album, album.id);
    closeAddGallery();
    ref();
  };

  const onAddNewAlbum = async () => {
    await addAlbum(newAlbum);
    await getAlbums();
    closeNewAlbumModal();
  };

  const hideImage = (index, photo) => {
    let albumArray = album.photos;
    let newAlbumRaw = { hidden: true, photo: photo };
    albumArray[index] = newAlbumRaw;
    setAlbum({ ...album, photos: albumArray });
  };
  const unhideImage = (index, photo) => {
    let albumArray = album.photos;
    let newAlbumRaw = { hidden: false, photo: photo };
    albumArray[index] = newAlbumRaw;
    setAlbum({ ...album, photos: albumArray });
  };

  const deletePhoto = index => {
    let albumArray = album.photos;
    albumArray.splice(index, 1);
    setAlbum({ ...album, photos: albumArray });
    if (index < album.main_id) {
      setAlbum({ ...album, main_id: (album.main_id - 1).toString() });
    }
  };

  const toogleSelectModal = () => {
    setSelectModal(!selectModal);
  };
  const changeName = e => {
    const newName = e;
    setSelectName(newName);
    setSelectModal(!selectModal);
    return newName;
  };

  const selectAlbumHandler = async e => {
    const results = data.filter(el => el.album === e);
    console.log('results filtered', results);
    console.log('results photos', results[0].photos);
    setAlbum({
      ...album,
      album: e,
      description: results[0].description,
      hidden: results[0].hidden,
      id: results[0].id,
      main_id: results[0].main_id,
      photos: results[0].photos,
    });
    console.log(album);
  };

  const uploadPhoto = async () => {
    let newArray = album.photos;
    const formData = new FormData();
    formData.append('file', apiFiles);
    formData.append('upload_preset', 'dop-bike');
    console.log('formData', formData);
    try {
      await axios
        .post(
          'https://api.cloudinary.com/v1_1/djwth1q7u/image/upload',
          formData
        )
        .then(response => {
          console.log(response);
          console.log(response.data.secure_url);
          newArray.push({ hidden: false, photo: response.data.secure_url });
          setAlbum({ ...album, photos: newArray });
          console.log('album mam nadzieje po zmianach', album);
        });
    } catch (error) {
      console.error(error.message);
    }
  };

  const onDelete = async () => {
    console.log(album.id);
    await deleteAlbum(album.id);
    closeAddGallery();
    ref();
  };

  const toogleDelFactor = () => {
    setDelFactor(!delFactor);
  };

  const openAdminGalleryWindow = async id => {
    openGallery();
    const results = data.filter(el => el.id === id);
    setCurrentGallery(results[0]);
    setCurrentPhotoGallery(results[0].photos);
    setActivePhoto(0);
  };

  const openGalleryWindow = async id => {
    openGallery();
    const results = data.filter(el => el.id === id);
    const filteredResults = results[0].photos.filter(el => el.hidden === false);
    console.log('results', results);
    console.log('filteredResults', filteredResults);
    setCurrentGallery(results[0]);
    setCurrentPhotoGallery(filteredResults);
    setActivePhoto(0);
  };

  const stepUp = () => {
    activePhoto === currentPhotoGallery.length - 1
      ? setActivePhoto(currentPhotoGallery.length - 1)
      : setActivePhoto(activePhoto + 1);
  };

  const stepDown = () => {
    activePhoto === 0 ? setActivePhoto(0) : setActivePhoto(activePhoto - 1);
  };

  return (
    <>
      {data && <></>}
      <div className={styles.galleryWrapper}>
        {newAlbumModal && (
          <>
            <div
              className={styles.galleryNewAlbumShadowBox}
              onClick={() => {
                closeNewAlbumModal();
              }}
            ></div>
            <div className={styles.galleryAddAlbumModal}>
              <button
                className={styles.galleryCloseBtn}
                onClick={() => {
                  closeNewAlbumModal();
                }}
              >
                +
              </button>
              <div className={styles.modalTextBox}>
                <p className={styles.modalNewAlbumTitle}>Stwórz nowy album</p>
                <div className={styles.modalNewAlbumContainer}>
                  <div className={styles.modalAddNewAlbumLeft}>
                    <p className={styles.modalNewAlbumSubTitle}>Nazwa:</p>
                    <input
                      type="text"
                      className={styles.modalNewAlbumTextInput}
                      onChange={e => {
                        setNewAlbum({ ...newAlbum, album: e.target.value });
                      }}
                    />
                    <p className={styles.modalNewAlbumSubTitle}>Opis:</p>
                    <textarea
                      type="textarea"
                      maxLength="100"
                      name="album"
                      className={styles.modalNewAlbumTextAreaInput}
                      onChange={e => {
                        setNewAlbum({
                          ...newAlbum,
                          description: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className={styles.modalAddNewAlbumRight}>
                    <div className={styles.galleryElement}>
                      <img
                        className={styles.gallerySubTitle}
                        src={defaultPhoto}
                        alt="bike"
                      />
                      <p className={styles.gallerySubTitle}>
                        {newAlbum.album === ''
                          ? 'Przykładowy Tytuł'
                          : newAlbum.album}
                      </p>
                      <p className={styles.gallerySubText}>
                        {newAlbum.description === ''
                          ? 'Pzykładowy opis Albumu'
                          : newAlbum.description}
                      </p>
                      <button className={styles.galleryBtn}>Otwórz</button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onAddNewAlbum();
                  }}
                  className={styles.addGalleryModalAlbumListBtn}
                >
                  Dodaj
                </button>
              </div>
            </div>
          </>
        )}
        {addGalleryModal && (
          <>
            <div
              className={styles.galleryShadowBox}
              onClick={() => {
                closeAddGallery();
              }}
            ></div>
            <div className={styles.addGalleryModal}>
              <button
                className={styles.galleryCloseBtn}
                onClick={() => {
                  closeAddGallery();
                }}
              >
                +
              </button>
              <p>Wybierz album z listy lub dodaj nowy.</p>
              <div className={styles.addGalleryModalAlbumList}>
                <button
                  className={styles.addGalleryModalAlbumListBtn}
                  onClick={() => {
                    openNewAlbumModal();
                  }}
                >
                  Nowy Album
                </button>
                <>
                  <div className={selectStyles.wrapper}>
                    <div
                      onClick={toogleSelectModal}
                      className={
                        selectName === placeholder
                          ? selectStyles.selectBtnGrey
                          : selectStyles.selectBtn
                      }
                    >
                      <span>{selectName}</span>
                    </div>
                    {selectModal && (
                      <div className={selectStyles.optionsContainer}>
                        <ul className={selectStyles.options}>
                          {data.map(({ album }) => {
                            return (
                              <li
                                key={nanoid()}
                                onClick={e => {
                                  changeName(e.target.innerText);
                                  selectAlbumHandler(e.target.innerText);
                                }}
                                className={selectStyles.option}
                              >
                                <span>{album}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                  {selectModal && (
                    <div
                      className={selectStyles.backdrop}
                      onClick={toogleSelectModal}
                    ></div>
                  )}
                </>
              </div>
              <div className={styles.addGalleryModalFileUplad}>
                <ul className={styles.addGalleryModalFileUpladList}>
                  {album.album.length > 0 && (
                    <li className={styles.addGalleryModalFileUpladContainer}>
                      <input
                        type="file"
                        accept="image/*;capture=camera"
                        className={styles.addGalleryModalFileUpladInput}
                        onChange={e => {
                          setApiFiles(e.target.files[0]);
                          console.log(apiFiles);
                        }}
                      />
                      <button
                        className={styles.addGalleryModalFileUpladInputBtn}
                        onClick={() => {
                          toogleUploadOne();
                          uploadPhoto();
                        }}
                      >
                        Upload
                      </button>
                    </li>
                  )}
                </ul>
              </div>

              <div className={styles.addGalleryPreviewWrapper}>
                <div className={styles.addGalleryPreviewTitleWrapper}>
                  {album.album.length > 0 && (
                    <p className={styles.addGalleryPreviewTitle}>
                      Wybrany Album:
                    </p>
                  )}
                  <span className={styles.addGalleryPreviewTitleAlbum}>
                    {album.album}
                  </span>
                </div>
                <div className={styles.addGalleryImagesPreviewWrapper}>
                  {album.album.length === 0 ? (
                    <p className={styles.addGalleryPreviewTitle}>
                      Wybierz Album aby zobaczyć podgląd zawartości
                    </p>
                  ) : album.photos.length === 0 ? (
                    <p className={styles.addGalleryPreviewTitle}>Brak zdjęć.</p>
                  ) : (
                    <ul className={styles.addGalleryImagesPreviewList}>
                      {album.photos.map(({ hidden, photo }, index) => {
                        const mainIndex = album.main_id;
                        return (
                          <li
                            className={
                              hidden
                                ? styles.addGalleryImagesPreviewElHidden
                                : mainIndex === index.toString()
                                ? styles.addGalleryImagesPreviewElMain
                                : styles.addGalleryImagesPreviewEl
                            }
                            key={nanoid()}
                            id={index}
                          >
                            {hidden ? (
                              <img
                                src={ico_hidden}
                                alt=""
                                className={
                                  styles.addGalleryImagesPreviewElHiddenIco
                                }
                              />
                            ) : mainIndex === index.toString() ? (
                              <img
                                src={ico_star}
                                alt=""
                                className={
                                  styles.addGalleryImagesPreviewElHiddenIco
                                }
                              />
                            ) : (
                              <></>
                            )}
                            {hidden && (
                              <div
                                className={styles.addGalleryHiddenOverlay}
                              ></div>
                            )}
                            <div
                              className={styles.addGalleryImagesPreviewElIco}
                            >
                              <img src={ico} alt="3 kropki" />
                              <ul className={styles.dropDownList}>
                                {hidden ? (
                                  <></>
                                ) : mainIndex === index.toString() ? (
                                  <></>
                                ) : (
                                  <li
                                    className={styles.dropDownEl}
                                    onClick={() => {
                                      setAlbum({
                                        ...album,
                                        main_id: index.toString(),
                                      });
                                    }}
                                  >
                                    <img src={ico_star} alt="gwiazdka" />
                                    <p>Główne</p>
                                  </li>
                                )}

                                {mainIndex === index.toString() ? (
                                  <></>
                                ) : hidden ? (
                                  <li
                                    className={styles.dropDownEl}
                                    onClick={() => {
                                      unhideImage(
                                        index,
                                        album.photos[index].photo
                                      );
                                    }}
                                  >
                                    <img
                                      src={ico_unhidden}
                                      alt="przekreślone oko"
                                    />
                                    <p>Odkryj</p>
                                  </li>
                                ) : (
                                  <li
                                    className={styles.dropDownEl}
                                    onClick={() => {
                                      hideImage(
                                        index,
                                        album.photos[index].photo
                                      );
                                    }}
                                  >
                                    <img
                                      src={ico_hidden}
                                      alt="przekreślone oko"
                                    />
                                    <p>Ukryj</p>
                                  </li>
                                )}
                                <li
                                  className={styles.dropDownEl}
                                  onClick={() => {
                                    mainIndex === index.toString()
                                      ? alert(
                                          'Nie możesz skasować zdjęcia głównego.'
                                        )
                                      : deletePhoto(index);
                                  }}
                                >
                                  <img src={ico_del} alt="kosz na śmieci" />
                                  <p>Usuń</p>
                                </li>
                              </ul>
                            </div>
                            <img
                              src={photo}
                              alt="motor"
                              className={styles.addGalleryImagesPreviewElImg}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>

              <button
                className={styles.addGalleryModalAlbumListBtn}
                onClick={() => {
                  album.album.length > 0
                    ? onSubmit()
                    : alert('Brak wybranego albumu');
                }}
              >
                Zapisz w Galerii
              </button>
              <div>
                <label className={styles.addGalleryModalDeleteInboxContainer}>
                  <input
                    type="checkbox"
                    onClick={() => {
                      toogleDelFactor();
                    }}
                  />
                  <p>Usuń album.</p>
                </label>
                {delFactor && (
                  <button
                    className={styles.addGalleryModalAlbumListBtn}
                    onClick={() => {
                      album.album === ''
                        ? alert('Brak wybranego albumu.')
                        : album.id === 'new'
                        ? alert('Nie możesz skasować niezapisanego albumu.')
                        : onDelete();
                    }}
                  >
                    Usuń Album
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        {gallery && (
          <>
            <div
              className={styles.galleryShadowBox}
              onClick={() => {
                closeGallery();
              }}
            ></div>
            <div className={styles.galleryMainModal}>
              <button
                className={styles.galleryCloseBtn}
                onClick={() => {
                  closeGallery();
                }}
              >
                +
              </button>
              <div className={styles.modalTextBox}>
                <p className={styles.modalTitle}>{currentGallery.album}</p>
                <p className={styles.modalSubTitle}>
                  {currentGallery.description}
                </p>
              </div>
              <div className={styles.galleryWindowWrapper}>
                <button
                  className={styles.galleryWindowBtn}
                  onClick={() => {
                    stepDown();
                  }}
                >
                  Poprzedni
                </button>
                <div className={styles.galleryWindow}>
                  {currentPhotoGallery.length !== 0 ? (
                    <img
                      src={currentPhotoGallery[activePhoto].photo}
                      alt="Bike"
                      className={styles.galleryWindowImage}
                    />
                  ) : (
                    <p>Brak zdjęć</p>
                  )}
                </div>
                <button
                  className={styles.galleryWindowBtn}
                  onClick={() => {
                    stepUp();
                  }}
                >
                  Następny
                </button>
              </div>
              <div className={styles.gallerySmallWindowWrapper}>
                {currentPhotoGallery.map(({ hidden, photo }, index) => {
                  // const defImage = defaultPhoto;
                  return (
                    <div
                      className={
                        activePhoto === index && hidden
                          ? styles.gallerySmallActiveWindowHidden
                          : activePhoto !== index && hidden
                          ? styles.gallerySmallWindowHidden
                          : activePhoto === index && !hidden
                          ? styles.gallerySmallActiveWindow
                          : styles.gallerySmallWindow
                      }
                      onClick={() => {
                        setActivePhoto(index);
                      }}
                    >
                      <img
                        src={photo}
                        alt="motorbike"
                        className={styles.gallerySmallImage}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
        {token === 'admin' ? (
          <div className={styles.galleryAdminPanel}>
            <button
              className={styles.addGalleryBtn}
              onClick={() => {
                openAddGallery();
              }}
            >
              +
            </button>

            <button className={styles.loBtn} onClick={logOut}>
              Logout
            </button>
          </div>
        ) : (
          <></>
        )}
        <Nav selected={'gallery'} token={token} />
        <p className={styles.galleryTitle}>Galeria!</p>
        <p className={styles.galleryText}>
          Na tej stronie pojawią się zdjęcia.
        </p>
        <div className={styles.galleryMain}>
          <ul className={styles.galleryList}>
            {data.map(({ album, description, main_id, photos, id }) => {
              const defImage = defaultPhoto;
              return (
                <li
                  key={nanoid()}
                  className={styles.galleryElement}
                  onClick={() => {
                    token === 'admin'
                      ? openAdminGalleryWindow(id)
                      : openGalleryWindow(id);
                  }}
                >
                  <div className={styles.galleryMiniatureWrapper}>
                    <img
                      className={styles.galleryMiniature}
                      src={photos.length > 0 ? photos[main_id].photo : defImage}
                      alt="bike"
                    />
                  </div>
                  <p className={styles.gallerySubTitle}>{album}</p>
                  <p className={styles.gallerySubText}>{description}</p>
                  <button className={styles.galleryBtn}>Otwórz</button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
