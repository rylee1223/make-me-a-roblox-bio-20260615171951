# Roblox Bio Scraper

A simple, **mobile‑first**, dark‑mode‑by‑default web app that lets you retrieve the public biography (description) of any Roblox user by entering their username.

## ✨ Features
- **Responsive UI** – works on phones, tablets, and desktop screens.
- **Dark theme** as the default with a light‑mode fallback when the user prefers it.
- Smooth CSS transitions and subtle animations for a polished feel.
- Real‑time fetching using Roblox’s public REST API (`users.roblox.com`).
- Error handling with clear messages (user not found, network issues, etc.).
- “Copy Bio” button to quickly copy the retrieved description to the clipboard.
- Fully client‑side – no server required.

## 🛠️ Tech Stack
| Layer | Technology |
|-------|------------|
| Markup | HTML5 (semantic) |
| Styling | CSS3 with custom properties, Flexbox, media queries |
| Behaviour | Vanilla JavaScript (ES6+) |
| API | Roblox public user API (`https://users.roblox.com`) |

## 📂 Project Structure
```
roblox-bio-scraper/
│
├─ index.html      # Main page – semantic markup, links to CSS/JS
├─ styles.css      # Dark‑mode default, responsive layout, animations
└─ script.js       # Fetches data, updates UI, clipboard support
```

## 🚀 Getting Started

1. **Clone / download** the repository.
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari).
3. Enter a Roblox username and press **Get Bio**.
4. The bio appears below; click **Copy Bio** to copy it to your clipboard.

No build tools, npm, or server setup are required.

## 🧩 How It Works

1. **Form submission** triggers JavaScript.
2. The script calls `https://users.roblox.com/v1/users?username={name}` to obtain the user’s **ID**.
3. With the ID, it requests `https://users.roblox.com/v1/users/{id}/profile` to fetch the `description` field (the bio).
4. Results are displayed with a fade‑in animation; errors are shown in a red message box.
5. The **Copy Bio** button uses the Clipboard API (with a fallback for older browsers).

## 🎨 Customisation

- **Colors & Theme** – modify the CSS variables in `:root` inside `styles.css`.
- **Animations** – adjust the `--transition` variable or add new keyframes.
- **API Endpoints** – if Roblox updates its API, edit the URLs in `script.js`.

## 📄 License

This project is open source and available under the **MIT License**. Feel free to fork, modify, and use it in your own projects.

--- 

*Enjoy scraping Roblox bios safely and responsibly!*