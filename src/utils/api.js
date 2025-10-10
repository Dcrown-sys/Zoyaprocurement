// utils/api.js
const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000"; // dev fallback

export async function signupUser(data) {
  const res = await fetch(`${API_BASE}/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Signup failed");
  return res.json();
}

export async function loginUser(data) {
  const res = await fetch(`${API_BASE}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function firebaseLogin(idToken) {
  const res = await fetch(`${API_BASE}/users/firebase-login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: idToken }),
  });
  if (!res.ok) throw new Error("Google login failed");
  return res.json();
}
