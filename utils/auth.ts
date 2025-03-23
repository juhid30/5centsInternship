import axios from "axios";

export async function registerUser(email: string, password: string) {
  const response = await axios.post("/api/auth/register", { email, password });
  return response.data;
}

export async function loginUser(email: string, password: string) {
  const response = await axios.post("/api/auth/login", { email, password });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
}

export async function verifyToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await axios.post("/api/auth/verify", { token });
    return response.data.user;
  } catch {
    logoutUser();
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem("token");
}
