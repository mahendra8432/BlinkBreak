
# 👁️ BlinkBreak 👀

BlinkBreak is a **simple, distraction-free productivity timer** that helps you alternate between Focus and Break sessions.  
It encourages screen breaks with a calming alarm sound to signal rest periods.  

Originally built with JavaScript, BlinkBreak is now fully migrated to **TypeScript** for better type safety and maintainability.

---

## 🚀 Features

✨ **Customizable** Focus and Break durations  
🔁 **Automatic** cycling between Focus and Break sessions  
🔔 **Alarm sound** plays only in Break mode  
🔇 **Silent Focus** mode to stay concentrated  
⚡ **Frontend-only** – no backend, no extra setup

---

## 🧠 How It Works 

1. Set your preferred Focus and Break durations.
2. Click **Start** – the timer begins with Focus mode.
3. When Focus time ends → Break mode starts with an alarm.
4. After Break ends → Focus resumes automatically.
5. The cycle continues until you stop it.

---

## 🛠️ Tech Stack

- ⚛️ **React** with **TypeScript**
- 🎨 **CSS** for styling
- 🧪 **Vite** for lightning-fast builds
- 🔔 **Native Audio API** for sound alerts

---

## 📁 Project Structure

```

BlinkBreak/
├── public/
│   ├── alarm.mp3                          # Alarm sound for Break mode
│   ├── Nature-sounds-thunder-and-rain.mp3 # Optional ambient sound will add in future
│   └── vite.svg                           # Vite logo
├── src/
│   ├── App.css                            # Styles
│   ├── App.tsx                            # Main App component
│   └── main.tsx                           # React entry point
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── vite.config.js
└── README.md

````

✏️ Note: Original `.jsx` files are now `.tsx` after migrating to TypeScript.

---

## 🧪 Getting Started

Clone the repo, install dependencies, and start the dev server:

```bash
# Clone the repository
git clone https://github.com/mahendra8432/BlinkBreak.git
cd BlinkBreak

# Install dependencies
npm install

# Start the development server
npm run dev
````

---

## 🎉 Enjoy!

Stay productive and keep your eyes healthy with BlinkBreak! 🌱🌱🌱🌱🌱🌱🌱🌱🌱🌱
Made with ❤️ by [Mahendra Bansode](https://github.com/mahendra8432)

🕒 Last Changed: March 27, 2025


