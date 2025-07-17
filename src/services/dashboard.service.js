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

export const post = async () => {
    var response = await axios.get(
        `${import.meta.env.VITE_API_URL}dashboards/posts`,
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

export const getRevenue = async () => {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}dashboards/revenue`,
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

export const getReview = async () => {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}dashboards/reviews`,
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