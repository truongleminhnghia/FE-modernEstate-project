import { data } from "autoprefixer";
import axios from "axios";

export const packages = async (params) => {
    var response = await axios.get(
        `${import.meta.env.VITE_API_URL}packages`,
        {
            params,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    )
    if (response.code == 200 || response.data != null) {
        return response.data.data;
    }
    return null;
}