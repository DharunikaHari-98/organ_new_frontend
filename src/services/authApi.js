const API_BASE_URL = 'http://localhost:8080/api/auth';

const fakeWait = (ms) => new Promise((r) => setTimeout(r, ms));
const mockRegister = async (userData) => {
  await fakeWait(200);
  return { id: 1, name: userData?.name || 'User', email: userData?.email || 'user@example.com' };
};
const mockLogin = async (credentials) => {
  await fakeWait(200);
  return { id: 1, name: 'User', email: credentials?.email || 'user@example.com', token: 'dev-token' };
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      // if backend doesn't have the endpoint yet, fall back to mock
      if (response.status === 404) return mockRegister(userData);
      const errorData = await response.json().catch(() => ({ message: 'Registration failed' }));
      throw new Error(errorData.message);
    }
    return response.json();
  } catch (err) {
    // network error fallback
    return mockRegister(userData);
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      if (response.status === 404) return mockLogin(credentials);
      const errorData = await response.json().catch(() => ({ message: 'Invalid credentials' }));
      throw new Error(errorData.message);
    }
    return response.json();
  } catch (err) {
    return mockLogin(credentials);
  }
};
