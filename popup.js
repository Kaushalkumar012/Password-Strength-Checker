const passwordInput = document.getElementById("password");
const fill = document.getElementById("fill");
const strengthLabel = document.getElementById("strength");
const scoreEl = document.getElementById("score");
const crackEl = document.getElementById("crack");
const entropyEl = document.getElementById("entropy");
const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");
const toggleBtn = document.getElementById("toggleVisibility");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const checks = {
  "chk-length": (p) => p.length >= 8,
  "chk-upper":  (p) => /[A-Z]/.test(p),
  "chk-lower":  (p) => /[a-z]/.test(p),
  "chk-number": (p) => /[0-9]/.test(p),
  "chk-symbol": (p) => /[^A-Za-z0-9]/.test(p),
};

function calcEntropy(pass) {
  let pool = 0;
  if (/[a-z]/.test(pass)) pool += 26;
  if (/[A-Z]/.test(pass)) pool += 26;
  if (/[0-9]/.test(pass)) pool += 10;
  if (/[^A-Za-z0-9]/.test(pass)) pool += 32;
  if (pool === 0) return 0;
  return Math.round(pass.length * Math.log2(pool));
}

function crackTime(score, entropy) {
  if (entropy < 28) return "Instantly";
  if (entropy < 36) return "Few seconds";
  if (entropy < 46) return "Few minutes";
  if (entropy < 60) return "Few hours";
  if (entropy < 80) return "Few months";
  if (entropy < 100) return "Few years";
  return "Centuries+";
}

function analyzePassword(pass) {
  let points = 0;

  if (pass.length >= 8)  points += 20;
  if (pass.length >= 12) points += 10;
  if (/[A-Z]/.test(pass)) points += 20;
  if (/[a-z]/.test(pass)) points += 20;
  if (/[0-9]/.test(pass)) points += 15;
  if (/[^A-Za-z0-9]/.test(pass)) points += 15;
  if (points > 100) points = 100;

  // Update checklist
  for (const [id, testFn] of Object.entries(checks)) {
    const el = document.getElementById(id);
    el.classList.toggle("pass", testFn(pass));
  }

  const entropy = calcEntropy(pass);
  entropyEl.textContent = entropy + " bits";

  fill.style.width = points + "%";

  if (points === 0) {
    fill.style.background = "transparent";
    strengthLabel.textContent = "—";
    strengthLabel.style.color = "#e0e0ff";
  } else if (points < 30) {
    fill.style.background = "#ff3b30";
    strengthLabel.textContent = "Weak";
    strengthLabel.style.color = "#ff3b30";
  } else if (points < 60) {
    fill.style.background = "#ff9500";
    strengthLabel.textContent = "Fair";
    strengthLabel.style.color = "#ff9500";
  } else if (points < 80) {
    fill.style.background = "#ffd60a";
    strengthLabel.textContent = "Good";
    strengthLabel.style.color = "#ffd60a";
  } else {
    fill.style.background = "#34c759";
    strengthLabel.textContent = "Strong";
    strengthLabel.style.color = "#34c759";
  }

  scoreEl.textContent = points + " / 100";
  crackEl.textContent = crackTime(points, entropy);
}

passwordInput.addEventListener("input", () => {
  analyzePassword(passwordInput.value);
});

// Toggle password visibility
toggleBtn.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  toggleBtn.textContent = isHidden ? "🙈" : "👁";
});

// Slider
lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
});

// Generate password
generateBtn.addEventListener("click", () => {
  const len = parseInt(lengthSlider.value);
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  const all = upper + lower + numbers + symbols;

  let pwd = [
    upper[Math.floor(Math.random() * upper.length)],
    lower[Math.floor(Math.random() * lower.length)],
    numbers[Math.floor(Math.random() * numbers.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
  ];

  for (let i = 4; i < len; i++) {
    pwd.push(all[Math.floor(Math.random() * all.length)]);
  }

  // Fisher-Yates shuffle
  for (let i = pwd.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pwd[i], pwd[j]] = [pwd[j], pwd[i]];
  }

  passwordInput.value = pwd.join("");
  passwordInput.type = "text";
  toggleBtn.textContent = "🙈";
  analyzePassword(passwordInput.value);
});

// Copy password
copyBtn.addEventListener("click", async () => {
  if (!passwordInput.value) {
    copyBtn.textContent = "⚠ Nothing to copy";
    setTimeout(() => { copyBtn.textContent = "📋 Copy"; }, 2000);
    return;
  }
  await navigator.clipboard.writeText(passwordInput.value);
  copyBtn.textContent = "✔ Copied!";
  setTimeout(() => { copyBtn.textContent = "📋 Copy"; }, 2000);
});
