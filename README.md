# 🌱 Sprout

A bright, chunky, cartoon-style learning app with its own layout: a home screen, a course library, a garden that grows as you learn, and a profile. Your guide is **Hana**, an original chibi anime girl with a sprout for an ahoge.

## What's inside

| Area | What it does |
| --- | --- |
| **Today** | Animated sky scene (morning, day, evening or night), daily XP goal ring, streak, a "Continue" card, daily habits and a bookshelf (from the Reading Dashboard note). |
| **Library** | 43 courses with search and filters: School, Languages, Chess. |
| **School (GCSE)** | Maths, English Language, English Literature, Biology, Chemistry, Physics, History (Cold War, from the *Cold War Revision Starter* note), Geography and Computer Science. 4–5 lessons each, with key-term matching and explanations. Starter content: check it against your exam board's specification. |
| **Languages** | 33 languages: Spanish, French, German, Italian, Portuguese, Dutch, Swedish, Norwegian, Danish, Finnish, Polish, Czech, Croatian, Romanian, Hungarian, Greek, Turkish, Russian, Ukrainian, Arabic, Hebrew, Persian, Hindi, Japanese, Korean, Chinese, Vietnamese, Thai, Indonesian, Tagalog, Swahili, Welsh and Irish. 5 chapters each (greetings, food, animals, family, numbers) with picture questions, listening (uses your phone's voices when it has one for that language), spelling with letter tiles, romanisation for non-Latin scripts, and sentence building for Spanish, French, German and Italian. |
| **Chess** | Play real games against Hana, an on-device AI (Easy, Medium, Hard), starting from 43 gambits. Every move is graded with a better-move suggestion; pieces slide; hints and take-backs cost seeds. Free play mode. Each game is logged for review with the one mistake to avoid next time (from the Chess Dashboard note). |
| **Garden** | Every course you start grows a plant, from seed to flower as you finish lessons. |
| **Me** | Stats, weekly XP chart, badges, chess game review and settings. |

Lessons show one question card at a time with instant feedback, combo streaks, progress dots, and Hana reacting in the corner. Missed questions come back at the end, and finished lessons earn 1–3 stars.

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
- `www/js/app.js`: screens (Today, Library, Course, Garden, Me), sheets, results
- `www/js/lesson.js`: the lesson player
- `www/js/store.js`: saved progress, sounds, speech, animation helpers
- `www/js/art.js`: hand-drawn SVG subject icons, the sky scene and garden plants
- `www/js/content/`: GCSE subjects and the 33-language word lists
- `www/js/game.js`: the chess game screen vs Hana
- `www/js/engine-worker.js`: the chess AI (alpha-beta search in a Web Worker, with a time limit per move)
- `www/js/courses.js`: builds every course and its question generators
- `www/js/gambits.js`: opening data (generated from `scripts/gambits_data.json`)
- `www/js/mascot.js`: Hana, drawn as SVG with four moods (happy, cheer, sad, think)
- `www/vendor/chess.js`: [chess.js](https://github.com/jhlywa/chess.js) 1.4.0 (BSD-2-Clause) for boards and legal moves
- `capacitor.config.json` + `.github/workflows/android.yml`: Android packaging
