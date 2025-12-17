const WEEKLY_HOURS = 40;

const PAY = {
  met: {
    "Police Constable": {1:31646,2:32472,3:33789,4:35106,5:37737,6:43038,7:50256},
    "Police Sergeant": {2:53568,3:54660,4:56208}
  },
  other: {
    "Police Constable": {1:31646,2:32472,3:33789,4:35106,5:37737,6:43038,7:50256},
    "Police Sergeant": {2:53568,3:54660,4:56208}
  }
};

const forceEl = document.getElementById('force');
const rankEl = document.getElementById('rank');
const pointEl = document.getElementById('payPoint');
const hoursEl = document.getElementById('hours');
const otTypeEl = document.getElementById('otType');

const baseEl = document.getElementById('base');
const otEl = document.getElementById('ot');
const grossEl = document.getElementById('gross');
const deductionsEl = document.getElementById('deductions');
const netEl = document.getElementById('net');

function loadRanks() {
  rankEl.innerHTML = '';
  Object.keys(PAY[forceEl.value]).forEach(r => {
    rankEl.add(new Option(r, r));
  });
  loadPayPoints();
}

function loadPayPoints() {
  pointEl.innerHTML = '';
  Object.keys(PAY[forceEl.value][rankEl.value]).forEach(p => {
    pointEl.add(new Option(p, p));
  });
  calculate();
}

function calculate() {
  const annual = PAY[forceEl.value][rankEl.value][pointEl.value];
  if (!annual) return;

  const base = annual / 52 / WEEKLY_HOURS;
  const otRate = base * Number(otTypeEl.value);
  const hours = Number(hoursEl.value) || 0;
  const gross = otRate * hours;

  const higher = annual > 50270;
  const deductions = gross * ((higher ? 0.4 : 0.2) + (higher ? 0.02 : 0.08));
  const net = gross - deductions;

  baseEl.textContent = base.toFixed(2);
  otEl.textContent = otRate.toFixed(2);
  grossEl.textContent = gross.toFixed(2);
  deductionsEl.textContent = deductions.toFixed(2);
  netEl.textContent = net.toFixed(2);
}

document.addEventListener('DOMContentLoaded', () => {
  loadRanks();
  forceEl.onchange = loadRanks;
  rankEl.onchange = loadPayPoints;
  pointEl.onchange = calculate;
  hoursEl.oninput = calculate;
  otTypeEl.onchange = calculate;
});
