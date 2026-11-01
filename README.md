# 🌱 Sprout

A playful, cartoon-style learning app with chunky buttons, a lesson path, streaks, hearts, XP and a mascot (Pip the sprout).

**Three things in one app**

| Tab | What it does |
| --- | --- |
| **Chess Openings** course | 5 units, 43 gambits from the Meridium library. Name the opening on a board, find the key move, put the moves in order, match openings to moves. |
| **Spanish** course | 4 units (Basics, Food, Animals, Family). Picture cards, listening (🔊 uses your phone's Spanish voice), sentence building, matching pairs. |
| **Habits** | Daily check-ins with per-habit streaks and a 7-day history. Each check-in earns 5 XP. |

Mistakes cost a heart and the question comes back at the end of the lesson. Hearts refill over time (1 every 20 min) or with gems. Progress is saved on the device.

## Get it on your phone

### Option 1: install as a web app (iPhone and Android)
1. One-time setup on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Every push runs the *Deploy web app to GitHub Pages* workflow. The app is then at
   `https://md505d1-art.github.io/New-App.py/`
3. Open that link on your phone:
   - **iPhone (Safari):** Share button → **Add to Home Screen**
   - **Android (Chrome):** ⋮ menu → **Install app** (or Profile tab → *Install Sprout*)

It works offline after the first visit.

### Option 2: Android APK
Every push runs the *Build Android APK* workflow, which:
- attaches **Sprout.apk** to the **"Sprout – latest APK"** release (Releases section of this repo), and
- uploads it as a workflow artifact.

On your Android phone open the release, tap **Sprout.apk**, and allow "install unknown apps" for your browser when asked. This is a debug-signed build, fine for personal use but not for the Play Store.

## Run it locally
```bash
npm start            # serves www/ at http://localhost:8080
npm run check        # verifies every gambit line is legal chess
npm run icons        # re-renders icons from the mascot (needs Playwright)
```

Build the APK yourself (needs Android Studio / Android SDK and Java 21):
```bash
npm install
npm run android:add && npm run android:assets && npm run android:sync
npm run android:apk  # → android/app/build/outputs/apk/debug/app-debug.apk
```

## Code map
- `www/index.html`, `www/css/style.css`: the app shell and the whole visual style
- `www/js/app.js`: screens, lesson engine, hearts/XP/streaks, habits
- `www/js/courses.js`: course units and question generators
- `www/js/gambits.js`: opening data (generated from `scripts/gambits_data.json`)
- `www/js/mascot.js`: Pip, drawn as SVG with moods
- `www/vendor/chess.js`: [chess.js](https://github.com/jhlywa/chess.js) 1.4.0 (BSD-2-Clause) for boards and legal moves
- `capacitor.config.json` + `.github/workflows/android.yml`: Android packaging
