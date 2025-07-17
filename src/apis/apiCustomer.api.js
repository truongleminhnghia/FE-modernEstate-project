import axios from "axios";

const API_BASE_URL = "https://bemodernestate.site/api/v1";

export const addToFavorites = async (postId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_BASE_URL}/favorites`,
      { postId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFavorites = async ({ accountId, propertyId, page_current = 1, page_size = 10 } = {}) => {
  try {
    const token = localStorage.getItem("token");
    const params = {};
    if (accountId) params.accountId = accountId;
    if (propertyId) params.propertyId = propertyId;
    params.page_current = page_current;
    params.page_size = page_size;

    const response = await axios.get(
      `${API_BASE_URL}/favorites`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Đăng ký làm môi giới
export const registerBroker = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_BASE_URL}/brokers/register`,
      {}, // Body rỗng vì BE tự xử lý hết
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Đăng ký làm chủ sở hữu
export const registerPropertyOwner = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_BASE_URL}/property-owners/register`,
      {}, // Body rỗng vì BE tự xử lý hết
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
