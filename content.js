const meter = document.createElement("div");
meter.id = "psa-meter";
meter.innerHTML = `
  <div id="psa-header">🔐 Password Strength</div>
  <div id="psa-bar-wrap"><div id="psa-bar"></div></div>
  <div id="psa-status">Start typing…</div>
`;
document.body.appendChild(meter);

const bar = document.getElementById("psa-bar");
const status = document.getElementById("psa-status");

function checkStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { pct: "10%", color: "#ff3b30", label: "Very Weak" },
    { pct: "25%", color: "#ff3b30", label: "Weak" },
    { pct: "50%", color: "#ff9500", label: "Fair" },
    { pct: "75%", color: "#ffd60a", label: "Good" },
    { pct: "100%", color: "#34c759", label: "Strong" },
  ];

  const lvl = levels[Math.min(score, levels.length - 1)];
  bar.style.width = lvl.pct;
  bar.style.background = lvl.color;
  status.textContent = lvl.label;
  status.style.color = lvl.color;
}

document.addEventListener("focusin", (e) => {
  if (e.target.type !== "password") return;
  const input = e.target;
  meter.style.display = "block";

  function updateMeter() {
    const rect = input.getBoundingClientRect();
    meter.style.left = window.scrollX + rect.left + "px";
    meter.style.top = window.scrollY + rect.bottom + 8 + "px";
    if (input.value.length > 0) {
      checkStrength(input.value);
    } else {
      bar.style.width = "0%";
      status.textContent = "Start typing…";
      status.style.color = "rgba(255,255,255,0.5)";
    }
  }

  updateMeter();
  input.addEventListener("input", updateMeter);
  input.addEventListener("blur", () => {
    setTimeout(() => { meter.style.display = "none"; }, 200);
  });
});
