import axios from 'axios';

axios.defaults.baseURL = '';

export const getArticles = async () => {
  try {
    const response = await axios.get(
      'https://65b15d5ed16d31d11bdec7f4.mockapi.io/articles'
    );
    const responseData = response.data;
    console.log(responseData);
    return responseData;
  } catch (error) {
    return console.error(error.message);
  }
};

export const addArticle = async article => {
  try {
    const response = await axios.post(
      'https://65b15d5ed16d31d11bdec7f4.mockapi.io/articles',
      article
    );
    return response.data;
  } catch (error) {
    return console.error(error.message);
  }
};

export const deleteArticle = async articleId => {
  try {
    const response = await axios.delete(
      `https://65b15d5ed16d31d11bdec7f4.mockapi.io/articles/${articleId}`
    );
    return response.data;
  } catch (error) {
    return console.error(error.message);
  }
};

export const editArticle = async (data, id) => {
  try {
    const response = await axios.put(
      `https://65b15d5ed16d31d11bdec7f4.mockapi.io/articles/${id}`,
      {
        title: data.title,
        date_day: data.date_day,
        date_month: data.date_month,
        date_year: data.date_year,
        photo_position: data.photo_position,
        photo: data.photo,
        text1: data.text1,
        text2: data.text2,
        text3: data.text3,
        favorite: data.favorite,
      }
    );
    return response.data;
  } catch (error) {
    return console.error(error.message);
  }
};

export const sendComment = async comment => {
  try {
    const response = await axios.post(
      'https://65d39f84522627d501094a90.mockapi.io/comments',
      comment
    );
    return response.data;
  } catch (error) {
    return console.error(error.message);
  }
};

export const deleteComment = async commentId => {
  try {
    const response = await axios.delete(
      `https://65d39f84522627d501094a90.mockapi.io/comments/${commentId}`
    );
    return response.data;
  } catch (error) {
    return console.error(error.message);
  }
};

export const showComment = async id => {
  try {
    const response = await axios.put(
      `https://65d39f84522627d501094a90.mockapi.io/comments/${id}`,
      {
        verify: true,
      }
    );
    return response.data;
  } catch (error) {
    return console.error(error.message);
  }
};
export const hideComment = async id => {
  try {
    const response = await axios.put(
      `https://65d39f84522627d501094a90.mockapi.io/comments/${id}`,
      {
        verify: false,
      }
    );
    return response.data;
  } catch (error) {
    return console.error(error.message);
  }
};

export const addAlbum = async album => {
  try {
    const response = await axios.post(
      'https://65d784e727d9a3bc1d7b3c59.mockapi.io/gallery',
      album
    );
    return response.data;
  } catch (error) {
    return console.error(error.message);
  }
};

export const saveAlbum = async (data, id) => {
  try {
    const response = await axios.put(
      `https://65d784e727d9a3bc1d7b3c59.mockapi.io/gallery/${id}`,
      {
        album: data.album,
        main_id: data.main_id,
        hidden: data.hidden,
        description: data.description,
        photos: data.photos,
      }
    );
    return response.data;
  } catch (error) {
    return console.error(error.message);
  }
};

export const deleteAlbum = async albumId => {
  try {
    const response = await axios.delete(
      `https://65d784e727d9a3bc1d7b3c59.mockapi.io/gallery/${albumId}`
    );
    return response.data;
  } catch (error) {
    return console.error(error.message);
  }
};
