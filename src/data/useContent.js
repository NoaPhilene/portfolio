import { useCallback, useEffect, useState } from 'react';
import { api } from './api.js';

export function useContent() {
  const [strings, setStrings] = useState({ en: {}, nl: {} });
  const [shared, setShared] = useState({});
  const [projects, setProjects] = useState([]);
  const [siteImages, setSiteImages] = useState({});
  const [loading, setLoading] = useState(true);

  const reloadContent = useCallback(
    () => api.getContent().then((c) => { setStrings({ en: c.en, nl: c.nl }); setShared(c.shared); }),
    []
  );
  const reloadProjects = useCallback(() => api.getProjects().then(setProjects), []);
  const reloadSiteImages = useCallback(() => api.getSiteImages().then(setSiteImages), []);

  useEffect(() => {
    Promise.all([reloadContent(), reloadProjects(), reloadSiteImages()]).finally(() => setLoading(false));
  }, [reloadContent, reloadProjects, reloadSiteImages]);

  const updateString = useCallback((key, lang, value) => {
    setStrings((s) => ({ ...s, [lang]: { ...s[lang], [key]: value } }));
    return api.setContent(key, lang, value);
  }, []);

  const updateShared = useCallback((key, value) => {
    setShared((s) => ({ ...s, [key]: value }));
    return api.setContent(key, '', value);
  }, []);

  const createProject = useCallback(() => {
    // New projects start as a clone of the first project (the "default"
    // template) so there's always a filled-in example to adjust rather than
    // a blank form.
    const template = projects[0];
    const payload = template
      ? { name: template.name, year: template.year, url: template.url, cat: template.cat, role: template.role, desc: template.desc, tags: template.tags }
      : { name: 'Nieuw project', year: '', url: '', cat: { en: '', nl: '' }, role: { en: '', nl: '' }, desc: { en: '', nl: '' }, tags: [] };

    return api.createProject(payload).then(async (created) => {
      let project = created;
      if (template?.images?.length) {
        for (const url of template.images) {
          project = await api.addProjectImage(created.id, url);
        }
      }
      setProjects((list) => [...list, project]);
      return project;
    });
  }, [projects]);

  const updateProject = useCallback((id, data) => {
    return api.updateProject(id, data).then((p) => {
      setProjects((list) => list.map((x) => (x.id === id ? p : x)));
      return p;
    });
  }, []);

  const moveProject = useCallback((id, direction) => {
    const idx = projects.findIndex((p) => p.id === id);
    if (idx === -1) return Promise.resolve();
    const swapWith = direction === 'left' ? idx - 1 : idx + 1;
    if (swapWith < 0 || swapWith >= projects.length) return Promise.resolve();

    const reordered = [...projects];
    [reordered[idx], reordered[swapWith]] = [reordered[swapWith], reordered[idx]];
    setProjects(reordered);
    return api.reorderProjects(reordered.map((p) => p.id));
  }, [projects]);

  const deleteProject = useCallback((id) => {
    return api.deleteProject(id).then(() => setProjects((list) => list.filter((x) => x.id !== id)));
  }, []);

  const addProjectImage = useCallback((id, url) => {
    return api.addProjectImage(id, url).then((p) => setProjects((list) => list.map((x) => (x.id === id ? p : x))));
  }, []);

  const removeProjectImage = useCallback((id, url) => {
    return api.removeProjectImage(id, url).then((p) => setProjects((list) => list.map((x) => (x.id === id ? p : x))));
  }, []);

  const updateSiteImage = useCallback((key, url) => {
    setSiteImages((s) => ({ ...s, [key]: url }));
    return api.setSiteImage(key, url);
  }, []);

  return {
    loading,
    STRINGS: strings,
    shared,
    PROJECTS: projects,
    siteImages,
    updateString,
    updateShared,
    createProject,
    updateProject,
    moveProject,
    deleteProject,
    addProjectImage,
    removeProjectImage,
    updateSiteImage,
  };
}
