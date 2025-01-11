import axios from "axios";

// Exchange the OAuth token with the backend
export const exchangeToken = async (provider, token) => {
    try {
        const response = await axios.post(`/api/auth/${provider}`, { token });
        return response.data; // Should include user info or session token
    } catch (error) {
        console.error("Error during token exchange", error);
        throw error;
    }
};
