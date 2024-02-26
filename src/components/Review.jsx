import styles from './Review.module.css';
import { useState, useEffect } from 'react';
import { getDay, getMonth, getDefYear } from 'services/DateFunctions';
import {
  sendComment,
  deleteComment,
  showComment,
  hideComment,
} from 'services/operations';
import axios from 'axios';
import { nanoid } from 'nanoid';

const API = 'https://65d39f84522627d501094a90.mockapi.io/';

export const Review = ({ token }) => {
  const setDate = () => {
    const date = Date.now();
    const day = getDay(date);
    const month = getMonth(date);
    const year = getDefYear(date);
    setComment({ ...comment, date: `${day}.${month}.${year}` });
  };

  const [data, setData] = useState([]);
  const [comment, setComment] = useState({
    name: '',
    text: '',
    verify: false,
    date: '',
  });

  const ref = () => {
    window.location.reload(false);
  };

  const getReviews = async () => {
    try {
      const response = await axios.get(`${API}/comments/`);
      setData(response.data);
      console.log('lodaing comments....');
      console.log(response.data);
      return response.data;
    } catch (error) {
      return console.error(error.message);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  const submitComment = e => {
    e.preventDefault();
    sendComment(comment);
    alert(
      'Dziękujemy za opinię! Twój komentarz już niedługo pojawi się na stronie głównej! Jeżeli przejdzie pozytywnie weryfikację naszej administracji.'
    );
    ref();
    console.log(comment);
  };

  const commentDelete = async index => {
    await deleteComment(index);
    console.log('usunieto wpis o ID', index);
    ref();
  };

  const commentShow = async index => {
    await showComment(index);
    console.log('pokazano wpis o ID', index);
    ref();
  };

  const commentHide = async index => {
    await hideComment(index);
    console.log('pokazano wpis o ID', index);
    ref();
  };

  return (
    <>
      <div className={styles.reviewWrapper}>
        <div className={styles.reviewMain}>
          <ul className={styles.reviewList}>
            {data.toReversed().map(({ id, name, text, verify, date }) => {
              return (
                <>
                  {(token === 'admin' || verify === true) && (
                    <li
                      key={nanoid()}
                      className={
                        verify ? styles.reviewListEl : styles.reviewListHiddenEl
                      }
                      id={id ?? nanoid()}
                    >
                      <div className={styles.reviewBtnBar}>
                        <p className={styles.reviewDate}>{date}</p>
                        {token === 'admin' && (
                          <>
                            {verify === true ? (
                              <button
                                className={styles.reviewBtn}
                                id={id}
                                onClick={() => commentHide(id)}
                              >
                                Ukryj
                              </button>
                            ) : (
                              <>
                                <p className={styles.reviewHiddenText}>
                                  Post Ukryty
                                </p>
                                <button
                                  className={styles.reviewBtn}
                                  id={id}
                                  onClick={() => commentShow(id)}
                                >
                                  Pokaż
                                </button>
                              </>
                            )}

                            <button
                              className={styles.reviewBtn}
                              id={id}
                              onClick={() => commentDelete(id)}
                            >
                              Usuń
                            </button>
                          </>
                        )}
                      </div>
                      <p>{text}</p>
                      <div className={styles.reviewSign}>
                        <p className={styles.reviewSignName}>{name}</p>
                      </div>
                    </li>
                  )}
                </>
              );
            })}
          </ul>
        </div>
        <div className={styles.reviewComment}>
          <form className={styles.reviewCommentForm} onSubmit={submitComment}>
            <input
              className={styles.reviewCommentFormElname}
              type="text"
              name="name"
              placeholder="imię"
              maxLength="40"
              required
              onClick={() => {
                setDate();
              }}
              onChange={e => {
                setComment({ ...comment, name: e.target.value });
              }}
            />
            <textarea
              className={styles.reviewCommentFormEltext}
              placeholder="Wpisz swój komentarz."
              maxLength="500"
              onChange={e => {
                setComment({ ...comment, text: e.target.value });
              }}
            />
            <input className={styles.reviewCommentFormElButton} type="submit" />
          </form>
        </div>
      </div>
    </>
  );
};
