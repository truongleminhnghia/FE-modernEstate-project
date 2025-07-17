import axios from "axios";

const API_BASE = "https://bemodernestate.site/api/v1/favorites";

// ✅ Hàm trả về headers luôn cập nhật token mới nhất
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  console.log("Using token:", token ? "Token exists" : "No token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

const favoriteApi = {
  getFavorites: async (accountId) => {
    console.log("Getting favorites for account:", accountId);
    try {
      const response = await axios.get(`${API_BASE}?accountId=${accountId}`, {
        headers: getAuthHeaders()
      });
      console.log("Get favorites success:", response.data);
      return response;
    } catch (error) {
      console.error("Get favorites error:", error.response?.data || error.message);
      throw error;
    }
  },

  addFavorite: async (propertyId, accountId) => {
    console.log("Adding favorite for property:", propertyId, "account:", accountId);
    try {
      const response = await axios.post(API_BASE, { propertyId, accountId }, {
        headers: getAuthHeaders()
      });
      console.log("Add favorite success:", response.data);
      return response;
    } catch (error) {
      console.error("Add favorite error:", error.response?.data || error.message);
      throw error;
    }
  },

  removeFavorite: async (favoriteId) => {
    console.log("Removing favorite with ID:", favoriteId);
    try {
      const response = await axios.delete(`${API_BASE}/${favoriteId}`, {
        headers: getAuthHeaders()
      });
      console.log("Remove favorite success:", response.data);
      return response;
    } catch (error) {
      console.error("Remove favorite error:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default favoriteApi;
