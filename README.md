# 🌱 Sprout

A playful, cartoon-style learning app with chunky buttons, a lesson path, streaks, hearts, XP and a guide: **Hana**, an original chibi anime girl with a sprout for an ahoge.

**What's inside**

| Tab | What it does |
| --- | --- |
| **Chess** | Play real games against Hana, an AI that runs on your phone (Easy / Medium / Hard). Each lesson starts from one of 43 gambits from the Meridium library; win or draw to pass. Hana grades every move (Best, Good, Inaccuracy, Mistake, Blunder) and suggests a better move. Hints and take-backs cost gems. Each unit ends with a short review quiz. **Free play** starts a full game from move one. |
| **GCSE History** | The Cold War (1945–1991) in 3 units, built from your *Cold War Revision Starter* Obsidian note: dates, causes, putting events in order, matching years to events. |
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
- `www/js/game.js`: the chess game screen vs Hana
- `www/js/engine-worker.js`: the chess AI (alpha-beta search in a Web Worker, with a time limit per move)
- `www/js/courses.js`: course units and question generators (chess, GCSE History, Spanish)
- `www/js/gambits.js`: opening data (generated from `scripts/gambits_data.json`)
- `www/js/mascot.js`: Hana, drawn as SVG with four moods (happy, cheer, sad, think)
- `www/vendor/chess.js`: [chess.js](https://github.com/jhlywa/chess.js) 1.4.0 (BSD-2-Clause) for boards and legal moves
- `capacitor.config.json` + `.github/workflows/android.yml`: Android packaging
