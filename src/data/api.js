const BASE = '/portfolio/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}/${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

export const api = {
  me: () => request('auth.php?action=me'),
  login: (username, password) =>
    request('auth.php?action=login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  logout: () => request('auth.php?action=logout', { method: 'POST' }),

  getContent: () => request('content.php'),
  setContent: (key, lang, value) =>
    request('content.php', { method: 'PUT', body: JSON.stringify({ key, lang, value }) }),

  getProjects: () => request('projects.php'),
  createProject: (data) => request('projects.php', { method: 'POST', body: JSON.stringify(data) }),
  updateProject: (id, data) => request(`projects.php?id=${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProject: (id) => request(`projects.php?id=${id}`, { method: 'DELETE' }),
  addProjectImage: (id, url) =>
    request(`projects.php?action=addImage&id=${id}`, { method: 'POST', body: JSON.stringify({ url }) }),
  removeProjectImage: (id, url) =>
    request(`projects.php?action=removeImage&id=${id}`, { method: 'POST', body: JSON.stringify({ url }) }),

  getSiteImages: () => request('site-images.php'),
  setSiteImage: (key, url) => request('site-images.php', { method: 'POST', body: JSON.stringify({ key, url }) }),

  upload: async (file) => {
    const form = new FormData();
    form.append('file', file);
    const res = await fetch(`${BASE}/upload.php`, { method: 'POST', credentials: 'include', body: form });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Upload mislukt');
    return data;
  },
};
