import axios from "axios";

const API_BASE = "https://be-modernestate.onrender.com/api/v1/favorites";

// ✅ Hàm trả về headers luôn cập nhật token mới nhất
const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const favoriteApi = {
  getFavorites: (accountId) =>
    axios.get(`${API_BASE}?accountId=${accountId}`, { headers: getAuthHeaders() }),

  addFavorite: (propertyId) =>
    axios.post(API_BASE, { propertyId }, { headers: getAuthHeaders() }),

  removeFavorite: (favoriteId) =>
    axios.delete(`${API_BASE}/${favoriteId}`, { headers: getAuthHeaders() }),
};

export default favoriteApi;
