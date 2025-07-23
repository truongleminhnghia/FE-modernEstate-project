import axios from 'axios';

export const getDemandTrends = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}dashboards/trend/demand`);
  return response.data;
}; 