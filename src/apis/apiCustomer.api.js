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
