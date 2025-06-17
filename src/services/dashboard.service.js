import axios from "axios"


export const account = async () => {
    var response = await axios.get(
        `${import.meta.env.VITE_API_URL}dashboards/accounts`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    )
    if (response.code === 200 || response.data != null) {
        return response.data;
    }
    return null
}