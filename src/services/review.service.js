import axios from "axios";

export const createReview = async (value) => {
    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}reviews`,
        value,
        {
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        }
    );
    if (response.status === 200 && response.data) {
        return response.data;
    }
    return null;
}

export const getReviews = async () => {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}reviews`,
        {
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        }
    );
    if (response.status === 200 && response.data) {
        return response.data;
    }
    return null;
}
