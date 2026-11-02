# 🌱 Sprout

A calm, pastel learning app for GCSEs, languages and chess. Your guide is **Hana** (teal braided hair, orange jacket) and her floating triangle robot **Bit**. Both talk, and you can **call Hana** for a voice conversation where she chats, answers questions and teaches you. Everything works **offline**.

## What's inside

| Area | What it does |
| --- | --- |
| **Home** | Greeting, weekly streak, a 📞 **Call Hana** button, quick actions, **Smart revise**, "Continue learning", topic ideas and daily habits. |
| **Call Hana** | A voice call: Hana listens (speech recognition), talks back (text-to-speech) and shows live captions. She can teach any lesson in the app step by step and quiz you out loud, translate words ("how do you say cat in French"), explain key terms, tell you your stats, or just chat. Hands-free mode listens again automatically after she speaks; you can also type. Works offline using the app's own lessons. Optional **Hana AI**: add your own Anthropic API key in Profile and free conversation uses Claude (Claude Opus 5.5, quick replies, with Anthropic's refusal fallback turned on) when you're online. |
| **Explore** | 66 courses with search. School subjects can be filtered by exam board: **AQA, Edexcel or Eduqas**. |
| **School (GCSE)** | Every GCSE subject across AQA, Edexcel and Eduqas: Maths, Statistics, English Language, English Literature, Biology, Chemistry, Physics, Combined Science, Geography, History (Cold War, from your notes), Religious Studies, Computer Science, Business, Economics, Citizenship, Psychology, Sociology, Astronomy, Latin, Film Studies, Media Studies, Art and Design, Design and Technology, Electronics, Engineering, Food Preparation and Nutrition, Drama, Dance, Music and PE. Each subject is tagged with the boards that offer it. GCSE languages link to the matching language course. Content is starter level: check it against your specification. |
| **Languages** | 34 languages, including Czech (now with sentence building) and Urdu, plus **British Sign Language** (fingerspelling vowels, numbers 1–5 and everyday signs, with hand diagrams). |
| **Hana's personality** | Hana is a cheerful, slightly dramatic inventor who is always building something for Bit; Bit is deadpan and cheeky. She greets you for the time of day, remembers what you last studied and how long you've been away, and tells you a fun fact, a study tip or what she's been tinkering with (tap her on Home, or press "What else?"; poke her too often and she gets flustered). On calls she banters with Bit, tells riddles and jokes, encourages you when you're stressed or stuck, answers questions about herself (and is honest that she's an app character), and cheers combos in quizzes. Your **friendship level** with her (New friends → Study buddies → Good friends → Best friends → Lab partners for life) grows each day you visit and with lessons, calls, chess and chatting. |
| **Chess** | Chess.com-style play against Hana: drag or tap to move, a green board with classic pieces, wooden move and capture sounds, check, castle and promotion sounds, an eval bar, captured pieces, and every move rated live (Best, Excellent, Good, Inaccuracy, Mistake, Blunder). Then a full **Game review**: accuracy for both players, an evaluation graph, move-by-move stepping with the best move drawn as a green arrow, and a summary table. 43 gambit lessons plus free play. |
| **Progress** | Learning time by week, month or all time, lessons completed, mastered topics, your garden and chess game history. |
| **Profile** | **Build your own character** (skin, hair style and colour, eyes, smile, outfit, extras, background), badges, bookshelf and settings: exam board, sound, **Hana's voice** (automatic picks the most Kimberly-like US female voice on your phone, or choose any installed voice, with Soft, Bright or Sweet pitch and a preview), hands-free calls, Hana AI key, and offline status. |

### How lessons work (inspired by Seneca)
Seneca keeps sessions short: a few concept cards, then lots of varied questions, with an algorithm deciding what to repeat and when. Sprout does the same:
1. **Key idea**: read the key terms, words, signs or events first.
2. **Check your understanding**: multiple choice, picture cards, **toggles** (pick the right word in each line), **wordfill** (type the missing word, with allowance for a missing accent or one typo), tile building, matching and **flashcards**. The same fact comes back in different formats.
3. **Smart revise**: every fact you learn goes into spaced repetition (boxes 1–6, reviewed after 1, 2, 4, 7, 14 and 30 days). Each course shows a **memory** score.

### Voices on Android
Android's in-app browser has no built-in speech, so the APK uses native plugins: [`@capacitor-community/text-to-speech`](https://github.com/capacitor-community/text-to-speech) for Hana, Bit and lesson audio, and [`@capacitor-community/speech-recognition`](https://github.com/capacitor-community/speech-recognition) for talking to Hana (the app asks for microphone permission the first time). For the best voice, install a good English (US) voice in Android **Settings → Text-to-speech** (for example Google's "English (United States)" voices), then pick it under Profile → Hana's voice. Speech recognition works offline if you've downloaded the offline English speech pack on your phone.

## Get it on your phone

### Option 1: installable web app (iPhone and Android)
1. One-time setup on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Every push deploys to `https://md505d1-art.github.io/New-App.py/`
3. Open it on your phone. iPhone (Safari): Share → **Add to Home Screen**. Android (Chrome): ⋮ → **Install app**.

After the first visit everything is cached, including lessons, chess, fonts and images, so it works with no internet.

### Option 2: Android APK
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
- `www/js/call.js`, `www/js/tutor.js`, `www/js/hana-ai.js`: the call screen, Hana's offline tutor brain, and the optional Claude connection
- `www/js/persona.js`: Hana's personality, memory, friendship level and small talk
- `www/js/avatar.js`: build-your-own character
- `www/js/content/`: GCSE subjects (`gcse.js`, `gcse-more.js`), languages, BSL
- `www/sw.js`: offline cache

## Credits
- Hana and Bit artwork: the character sheet supplied by the app's owner. Make sure you have the rights before publishing the app publicly.
- Chess pieces: "cburnett" set by Colin M.L. Burnett (GPLv2+/BSD/GFDL), via the chessground package.
- [chess.js](https://github.com/jhlywa/chess.js) 1.4.0 (BSD-2-Clause).
- [Anthropic TypeScript SDK](https://github.com/anthropics/anthropic-sdk-typescript) (MIT), bundled in `www/vendor/anthropic-sdk.js` and only loaded when Hana AI is switched on.
- Fonts: Plus Jakarta Sans and DM Mono (SIL Open Font License), bundled for offline use.
