# 🌱 Sprout

A calm, pastel learning app for GCSEs, languages and chess. Your guide is **Hana** (teal braided hair, orange jacket) and her floating triangle robot **Bit**. Both talk. Everything works **offline**.

## What's inside

| Area | What it does |
| --- | --- |
| **Home** | Greeting with an **exam countdown**, weekly streak, Hana's thoughts, quick actions (⏱️ Focus, 🧠 Revise, 🃏 Cards, ♞ Chess, 🌿 Breathe), **Daily quests**, **Smart revise**, "Continue learning", topic ideas and daily habits. |
| **Daily quests** | Three small goals a day (finish lessons, earn XP, revise, play chess, focus, breathe, tick habits, study your cards), each worth seeds, plus a bonus for finishing all three. |
| **Focus timer** | Study with Hana, Pomodoro style: 15, 25 or 45 minutes, a progress ring, Hana cheering at halfway and near the end, then a 5-minute break. Keeps the screen awake, keeps time correctly if the phone sleeps, and counts as learning time. |
| **My flashcards** | Make your own cards (front, back, subject). Study them as a quiz (flip cards, typed answers, multiple choice), and they join Smart revise automatically. |
| **Explore** | 66 courses (over 750 lessons) with search. School subjects can be filtered by exam board: **AQA, Edexcel or Eduqas**. |
| **School (GCSE)** | Every GCSE subject across AQA, Edexcel and Eduqas: Maths, Statistics, English Language, English Literature, Biology, Chemistry, Physics, Combined Science, Geography, History (Cold War, from your notes), Religious Studies, Computer Science, Business, Economics, Citizenship, Psychology, Sociology, Astronomy, Latin, Film Studies, Media Studies, Art and Design, Design and Technology, Electronics, Engineering, Food Preparation and Nutrition, Drama, Dance, Music and PE. Each subject is tagged with the boards that offer it. GCSE languages link to the matching language course. Every subject now goes well beyond starter level: the sciences, Maths, English Language and Literature, Geography, RS, History and Computer Science cover their whole AQA specifications (Combined Science alone has 52 lessons), and every other subject has extra units. All GCSE lessons are open, so you can revise any topic in any order. Check details against your own board's specification. |
| **Languages** | 34 languages, including Czech (now with sentence building) and Urdu, plus **British Sign Language** (fingerspelling vowels, numbers 1–5 and everyday signs, with hand diagrams). French, Spanish and German also have 10 GCSE vocabulary themes (school, free time, town, holidays, weather, home and routine, days, clothes and shopping, jobs and the future, environment and technology) with example sentences, open for revision straight away. |
| **Hana's personality** | Hana is a cheerful, slightly dramatic inventor who is always building something for Bit; Bit is deadpan and cheeky. She greets you for the time of day, remembers what you last studied and how long you've been away, and tells you a fun fact, a study tip or what she's been tinkering with (tap her on Home, or press "What else?"; poke her too often and she gets flustered). Your **friendship level** with her (New friends → Study buddies → Good friends → Best friends → Lab partners for life) grows each day you visit and with lessons, chess, focus sessions and breathers. |
| **Breathe with Hana** | Mental resets: guided breathing with an animated circle (box breathing, calm 4-7-8, quick reset; 1, 3 or 5 minutes) and a 5-4-3-2-1 grounding exercise, with Hana guiding you. On Home (🌿 Breathe), and suggested after 25+ minutes of learning, a tough lesson or a lost chess game. Calm minutes show on your profile. |
| **Chess** | Chess.com-style play against Hana: drag or tap to move, a green board with classic pieces, wooden move and capture sounds, check, castle and promotion sounds, an eval bar, captured pieces, and every move rated live (Brilliant, Best, Excellent, Good, Inaccuracy, Mistake, Blunder). Ratings work like chess.com's: by how much winning chance a move gives away; "Best" is the engine's top move and "Brilliant" (!!) is a sound piece sacrifice. Accuracy uses Lichess's formula with a harmonic mean, so blunders aren't hidden by easy moves. Then a full **Game review**: accuracy for both players, an evaluation graph, move-by-move stepping with the best move drawn as a green arrow, and a summary table. 43 gambit lessons plus free play. Castle by moving the king two squares or onto its rook, like on chess.com. |
| **Progress** | Learning time by week, month or all time, lessons completed, mastered topics, your garden and chess game history. |
| **Profile** | **Build your own character** (skin, hair style and colour, eyes, smile, outfit, extras, background), badges, bookshelf and settings: exam board, sound, **Hana's voice** (automatic picks the most Kimberly-like US female voice on your phone, or choose any installed voice, with Soft, Bright or Sweet pitch and a preview), **theme (Auto, Light or Dark)**, your **first exam date** for the countdown, offline status, and **Back up / Restore** (a code that moves all your progress to another phone). |

