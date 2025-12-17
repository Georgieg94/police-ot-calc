const STORE_KEY = 'police_ot_entries';

function storeGet() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('Corrupt OT data cleared');
    localStorage.removeItem(STORE_KEY);
    return [];
  }
}

function storeAdd(entry) {
  const all = storeGet();
  all.push(entry);
  localStorage.setItem(STORE_KEY, JSON.stringify(all));
}

if (typeof clearData !== 'undefined') {
  clearData.onclick = () => {
    if (confirm('Clear all data?')) {
      localStorage.removeItem(STORE_KEY);
      if (typeof renderLog === 'function') renderLog();
    }
  };
}
