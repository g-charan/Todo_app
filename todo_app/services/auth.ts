import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Types
export interface User {
  user_id: string;
  name: string;
  email: string;
  profile_picture_url?: string;
  timezone?: string;
  last_login?: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
  timezone?: string;
}

export interface LoginData {
  email: string;
  password: string;
  remember?: boolean;
}

// Helper functions
const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
};

const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
};

const setUser = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = (): User | null => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (error) {
    return null;
  }
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem("access_token");
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem("refresh_token");
};

export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

// API functions
export const register = async (
  data: RegisterData
): Promise<{ success: boolean; message: string; user_id?: string }> => {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    return {
      success: true,
      message: response.data.message,
      user_id: response.data.user_id,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Registration failed",
    };
  }
};

export const login = async (
  data: LoginData
): Promise<{ success: boolean; message: string; user?: User }> => {
  try {
    console.log("Login attempt with:", { email: data.email });
    const response = await axios.post<AuthResponse>(`${API_URL}/login`, data);

    console.log("Login response:", response.data);

    // Store tokens and user data
    setTokens(response.data.access_token, response.data.refresh_token);
    setUser(response.data.user);

    return {
      success: true,
      message: response.data.message,
      user: response.data.user,
    };
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Login failed",
    };
  }
};

export const logout = (): void => {
  clearTokens();
  window.location.href = "/login";
};

export const refreshToken = async (): Promise<boolean> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    return false;
  }

  try {
    const response = await axios.post(
      `${API_URL}/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    localStorage.setItem("access_token", response.data.access_token);
    return true;
  } catch (error) {
    clearTokens();
    return false;
  }
};

// Setup axios interceptor for token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshed = await refreshToken();

      if (refreshed) {
        // Update the authorization header
        originalRequest.headers["Authorization"] = `Bearer ${getAccessToken()}`;
        return axios(originalRequest);
      }

      // If refresh failed, redirect to login
      logout();
    }

    return Promise.reject(error);
  }
);

// Add authorization header to all requests if token exists
axios.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