### How lessons work (inspired by Seneca)
Seneca keeps sessions short: a few concept cards, then lots of varied questions, with an algorithm deciding what to repeat and when. Sprout does the same:
1. **Key idea**: read the key terms, words, signs or events first.
2. **Check your understanding**: multiple choice, picture cards, **toggles** (pick the right word in each line), **wordfill** (type the missing word, with allowance for a missing accent or one typo), tile building, matching and **flashcards**. The same fact comes back in different formats.
3. **Smart revise**: every fact you learn goes into spaced repetition (boxes 1–6, reviewed after 1, 2, 4, 7, 14 and 30 days). Each course shows a **memory** score.

### Voices on Android
Android's in-app browser has no built-in speech, so the APK uses the native [`@capacitor-community/text-to-speech`](https://github.com/capacitor-community/text-to-speech) plugin for Hana, Bit and lesson audio. For the best voice, install a good English (US) voice in Android **Settings → Text-to-speech** (for example Google's "English (United States)" voices), then pick it under Profile → Hana's voice.

## Get it on your phone

**Scan with your phone's camera** (from your laptop screen):

| iPhone | Android |
|---|---|
| <img src="assets/qr-iphone.svg" width="200" alt="QR code for the Sprout web app"> | <img src="assets/qr-android.svg" width="200" alt="QR code to download Sprout.apk"> |
| Opens Sprout in Safari. Tap **Share → Add to Home Screen**. | Downloads **Sprout.apk**. Open it and tap **Install**. |

The same codes, with step-by-step instructions, are on **Get-Sprout-on-your-phone.html**: download it from the **"Sprout – latest APK"** release and open it on your laptop, or open `get.html` on the live site, or tap **Put Sprout on your phone** in the app's Profile. To rebuild the page after changing a link: `pip install segno && python3 scripts/make-get-page.py`.

### iPhone: installable web app
1. One-time setup on GitHub (easiest on a laptop): **Settings → Pages → Build and deployment → Source: GitHub Actions**. Until this is on, the iPhone code leads to a "404" page.
2. Every push then deploys to `https://md505d1-art.github.io/New-App.py/`
3. Open it on your phone. iPhone (Safari): Share → **Add to Home Screen**. Android (Chrome): ⋮ → **Install app**.

After the first visit everything is cached, including lessons, chess, fonts and images, so it works with no internet. Apps added to the Home Screen keep their saved progress (Safari only clears data for websites you haven't visited in a while). **Removing Sprout from the Home Screen deletes its saved progress**, so use Profile → **Back up progress** first, then **Restore from a backup** after adding it again. iOS never updates an icon that's already on the Home Screen: to see a new icon, back up, remove the app, add it again from Safari, and restore.

### Android: APK
Every push builds **Sprout.apk** and attaches it to the **"Sprout – latest APK"** release. Everything is bundled inside the APK, so it works offline from the first launch. It's a debug-signed build for personal use.

## Run it locally
```bash
npm start            # serves www/ at http://localhost:8080
npm run check        # verifies every gambit line is legal chess
npm run icons        # re-renders app icons from Hana's art (needs Playwright)
```

## Code map
- `www/js/app.js`: screens, character creator, Smart revise, results
- `www/js/lesson.js`: the lesson player and all question types
- `www/js/srs.js`: spaced repetition and memory scores
- `www/js/game.js`, `www/js/review.js`, `www/js/chess-analysis.js`, `www/js/chess-sound.js`: chess play, game review, move ratings and board sounds
- `www/js/engine-worker.js`: the chess AI and analysis (alpha-beta search in Web Workers)
- `www/js/mascot.js`, `www/js/voice.js`, `www/js/speech.js`: Hana and Bit, their voices, and the speech layer (native on Android, Web Speech in browsers)
- `www/js/persona.js`: Hana's personality, memory, friendship level and home-screen thoughts
- `www/js/breathe.js`: Breathe with Hana (breathing patterns and grounding)
- `www/js/focus.js`, `www/js/quests.js`: the focus timer and daily quests (your own flashcards live in `www/js/srs.js`)
- `www/js/avatar.js`: build-your-own character
- `www/js/content/`: GCSE subjects (`gcse.js`, `gcse-more.js`), languages, BSL
- `www/sw.js`: offline cache

## Credits
- Hana and Bit artwork: the character sheet supplied by the app's owner. Make sure you have the rights before publishing the app publicly.
- Chess pieces: "cburnett" set by Colin M.L. Burnett (GPLv2+/BSD/GFDL), via the chessground package.
- [chess.js](https://github.com/jhlywa/chess.js) 1.4.0 (BSD-2-Clause).
- Fonts: Plus Jakarta Sans and DM Mono (SIL Open Font License), bundled for offline use.
