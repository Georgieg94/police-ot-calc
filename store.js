function getEntries() {
  return JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
}

function saveEntry(entry) {
  const all = getEntries();
  all.push(entry);
  localStorage.setItem(STORE_KEY, JSON.stringify(all));
}

function fileToBase64(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}
