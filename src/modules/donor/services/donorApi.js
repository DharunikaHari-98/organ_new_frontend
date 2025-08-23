const API_BASE = 'http://localhost:8080/api';

// --- Donor Profile (for the logged-in user) ---
// --- Donor Profile (for the logged-in user) ---
export const getMyProfile = async (id) => {
    const response = await fetch(`${API_BASE}/donor-profiles/${id}`);
    if (!response.ok) {
        if (response.status === 400 || response.status === 404) {
            return null; // Return null if not found, so the UI can adapt
        }
        throw new Error('Failed to fetch profile');
    }
    return response.json();
};

export const createMyProfile = async (donorData) => {
    const response = await fetch(`${API_BASE}/donor-profiles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donorData),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create profile');
    }
    return response.json();
};

export const updateMyProfile = async ({ id, donorData }) => {
    const response = await fetch(`${API_BASE}/donor-profiles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donorData),
    });
    if (!response.ok) throw new Error('Failed to update profile');
    return response.json();
};
export const getMyConsents = async (donorProfileId) => {
    const response = await fetch(`${API_BASE}/consent-records?donorProfileId=${donorProfileId}`);
    if (!response.ok) throw new Error('Failed to fetch consents');
    return response.json();
};

export const createConsent = async (consentData) => {
    const response = await fetch(`${API_BASE}/consent-records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(consentData),
    });
    if (!response.ok) throw new Error('Failed to create consent');
    return response.json();
};

export const getMyMatches = async (donorProfileId) => {
    const response = await fetch(`${API_BASE}/matches?donorProfileId=${donorProfileId}`);
    if (!response.ok) throw new Error('Failed to fetch matches');
    return response.json();
};
export const acceptMatch = async (matchId) => {
    const response = await fetch(`${API_BASE}/matches/${matchId}/accept`, { method: 'POST' });
    if (!response.ok) throw new Error('Failed to accept match');
    return response.json();
};
export const declineMatch = async (matchId) => {
    const response = await fetch(`${API_BASE}/matches/${matchId}/decline`, { method: 'POST' });
    if (!response.ok) throw new Error('Failed to decline match');
    return response.json();
};
export const getAllocations = async () => {

    const response = await fetch(`${API_BASE}/allocations?page=0&size=100`);
    if (!response.ok) throw new Error('Failed to fetch allocations');
    return response.json();
};
export const getAllocationEvents = async (id) => {
    const response = await fetch(`${API_BASE}/allocations/${id}/events`);
    if (!response.ok) throw new Error('Failed to fetch allocation events');
    return response.json();
};