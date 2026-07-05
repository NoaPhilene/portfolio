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
    return api
      .createProject({ name: 'Nieuw project', year: '', url: '', cat: { en: '', nl: '' }, role: { en: '', nl: '' }, desc: { en: '', nl: '' }, tags: [] })
      .then((p) => { setProjects((list) => [...list, p]); return p; });
  }, []);

  const updateProject = useCallback((id, data) => {
    return api.updateProject(id, data).then((p) => {
      setProjects((list) => list.map((x) => (x.id === id ? p : x)));
      return p;
    });
  }, []);

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
    deleteProject,
    addProjectImage,
    removeProjectImage,
    updateSiteImage,
  };
}
