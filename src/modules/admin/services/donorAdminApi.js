// src/services/donorService.js (or wherever you keep this)

// Build API root dynamically from env
const root = (process.env.REACT_APP_API_URL || '').replace(/\/+$/, '');
const API_URL = `${root}/api/donor-profiles`;

/**
 * Central handler for all donor API requests.
 * Provides consistent error handling and JSON parsing.
 */
const apiHandler = async (requestPromise) => {
  try {
    const response = await requestPromise;

    if (!response.ok) {
      let errorMessage = `Request failed with status: ${response.status}`;
      try {
        const errorBody = await response.json();
        errorMessage = errorBody.message || JSON.stringify(errorBody);
      } catch {
        // ignore JSON parse error, keep default message
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

// ==========================
// Donor API methods
// ==========================

export const getDonors = ({ page, pageSize }) => {
  const params = new URLSearchParams({ page, size: pageSize });
  return apiHandler(fetch(`${API_URL}?${params.toString()}`));
};

export const getDonorById = (id) => {
  return apiHandler(fetch(`${API_URL}/${id}`));
};

export const createDonor = (donorData) => {
  return apiHandler(
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(donorData),
    })
  );
};

export const updateDonor = (data) => {
  const { id, ...donorData } = data;
  return apiHandler(
    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(donorData),
    })
  );
};
