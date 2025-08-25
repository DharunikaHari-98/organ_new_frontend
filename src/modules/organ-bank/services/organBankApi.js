// src/services/apiSlice.js (or your current filename)

// Build base from env (trim trailing slash) then add /api
const root = (process.env.REACT_APP_API_URL || '').replace(/\/+$/, '');
const API_BASE = `${root}/api`;

const apiHandler = async (requestPromise) => {
  try {
    const response = await requestPromise;

    if (!response.ok) {
      let errorMessage = `Request failed with status: ${response.status}`;
      try {
        const errorBody = await response.json();
        errorMessage = errorBody.message || JSON.stringify(errorBody);
      } catch { /* ignore */ }
      throw new Error(errorMessage);
    }

    const contentType = response.headers.get("content-type") || "";
    return contentType.includes("application/json") ? response.json() : null;
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
};

/* =========================
   Donor Profiles
   ========================= */
export const getDonors = ({ page, pageSize }) => {
  const params = new URLSearchParams({ page, size: pageSize });
  return apiHandler(fetch(`${API_BASE}/donor-profiles?${params.toString()}`));
};

export const getDonorById = (id) =>
  apiHandler(fetch(`${API_BASE}/donor-profiles/${id}`));

/* =========================
   Organ Requests
   ========================= */
export const getOrganRequests = ({ page, pageSize }) => {
  const params = new URLSearchParams({ page, size: pageSize });
  return apiHandler(fetch(`${API_BASE}/organ-requests?${params.toString()}`));
};

export const getOrganRequestById = (id) =>
  apiHandler(fetch(`${API_BASE}/organ-requests/${id}`));

export const createOrganRequest = (data) =>
  apiHandler(fetch(`${API_BASE}/organ-requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }));

export const findOrganMatches = (id) =>
  apiHandler(fetch(`${API_BASE}/organ-requests/${id}/match`, { method: 'POST' }));

export const getOrganRequestCandidates = (id) =>
  apiHandler(fetch(`${API_BASE}/organ-requests/${id}/candidates`));

export const acceptMatch = (matchId) =>
  apiHandler(fetch(`${API_BASE}/matches/${matchId}/accept`, { method: 'POST' }));

export const declineMatch = (matchId) =>
  apiHandler(fetch(`${API_BASE}/matches/${matchId}/decline`, { method: 'POST' }));

/* =========================
   Allocations
   ========================= */
export const getAllocations = ({ page, pageSize }) => {
  const params = new URLSearchParams({ page, size: pageSize });
  return apiHandler(fetch(`${API_BASE}/allocations?${params.toString()}`));
};

export const createAllocation = (data) =>
  apiHandler(fetch(`${API_BASE}/allocations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }));

export const getAllocationEvents = (id) =>
  apiHandler(fetch(`${API_BASE}/allocations/${id}/events`));

/* =========================
   Reports & Audit
   ========================= */
export const getSummaryReport = () =>
  apiHandler(fetch(`${API_BASE}/reports/summary`));

export const getAuditLogs = ({ entityType, entityId }) => {
  const params = new URLSearchParams({ entityType, entityId });
  return apiHandler(fetch(`${API_BASE}/audit?${params.toString()}`));
};
