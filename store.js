const STORE_KEY = 'police_ot_entries';

function getEntries() {
  return JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
}

function saveEntry(entry) {
  const all = getEntries();
  all.push(entry);
  localStorage.setItem(STORE_KEY, JSON.stringify(all));
}

function fileToBase64(file) {
  return new Promise(res => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.readAsDataURL(file);
  });
}
