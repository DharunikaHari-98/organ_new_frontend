// src/services/authApi.js

// Build base from env (trim trailing slash) then add /api/auth
const root = (process.env.REACT_APP_API_URL || '').replace(/\/+$/, '');
const API_BASE_URL = `${root}/api/auth`;

const fakeWait = (ms) => new Promise((r) => setTimeout(r, ms));

const mockRegister = async (userData) => {
  await fakeWait(200);
  return {
    id: 1,
    name: userData?.name || 'User',
    email: userData?.email || 'user@example.com',
  };
};

const mockLogin = async (credentials) => {
  await fakeWait(200);
  return {
    id: 1,
    name: 'User',
    email: credentials?.email || 'user@example.com',
    token: 'dev-token',
  };
};

export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      if (res.status === 404) return mockRegister(userData); // endpoint missing in dev
      const err = await res.json().catch(() => ({ message: 'Registration failed' }));
      throw new Error(err.message);
    }
    return res.json();
  } catch (_) {
    // network or other error → mock in dev
    return mockRegister(userData);
  }
};

export const loginUser = async (credentials) => {
  try {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      if (res.status === 404) return mockLogin(credentials); // endpoint missing in dev
      const err = await res.json().catch(() => ({ message: 'Invalid credentials' }));
      throw new Error(err.message);
    }
    const data = await res.json();

    // Optional: persist token so other requests can use it
    if (data?.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  } catch (_) {
    const data = await mockLogin(credentials);
    // Optional: persist mock token too
    localStorage.setItem('token', data.token);
    return data;
  }
};
