import axios from 'axios';

const API_BASE_URL = 'https://bemodernestate.site/api/v1';

export const getNewsList = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/news`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addNews = async (newsData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/news`, newsData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateNews = async (id, newsData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/news/${id}`, newsData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteNews = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/news/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 