import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getRecommendation = async (budget, useCase, preferences) => {
    try {
        // Validate inputs
        if (!budget || !useCase) {
            throw new Error("Budget and use case are required.");
        }

        const response = await axios.post(`${API_BASE_URL}/recommend`, {
            budget: parseInt(budget),
            use_case: useCase,
            preferences: preferences || "" // Handle empty preferences
        });

        // Check if the response contains the expected data
        if (response.data && response.data.recommendation) {
            return response.data;
        } else {
            throw new Error("No recommendation received from the server.");
        }
    } catch (error) {
        console.error('Error fetching recommendation:', error);

        // Return a user-friendly error message
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return { recommendation: `Error: ${error.response.data.detail || "Server error"}` };
        } else if (error.request) {
            // The request was made but no response was received
            return { recommendation: "No response from the server. Please check your connection." };
        } else {
            // Something happened in setting up the request that triggered an error
            return { recommendation: `Error: ${error.message}` };
        }
    }
};