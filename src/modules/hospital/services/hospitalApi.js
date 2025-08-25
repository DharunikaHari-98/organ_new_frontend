// src/services/organBloodApi.js

// Build API root from env, trimming any trailing slash
const root = (process.env.REACT_APP_API_URL || '').replace(/\/+$/, '');
export const API_BASE = `${root}/api`;

/** Attach Authorization header if you store a token */
function authHeader() {
  const t = localStorage.getItem('token'); // adjust if you store elsewhere
  return t ? { Authorization: `Bearer ${t}` } : {};
}

/** Common handler: errors + JSON parsing */
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

    const ct = response.headers.get('content-type') || '';
    return ct.includes('application/json') ? response.json() : null;
  } catch (err) {
    console.error('API Error:', err?.message || err);
    throw err;
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
   Organ Requests (Hospital “my” + admin)
   ========================= */
export async function getMyOrganRequests({ page = 0, size = 10, status, city, state } = {}) {
  const qs = new URLSearchParams({ page, size });
  if (status) qs.append('status', status);
  if (city)   qs.append('city', city);
  if (state)  qs.append('state', state);
  const res = await fetch(`${API_BASE}/organ-requests/my?${qs}`, { headers: { ...authHeader() } });
  if (!res.ok) throw new Error('Failed to fetch my organ requests');
  return res.json();
}

export const getOrganRequests = ({ page, pageSize }) => {
  const params = new URLSearchParams({ page, size: pageSize });
  return apiHandler(fetch(`${API_BASE}/organ-requests?${params.toString()}`));
};

export const getOrganRequestById = (id) =>
  apiHandler(fetch(`${API_BASE}/organ-requests/${id}`));

export const createOrganRequest = (data) =>
  apiHandler(fetch(`${API_BASE}/organ-requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(data),
  }));

export const findOrganMatches = (id) =>
  apiHandler(fetch(`${API_BASE}/organ-requests/${id}/match`, {
    method: 'POST',
    headers: { ...authHeader() },
  }));

export const getOrganRequestCandidates = (id) =>
  apiHandler(fetch(`${API_BASE}/organ-requests/${id}/candidates`, {
    headers: { ...authHeader() },
  }));

/* =========================
   Blood Requests (Hospital “my” + admin)
   ========================= */
export async function getMyBloodRequests({ page = 0, size = 10, status, city, state } = {}) {
  const qs = new URLSearchParams({ page, size });
  if (status) qs.append('status', status);
  if (city)   qs.append('city', city);
  if (state)  qs.append('state', state);
  const res = await fetch(`${API_BASE}/blood-requests/my?${qs}`, { headers: { ...authHeader() } });
  if (!res.ok) throw new Error('Failed to fetch my blood requests');
  return res.json();
}

export const getBloodRequests = ({ page, pageSize }) => {
  const params = new URLSearchParams({ page, size: pageSize });
  return apiHandler(fetch(`${API_BASE}/blood-requests?${params.toString()}`));
};

export const getBloodRequestById = (id) =>
  apiHandler(fetch(`${API_BASE}/blood-requests/${id}`));

export const createBloodRequest = (data) =>
  apiHandler(fetch(`${API_BASE}/blood-requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(data),
  }));

export const findBloodMatches = (id) =>
  apiHandler(fetch(`${API_BASE}/blood-requests/${id}/match`, {
    method: 'POST',
    headers: { ...authHeader() },
  }));

export const getBloodRequestCandidates = (id) =>
  apiHandler(fetch(`${API_BASE}/blood-requests/${id}/candidates`, {
    headers: { ...authHeader() },
  }));

/* =========================
   Matches (accept / decline)
   ========================= */
export const acceptMatch = (matchId) =>
  apiHandler(fetch(`${API_BASE}/matches/${matchId}/accept`, {
    method: 'POST',
    headers: { ...authHeader() },
  }));

export const declineMatch = (matchId) =>
  apiHandler(fetch(`${API_BASE}/matches/${matchId}/decline`, {
    method: 'POST',
    headers: { ...authHeader() },
  }));

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
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(data),
  }));

export const updateAllocation = ({ id, updateData }) =>
  apiHandler(fetch(`${API_BASE}/allocations/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(updateData),
  }));

export const getAllocationEvents = (id) =>
  apiHandler(fetch(`${API_BASE}/allocations/${id}/events`, {
    headers: { ...authHeader() },
  }));

export const addAllocationEvent = ({ id, eventData }) =>
  apiHandler(fetch(`${API_BASE}/allocations/${id}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(eventData),
  }));

/* =========================
   Reports & Audit
   ========================= */
export const getSummaryReport = () =>
  apiHandler(fetch(`${API_BASE}/reports/summary`, { headers: { ...authHeader() } }));

export const getTurnaroundReport = ({ from, to }) => {
  const params = new URLSearchParams({ from, to });
  return apiHandler(fetch(`${API_BASE}/reports/turnaround?${params.toString()}`, {
    headers: { ...authHeader() },
  }));
};

export const getAuditLogs = ({ entityType, entityId }) => {
  const params = new URLSearchParams({ entityType, entityId });
  return apiHandler(fetch(`${API_BASE}/audit?${params.toString()}`, {
    headers: { ...authHeader() },
  }));
};
