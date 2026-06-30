<div align="center">

# 🔐 Password Strength Analyzer

### A powerful browser extension to analyze, generate & secure your passwords in real-time

[![Microsoft Edge](https://img.shields.io/badge/Microsoft%20Edge-Add--on-blue?style=for-the-badge&logo=microsoft-edge&logoColor=white)](https://microsoftedge.microsoft.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

> **Stop using weak passwords. Analyze, generate, and secure your digital life — right from your browser.**

<br/>

![Password Strength Analyzer Banner](icons/icon128.png)

</div>

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 🔴🟡🟢 **Live Strength Meter** | Real-time visual progress bar as you type |
| 🎯 **Strength Score** | Rates your password from **0 to 100** |
| 🧮 **Entropy Calculator** | Measures true cryptographic strength in **bits** |
| ⏱️ **Crack Time Estimator** | From *Instantly* to *Centuries+* |
| ✅ **Requirements Checklist** | Live checklist — uppercase, lowercase, numbers, symbols |
| ⚡ **Password Generator** | One-click secure password with **custom length (8–32)** |
| 📋 **Copy to Clipboard** | Copy your password instantly |
| 👁️ **Toggle Visibility** | Show/hide password while typing |
| 🌐 **Floating Meter** | Auto-appears on **any website's** password field |

---

## 🚀 Demo

```
Password: P@ssw0rd123!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Score       : 85 / 100
Strength    : Strong 💪
Entropy     : 72 bits
Crack Time  : Few Years
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ 8+ characters
✓ Uppercase letter
✓ Lowercase letter
✓ Number
✓ Special character
```

---

## 📦 Installation

### Option 1 — Microsoft Edge Add-ons Store
> 🔜 Coming soon — currently under review!

### Option 2 — Load Manually (Developer Mode)

```bash
# 1. Clone the repository
git clone https://github.com/Kaushalkumar012/Password-Strength-Checker.git

# 2. Open Microsoft Edge and go to
edge://extensions

# 3. Enable Developer Mode (bottom left toggle)

# 4. Click "Load Unpacked" and select the cloned folder

# 5. Done! Pin the extension to your toolbar 📌
```

---

## 🛠️ Tech Stack

```
├── HTML5          → Popup structure
├── CSS3           → Glassmorphism UI & animations
├── JavaScript     → Strength logic, entropy calc, generator
└── Chrome APIs    → Extension manifest v3, clipboard, content scripts
```

---

## 📁 Project Structure

```
Password-Strength-Checker/
│
├── 📄 manifest.json       → Extension config (Manifest V3)
├── 📄 popup.html          → Main popup UI
├── 📄 popup.css           → Modern glassmorphism styles
├── 📄 popup.js            → Core strength analysis logic
├── 📄 content.js          → Floating meter on all websites
├── 📄 style.css           → Floating meter styles
├── 📄 background.js       → Service worker
└── 📁 icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## 🧠 How Strength is Calculated

```javascript
if (length >= 8)          +20 points
if (length >= 12)         +10 points
if (hasUppercase)         +20 points
if (hasLowercase)         +20 points
if (hasNumbers)           +15 points
if (hasSpecialChars)      +15 points
─────────────────────────────────────
Max Score = 100 points

Entropy = length × log2(characterPoolSize)
```

---

## 🔒 Privacy

- ✅ **Zero data collection** — your passwords never leave your device
- ✅ Works **100% offline**
- ✅ No tracking, no analytics, no servers
- ✅ Open source — inspect every line of code

---

## 📸 Screenshots

> Load the extension and take screenshots to add here!

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repo
2. Create a new branch (`git checkout -b feature/cool-feature`)
3. Commit your changes (`git commit -m 'Add cool feature'`)
4. Push to the branch (`git push origin feature/cool-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** — feel free to use it in your own projects!

---

<div align="center">

Made with ❤️ by [Kaushal Kumar](https://github.com/Kaushalkumar012)

⭐ **Star this repo if you found it useful!** ⭐

</div>
