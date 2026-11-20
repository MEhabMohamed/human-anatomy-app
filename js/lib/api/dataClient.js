/**
 * Centralized Data/API Control Facade for Human Anatomy App.
 */
window.AnatomyDataClient = {
  getHierarchy() {
    return window.ANATOMY_DATABASE ? window.ANATOMY_DATABASE.hierarchy : {};
  },
  getPartById(id) {
    return window.ANATOMY_DATABASE && window.ANATOMY_DATABASE.flatDatabase
      ? window.ANATOMY_DATABASE.flatDatabase[id] || null
      : null;
  },
  searchParts(query) {
    const q = String(query || '').trim().toLowerCase();
    if (!q || !window.ANATOMY_DATABASE) return [];
    return Object.entries(window.ANATOMY_DATABASE.flatDatabase)
      .filter(([, item]) => item.name.toLowerCase().includes(q) || (item.latin && item.latin.toLowerCase().includes(q)))
      .map(([id, item]) => ({ id, ...item }));
  },
};

