# GameHub — Mini Games Collection (C++ friendly + JS fallback)

This repository contains a single-page **GameHub** web app with **10** mini-games.  
It includes:
- A polished SPA UI (`index.html`, `styles.css`, `app.js`).
- **JS fallback** playable versions under `js_fallback/games/` — so the site runs out-of-the-box.
- C++ source stubs in `cpp/` — ready for you to compile to WebAssembly (WASM) using **Emscripten**.
- Instructions to build, run locally and host on **Vercel** or **GitHub Pages**.

---

## Quick demo (no build required)
1. In the project root, run a simple static server:
   ```bash
   python3 -m http.server 8000
   ```
2. Open `http://localhost:8000` in your browser and click any game.

The shipped JS fallback implementations are used by default so you can prototype without compiling C++.

---

## How to compile C++ to WebAssembly (Emscripten)
If you want to run C++ in the browser (Option 2), install Emscripten:

1. Follow Emscripten install guide: https://emscripten.org/docs/getting_started/downloads.html

2. Example compile command for a C++ module:
   ```bash
   emcc cpp/tictactoe.cpp -s WASM=1 -s MODULARIZE=1 -s EXPORT_NAME="createTicModule" -o wasm/tictactoe.js -O3
   ```
   That produces `wasm/tictactoe.js` and `wasm/tictactoe.wasm`. You then load `wasm/tictactoe.js` from the frontend and call its exports.

3. Important: when hosting, ensure `.wasm` files are served with `application/wasm` MIME type (most static hosts do this automatically).

We've included minimal C++ stubs in `cpp/` to get you started — expand them to contain full game logic and export functions that the JS glue will call.

---

## How the project is organized
```
/ (root)
  index.html        # main single-page app
  styles.css        # UI styles
  app.js            # loads and launches games
  js_fallback/      # playable JS fallback implementations (works out-of-the-box)
    games/*.js
  cpp/              # C++ source files (compile to WASM if you want)
  wasm/             # (empty) place compiled files here if you build WASM
  README.md
  vercel.json       # sample config for Vercel (static site)
```

---

## Hosting on Vercel (static)
1. Install Vercel CLI: `npm i -g vercel` (optional) or use the web dashboard.
2. From project root run `vercel` and follow prompts. For static hosting, Vercel will detect the project and deploy.
3. If you use WASM, add `vercel.json` with proper headers (sample provided) so Vercel serves `.wasm` with correct content-type.

Sample `vercel.json` (already included):
```json
{
  "version": 2,
  "builds": [{ "src": "index.html", "use": "@vercel/static" }],
  "routes": [{ "src": "/(.*)", "dest": "/index.html" }]
}
```

---

## Hosting on GitHub Pages
1. Push the repo to GitHub.
2. In repo settings, enable GitHub Pages from the `main` branch `/ (root)`.
3. If your WASM doesn't load due to MIME types, use an upstream CDN or Netlify/Vercel instead.

---

## Files you may want to edit
- `js_fallback/games/*.js` : instant-play JS implementations.
- `cpp/*.cpp` : extend and export functions you want compiled to WASM.
- `app.js` : how modules/games are loaded; replace a fallback script with a `wasm/` compiled module when ready.

---

## Notes, tradeoffs and tips
- Compiling to WebAssembly gives speed and lets you reuse C++ code, but increases build complexity.
- I included **playable JS fallback versions** so you can run the site immediately. When you compile C++ -> WASM, you should replace the fallback script path in `app.js` with the generated `wasm/<game>.js` module.
- If you want, I can *also* provide example emscripten export wrappers for one game and modify `app.js` to detect & load wasm module automatically.

Enjoy — and ping me if you want: (1) full WASM compile steps for one game, (2) CI to auto-build WASM, or (3) prettier UI themes.
