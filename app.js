const WEEKLY_HOURS = 40;

const PAY = {
  met: {
    "Police Constable": {
      1: 31646,
      2: 32472,
      3: 33789,
      4: 35106,
      5: 37737,
      6: 43038,
      7: 50256
    },
    "Police Sergeant": {
      2: 53568,
      3: 54660,
      4: 56208
    }
  },
  other: {
    "Police Constable": {
      1: 31646,
      2: 32472,
      3: 33789,
      4: 35106,
      5: 37737,
      6: 43038,
      7: 50256
    },
    "Police Sergeant": {
      2: 53568,
      3: 54660,
      4: 56208
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const forceEl = document.getElementById("force");
  const rankEl = document.getElementById("rank");
  const pointEl = document.getElementById("payPoint");
  const hoursEl = document.getElementById("hours");
  const otTypeEl = document.getElementById("otType");

  function loadRanks() {
    rankEl.innerHTML = "";

    Object.keys(PAY[forceEl.value]).forEach(rank => {
      const opt = document.createElement("option");
      opt.value = rank;
      opt.textContent = rank;
      rankEl.appendChild(opt);
    });

    rankEl.selectedIndex = 0;
    loadPayPoints();
  }

  function loadPayPoints() {
    pointEl.innerHTML = "";

    const points = PAY[forceEl.value]?.[rankEl.value];
    if (!points) return;

    Object.keys(points).forEach(p => {
      const opt = document.createElement("option");
      opt.value = p;
      opt.textContent = p;
      pointEl.appendChild(opt);
    });

    pointEl.selectedIndex = 0;
    calculate();
  }

  function calculate() {
    const annual =
      PAY[forceEl.value]?.[rankEl.value]?.[pointEl.value];

    if (!annual) return;

    const base = annual / 52 / WEEKLY_HOURS;
    const otRate = base * parseFloat(otTypeEl.value);
    const hours = parseFloat(hoursEl.value) || 0;
    const gross = otRate * hours;

    // Locked PAYE approximation
    const taxRate = annual > 50270 ? 0.4 : 0.2;
    const niRate = annual > 50270 ? 0.02 : 0.08;

    const deductions = gross * (taxRate + niRate);
    const net = gross - deductions;

    document.getElementById("base").textContent = base.toFixed(2);
    document.getElementById("ot").textContent = otRate.toFixed(2);
    document.getElementById("gross").textContent = gross.toFixed(2);
    document.getElementById("deductions").textContent = deductions.toFixed(2);
    document.getElementById("net").textContent = net.toFixed(2);
  }

  // INIT
  loadRanks();

  // EVENTS
  forceEl.addEventListener("change", loadRanks);
  rankEl.addEventListener("change", loadPayPoints);
  pointEl.addEventListener("change", calculate);
  hoursEl.addEventListener("input", calculate);
  otTypeEl.addEventListener("change", calculate);
});
