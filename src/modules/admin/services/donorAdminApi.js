const API_URL = 'http://localhost:8080/api/donor-profiles';

/**
 * A central handler for all donor API requests.
 * It provides consistent error handling and JSON parsing.
 * @param {Promise<Response>} requestPromise A fetch() call.
 * @returns {Promise<any>} The JSON response from the server.
 */
const apiHandler = async (requestPromise) => {
    try {
        const response = await requestPromise;

        if (!response.ok) {
            let errorMessage = `Request failed with status: ${response.status}`;
            try {
                const errorBody = await response.json();
                errorMessage = errorBody.message || JSON.stringify(errorBody);
            } catch (e) {
            }
            throw new Error(errorMessage);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return response.json();
        }
        return null;

    } catch (error) {
        console.error("Donor API Error:", error.message);
        throw error;
    }
};


export const getDonors = ({ page, pageSize }) => {
    const params = new URLSearchParams({ page, size: pageSize });
    return apiHandler(fetch(`${API_URL}?${params.toString()}`));
};

export const getDonorById = (id) => {
    return apiHandler(fetch(`${API_URL}/${id}`));
};

export const createDonor = (donorData) => {
    return apiHandler(fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donorData),
    }));
};


export const updateDonor = (data) => {
    const { id, ...donorData } = data; // Separates the ID from the rest of the data
    return apiHandler(fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donorData),
    }));
};