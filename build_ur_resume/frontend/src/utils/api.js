const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export function apiUrl(path) {
  // ensure leading slash
  return `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

// small wrapper for JSON requests
export async function postJson(path, body = {}, opts = {}) {
  const res = await fetch(apiUrl(path), {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
    body: JSON.stringify(body),
    ...opts,
  });
  return { ok: res.ok, status: res.status, data: await res.json().catch(()=>null) };
}

export async function authFetch(path, opts = {}) {
  const token = localStorage.getItem("accessToken");
  const headers = { ...(opts.headers || {} ), };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(apiUrl(path), { ...opts, headers });
  return res;
}
