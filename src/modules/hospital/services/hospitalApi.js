
const API_BASE = 'http://localhost:8080/api';


const apiHandler = async (requestPromise) => {
    try {
        const response = await requestPromise;
        if (!response.ok) {
            let errorMessage = `Request failed with status: ${response.status}`;
            try {
                const errorBody = await response.json();
                errorMessage = errorBody.message || JSON.stringify(errorBody);
            } catch (e) { /* Ignore if error body isn't JSON */ }
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

// --- Donor Profile Functions ---
export const getDonors = ({ page, pageSize }) => {
    const params = new URLSearchParams({ page, size: pageSize });
    return apiHandler(fetch(`${API_BASE}/donor-profiles?${params.toString()}`));
};
export const getDonorById = (id) => {
    return apiHandler(fetch(`${API_BASE}/donor-profiles/${id}`));
};
// src/services/hospitalApi.js (or similar)

// ORGAN
export async function getMyOrganRequests({ page=0, size=10, status, city, state } = {}) {
  const qs = new URLSearchParams({ page, size });
  if (status) qs.append('status', status);
  if (city)   qs.append('city', city);
  if (state)  qs.append('state', state);
  const res = await fetch(`/api/organ-requests/my?${qs}`, { headers: authHeader() });
  if (!res.ok) throw new Error('Failed to fetch my organ requests');
  return res.json();
}

// BLOOD
export async function getMyBloodRequests({ page=0, size=10, status, city, state } = {}) {
  const qs = new URLSearchParams({ page, size });
  if (status) qs.append('status', status);
  if (city)   qs.append('city', city);
  if (state)  qs.append('state', state);
  const res = await fetch(`/api/blood-requests/my?${qs}`, { headers: authHeader() });
  if (!res.ok) throw new Error('Failed to fetch my blood requests');
  return res.json();
}

// helper: attach Authorization
function authHeader() {
  const t = localStorage.getItem('token'); // adapt if you store elsewhere
  return t ? { 'Authorization': `Bearer ${t}` } : {};
}

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

// --- Blood Request Functions ---
export const getBloodRequests = ({ page, pageSize }) => {
    const params = new URLSearchParams({ page, size: pageSize });
    return apiHandler(fetch(`${API_BASE}/blood-requests?${params.toString()}`));
};
export const getBloodRequestById = (id) => {
    return apiHandler(fetch(`${API_BASE}/blood-requests/${id}`));
};
export const createBloodRequest = (data) => {
    return apiHandler(fetch(`${API_BASE}/blood-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }));
};

// --- Matching Functions ---
export const findOrganMatches = (id) => {
    return apiHandler(fetch(`${API_BASE}/organ-requests/${id}/match`, { method: 'POST' }));
};
export const getOrganRequestCandidates = (id) => {
    return apiHandler(fetch(`${API_BASE}/organ-requests/${id}/candidates`));
};
export const findBloodMatches = (id) => {
    return apiHandler(fetch(`${API_BASE}/blood-requests/${id}/match`, { method: 'POST' }));
};
export const getBloodRequestCandidates = (id) => {
    return apiHandler(fetch(`${API_BASE}/blood-requests/${id}/candidates`));
};
export const acceptMatch = (matchId) => {
    return apiHandler(fetch(`${API_BASE}/matches/${matchId}/accept`, { method: 'POST' }));
};
export const declineMatch = (matchId) => {
    return apiHandler(fetch(`${API_BASE}/matches/${matchId}/decline`, { method: 'POST' }));
};

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
export const updateAllocation = ({ id, updateData }) => {
    return apiHandler(fetch(`${API_BASE}/allocations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
    }));
};
export const getAllocationEvents = (id) => {
    return apiHandler(fetch(`${API_BASE}/allocations/${id}/events`));
};
export const addAllocationEvent = ({ id, eventData }) => {
    return apiHandler(fetch(`${API_BASE}/allocations/${id}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
    }));
};


export const getSummaryReport = () => {
    return apiHandler(fetch(`${API_BASE}/reports/summary`));
};
export const getTurnaroundReport = ({ from, to }) => {
    const params = new URLSearchParams({ from, to });
    return apiHandler(fetch(`${API_BASE}/reports/turnaround?${params.toString()}`));
};
export const getAuditLogs = ({ entityType, entityId }) => {
    const params = new URLSearchParams({ entityType, entityId });
    return apiHandler(fetch(`${API_BASE}/audit?${params.toString()}`));
};