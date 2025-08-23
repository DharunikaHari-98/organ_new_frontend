
const API_BASE = 'http://localhost:8080/api';


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
        console.error("API Error:", error.message);
        throw error;
    }
};

export const getDonors = ({ page, pageSize }) => {
    const params = new URLSearchParams({ page, size: pageSize });
    return apiHandler(fetch(`${API_BASE}/donor-profiles?${params.toString()}`));
};
export const getDonorById = (id) => {
    return apiHandler(fetch(`${API_BASE}/donor-profiles/${id}`));
};

// --- Organ Request Functions ---
export const getOrganRequests = ({ page, pageSize }) => {
    const params = new URLSearchParams({ page, size: pageSize });
    return apiHandler(fetch(`${API_BASE}/organ-requests?${params.toString()}`));
};
export const getOrganRequestById = (id) => {
    return apiHandler(fetch(`${API_BASE}/organ-requests/${id}`));
};
export const createOrganRequest = (data) => {
    return apiHandler(fetch(`${API_BASE}/organ-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }));
};

export const findOrganMatches = (id) => {
    return apiHandler(fetch(`${API_BASE}/organ-requests/${id}/match`, { method: 'POST' }));
};
export const getOrganRequestCandidates = (id) => {
    return apiHandler(fetch(`${API_BASE}/organ-requests/${id}/candidates`));
};
export const acceptMatch = (matchId) => {
    return apiHandler(fetch(`${API_BASE}/matches/${matchId}/accept`, { method: 'POST' }));
};
export const declineMatch = (matchId) => {
    return apiHandler(fetch(`${API_BASE}/matches/${matchId}/decline`, { method: 'POST' }));
};

// --- Allocation Functions ---
export const getAllocations = ({ page, pageSize }) => {
    const params = new URLSearchParams({ page, size: pageSize });
    return apiHandler(fetch(`${API_BASE}/allocations?${params.toString()}`));
};
export const createAllocation = (data) => {
    return apiHandler(fetch(`${API_BASE}/allocations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }));
};
export const getAllocationEvents = (id) => {
    return apiHandler(fetch(`${API_BASE}/allocations/${id}/events`));
};

// --- Report and Audit Functions ---
export const getSummaryReport = () => {
    return apiHandler(fetch(`${API_BASE}/reports/summary`));
};
export const getAuditLogs = ({ entityType, entityId }) => {
    const params = new URLSearchParams({ entityType, entityId });
    return apiHandler(fetch(`${API_BASE}/audit?${params.toString()}`));
};