const PIN_KEY = 'police_ot_pin';
const LOCK_TIMEOUT = 60000;
let lockTimer;

function lockApp() {
  lockScreen.style.display = 'flex';
  app.style.display = 'none';
}

function unlockApp() {
  lockScreen.style.display = 'none';
  app.style.display = 'block';
  resetTimer();
}

function resetTimer() {
  clearTimeout(lockTimer);
  lockTimer = setTimeout(lockApp, LOCK_TIMEOUT);
}

if (!localStorage.getItem(PIN_KEY)) {
  const pin = prompt('Set a 4-digit PIN');
  if (pin) localStorage.setItem(PIN_KEY, pin);
}

unlockBtn.onclick = () => {
  if (pinInput.value === localStorage.getItem(PIN_KEY)) {
    unlockApp();
  } else {
    alert('Incorrect PIN');
  }
};

['click','touchstart','keydown'].forEach(e =>
  document.addEventListener(e, resetTimer)
);

lockApp();
