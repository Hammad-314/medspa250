export const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';

export async function apiFetch(endpoint, options = {}) {
  const token = (typeof window !== 'undefined') ? localStorage.getItem('token') || localStorage.getItem('access_token') : null;
  const headers = { 'Content-Type':'application/json', ...(options.headers||{}), ...(token ? { Authorization: `Bearer ${token}` } : {}) };
  const res = await fetch(`${API_URL}/${endpoint}`, { ...options, headers });
  const text = await res.text().catch(()=>null);
  try { 
    const data = text ? JSON.parse(text) : null; 
    if (!res.ok) throw { status: res.status, data }; 
    return data; 
  } catch(e) { 
    if (e instanceof SyntaxError) { 
      throw { status: res.status, raw: text }; 
    } 
    throw e; 
  }
}
