// Hana's personality: who she is, what she remembers about you, and how she reacts.
// Hana is a cheerful inventor who is always mid-way through building something (usually for Bit),
// a little dramatic, very competitive at chess and fiercely on your side. Bit is her small
// triangle robot: deadpan, a bit cheeky, and he loves facts and quizzes.
import { S, save, today, streakAlive } from './store.js';
import { dueCount } from './srs.js';

const pick = (a) => a[Math.floor(Math.random() * a.length)];
const daySeed = () => { let h = 7; for (const ch of today()) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return h; };
const daily = (a, salt = 0) => a[(daySeed() + salt * 7919) % a.length];
const daysBetween = (a, b) => Math.round((new Date(`${b}T12:00`) - new Date(`${a}T12:00`)) / 86400000);

/* ---------- memory ---------- */
export function mem() {
  if (!S.hana || typeof S.hana !== 'object') S.hana = {};
  const h = S.hana;
  h.bond ??= 0; h.calls ??= 0; h.lastSeen ??= null; h.prevSeen ??= null; h.lastTopic ??= null; h.met ??= today(); h.chatDay ??= null; h.chats ??= 0;
  return h;
}
// Call once when the app opens: remembers how long you were away and gives a small friendship boost each new day.
export function checkIn() {
  const h = mem(); const t = today();
  if (h.lastSeen === t) return null;
  h.prevSeen = h.lastSeen; h.lastSeen = t; save();
  return addBond(2);
}
export function awayDays() { const h = mem(); return h.prevSeen && h.lastSeen === today() ? daysBetween(h.prevSeen, today()) : 0; }
export function remember(topic) { if (topic) { mem().lastTopic = topic; save(); } }

/* ---------- friendship ---------- */
export const BOND_LEVELS = [
  { at: 0, name: 'New friends', emoji: '🌱' },
  { at: 25, name: 'Study buddies', emoji: '📚' },
  { at: 80, name: 'Good friends', emoji: '⭐' },
  { at: 180, name: 'Best friends', emoji: '💜' },
  { at: 350, name: 'Lab partners for life', emoji: '🔧' },
];
export function bond() {
  const b = mem().bond; let i = 0;
  while (BOND_LEVELS[i + 1] && b >= BOND_LEVELS[i + 1].at) i++;
  const cur = BOND_LEVELS[i]; const next = BOND_LEVELS[i + 1];
  return { ...cur, level: i + 1, points: b, next, pct: next ? (b - cur.at) / (next.at - cur.at) : 1 };
}
// Returns the new level if this pushed you up one, so the caller can celebrate.
export function addBond(n) {
  const before = bond().level; mem().bond += n; save();
  const after = bond(); return after.level > before ? after : null;
}
// Chatting counts too, a little, up to 10 points a day.
export function chatBond() {
  const h = mem(); const t = today();
  if (h.chatDay !== t) { h.chatDay = t; h.chats = 0; }
  if (h.chats >= 10) return null;
  h.chats++; return addBond(1);
}
export const levelUpLine = (b) => pick([`We're ${b.name} now! ${b.emoji} Bit, mark it in the logbook!`, `Friendship level up! ${b.emoji} ${b.name}. I'm making us matching badges.`]);

/* ---------- time of day ---------- */
export function partOfDay(h = new Date().getHours()) { return h < 5 ? 'late' : h < 12 ? 'morning' : h < 17 ? 'afternoon' : h < 22 ? 'evening' : 'late'; }

/* ---------- things Hana says ---------- */
// What Hana has been up to today (one per day).
const TINKERING = [
  'I tried to give Bit a jetpack this morning. Version seven. Versions one to six are... in the bin.',
  'I built a tiny fan for Bit. He spun in circles for ten minutes and called it a workout.',
  'I spent the morning teaching Bit French. He only says "beep", but with an accent now.',
  'I made a robot that waters your garden. It watered my shoes instead. Progress!',
  'I rewired my desk lamp so it turns on when I say "eureka". I say it a lot.',
  'I was building a homework-sorting machine. It sorted everything into "later". Very relatable.',
  'Bit and I had a chess rematch. He claims he let me win. He did not.',
  'I tried a new snack: strawberry mochi with popping candy. Ten out of ten, would explode again.',
  'I reorganised my toolbox by colour. Then by size. Then back to colour.',
  'I found a screw on the floor and now I don\'t trust anything I built this week.',
  'I invented a pencil that never runs out. It\'s just a very long pencil.',
  'Bit learned to do a backflip today. Well, a sideways wobble. We\'re calling it a backflip.',
];
export const todaysTinker = () => daily(TINKERING, 1);

// A fun fact each day, mostly from GCSE subjects.
export const FACTS = [
  'Octopuses have three hearts and blue blood.',
  'A day on Venus is longer than a year on Venus.',
  'Your body has about 37 trillion cells, and each one is busy right now.',
  'Bananas are slightly radioactive, because they contain potassium-40.',
  'Honey never goes off. Edible honey has been found in ancient Egyptian tombs.',
  'Lightning is about five times hotter than the surface of the Sun.',
  'There are more possible chess games than atoms in the observable universe.',
  'The Eiffel Tower grows by up to 15 centimetres in summer as the metal expands.',
  'Shakespeare invented or first recorded over 1,700 English words, like "bedroom" and "lonely".',
  'Water expands when it freezes, which is why ice floats.',
  'The shortest war in history, between Britain and Zanzibar in 1896, lasted about 38 minutes.',
  'A bolt of lightning carries around a billion joules of energy.',
  'DNA from one of your cells, stretched out, would be about two metres long.',
  'Sound travels about four times faster in water than in air.',
  'In Czech, "strč prst skrz krk" means "stick a finger through your throat" and has no vowels.',
  'Sign languages are full languages with their own grammar, and British and American Sign Language are very different.',
  'Your brain uses about 20 percent of your body\'s energy.',
  'Diamonds and pencil graphite are both made of pure carbon.',
  'The Berlin Wall stood for 28 years, from 1961 to 1989.',
  'Sloths can hold their breath longer than dolphins can.',
  'A teaspoon of a neutron star would weigh about a billion tonnes.',
  'Pi has been calculated to over 100 trillion digits.',
  'Plants make oxygen as a by-product of photosynthesis, and algae make a huge share of the world\'s oxygen.',
  'The word "quiz" may have been invented as a bet. Probably not, but it\'s a great story.',
  'Light from the Sun takes about eight minutes to reach Earth.',
  'Humans share about 60 percent of their DNA with bananas.',
  'The heart of a blue whale is about the size of a small car.',
  'Retrieval practice, testing yourself, beats re-reading notes for remembering things.',
];
export const factOfDay = () => daily(FACTS, 2);

export const STUDY_TIPS = [
  'Test yourself instead of re-reading. Trying to remember is what makes it stick.',
  'Little and often beats one long cram. That\'s why Smart revise brings facts back over days.',
  'Try the focus timer: 25 minutes of study, then a 5 minute break.',
  'Explain a topic out loud, like you\'re teaching me. If you get stuck, that\'s the bit to revise.',
  'Sleep is when your brain saves what you learned. Late-night cramming fights against that.',
  'Mix topics up in one session. It feels harder, but you remember more.',
  'Do past paper questions early. Exam technique is a skill you can practise.',
  'Put your phone in another room while you revise. Except for me, obviously.',
];

// Bit's one-liners when you tap him.
const BIT_LINES = [
  'Beep. I am not short. I am fun-sized.',
  'Boop! Did someone say quiz?',
  'Processing... processing... still processing awesomeness.',
  'Hana built me. I am still waiting for my jetpack.',
  'My circuits love a streak. Please do not break it.',
  'Fact: I have never lost a game of chess. I have also never played one.',
  'Beep boop. That tickles my sensors.',
  'Battery at 100 percent. Motivation at 100 percent. Let us learn.',
  'I would high five you but I have no hands.',
  'Error 404: boredom not found.',
];
export const bitLine = () => pick(BIT_LINES);

// Hana's reaction when you poke her. Poke too much and she gets flustered.
let pokes = 0; let pokeTimer = null;
export function poke() {
  pokes++; clearTimeout(pokeTimer); pokeTimer = setTimeout(() => { pokes = 0; }, 15000);
  if (pokes >= 7) { pokes = 0; return { mood: 'sad', text: pick(['Okay, okay! I\'m awake! Shall we actually learn something?', 'Hey! I\'m not a button! ...Well, technically I am. Still!']) }; }
  if (pokes >= 4) return { mood: 'think', text: pick(['Hehe, that tickles!', 'I\'m here, I\'m here!', 'Are you poking me to avoid revising?', 'Bit, are they poking me again?']) };
  return { mood: 'happy', text: null }; // the caller shows Hana's next thought
}

// One thing Hana might say on the home screen. `n` cycles through different kinds of thought.
export function homeThought(n = 0) {
  const name = S.name ? ` ${S.name}` : '';
  const streak = streakAlive() ? S.streak : 0; const due = dueCount(); const away = awayDays(); const b = bond(); const part = partOfDay(); const h = mem();
  const pool = [];
  if (away >= 2) pool.push(`Welcome back${name}! It's been ${away} days. I kept your garden watered, mostly.`);
  if (due) pool.push(`You've got ${due} fact${due === 1 ? '' : 's'} ready to revise. Five minutes keeps them fresh!`);
  if (streak >= 30) pool.push(`${streak} days in a row! That's not a streak, that's a lifestyle.`);
  else if (streak >= 7) pool.push(`${streak} days in a row! I've put a gold star on my workbench for you.`);
  else if (streak >= 3) pool.push(`${streak} days in a row! Bit is doing his happy wobble.`);
  else if (!streak) pool.push('Shall we start a streak today? One lesson is all it takes.');
  if (part === 'late') pool.push('It\'s really late! Sleep helps your brain save today\'s learning, so don\'t stay up too long.');
  else if (part === 'morning') pool.push(`Morning${name}! Brains are fresh before lunch. Perfect for something tricky.`);
  else if (part === 'evening') pool.push('Evening study session? I\'ll make the hot chocolate. Well, I\'ll imagine it.');
  if (h.lastTopic) pool.push(`Last time we did ${h.lastTopic}. Want to carry on?`);
  const studied = Math.round((S.timeByDay?.[today()] || 0) / 60);
  if (studied >= 25) pool.unshift(`You've studied for ${studied} minutes today! Brains love breaks. Tap 🌿 Breathe for a one-minute reset.`);
  pool.push(`Fun fact: ${factOfDay()}`);
  pool.push(todaysTinker());
  pool.push(`Tip: ${daily(STUDY_TIPS, 3)}`);
  if (b.level >= 4) pool.push('Best friends get to see my secret blueprints. Don\'t tell Bit.');
  else if (b.level >= 2) pool.push(`We're ${b.name.toLowerCase()} now! ${b.emoji}`);
  return pool[n % pool.length];
}

/* ---------- calls ---------- */
// Hana's hello when you call: time of day, how long you've been away, what you did last, what's due.
export function callGreeting() {
  const h = mem(); const name = S.name ? ` ${S.name}` : ''; const part = partOfDay();
  const parts = [];
  parts.push({
    morning: pick([`Morning${name}! I've had my toast and Bit's had his battery.`, `Good morning${name}! You're up early. I like it.`]),
    afternoon: pick([`Hey${name}! Perfect timing, I was just fixing Bit's antenna.`, `Hi${name}! It's Hana. I was hoping you'd call.`]),
    evening: pick([`Evening${name}! Cosy study time.`, `Hey${name}! Good evening! Bit, put the kettle on.`]),
    late: `${name ? `${name.trim()}, it's` : 'It\'s'} really late! Let's keep it short, then sleep. Brains need rest to remember things.`,
  }[part]);
  const away = awayDays();
  if (!h.calls) parts.push('This is our very first call! I\'m so excited.');
  else if (away >= 3) parts.push(`I missed you! It's been ${away} days.`);
  if (h.lastTopic && h.calls) parts.push(`Last time we did ${h.lastTopic}. Want to carry on, or try something new?`);
  const due = dueCount(); if (due) parts.push(`Also, ${due} fact${due === 1 ? ' is' : 's are'} ready to revise.`);
  if (!h.lastTopic || !h.calls) parts.push('I can teach you a topic, quiz you, or we can just chat.');
  return parts.join(' ');
}
// Sometimes Bit butts in after the hello.
const BANTER = [
  [['bit', 'Beep. She practised that greeting three times.'], ['hana', 'Bit! I did not! ...It was twice.']],
  [['bit', 'Boop! I am also here. Hello.'], ['hana', 'Yes Bit, everyone can see you. You\'re glowing.']],
  [['bit', 'Beep. Hana tried to fix my antenna. Now I can hear the radio.'], ['hana', 'It\'s a feature!']],
  [['bit', 'Warning: Hana has been eating mochi all day.'], ['hana', 'Brain food! It counts!']],
  [['bit', 'Beep boop. Today I will win at chess.'], ['hana', 'You don\'t have hands, Bit.']],
];
export const banter = () => (Math.random() < 0.55 ? pick(BANTER) : null);
export const onCallStart = () => { const h = mem(); h.calls++; save(); return addBond(h.calls === 1 ? 5 : 3); };

/* ---------- reactions ---------- */
export const PRAISE = ['Yes!', 'Correct!', 'Spot on!', 'You got it!', 'Brilliant!', 'Eureka! That\'s right!', 'Nailed it!', 'Exactly right!'];
export const COMBO = ['Three in a row! You\'re on fire!', 'Another one! Bit, are you recording this?', 'Unstoppable! I might need to make harder questions.'];
export const COMFORT = ['Not quite.', 'Close, but no.', 'Ooh, not this time.', 'Almost!'];

/* ---------- small talk ---------- */
// Returns lines to say ([[who, text, mood?], ...]) and an optional action, or null if it isn't small talk.
export function smallTalk(t) {
  const b = bond(); const name = S.name || 'friend';
  const R = (lines, action) => ({ lines, action });
  const H = (text, mood = 'happy') => ['hana', text, mood];
  const B = (text) => ['bit', text];
  const has = (re) => re.test(t);

  if (has(/^(hi|hello|hey) bit\b|\bbit say something\b|\btalk bit\b|\bhow are you bit\b/)) return R([B(bitLine())]);
  if (has(/^(hi|hello|hey|hiya|yo|heya|good (morning|afternoon|evening))\b/) && t.split(' ').length <= 4 && !/\b(teach|quiz|learn|test|play|revise|explain|what|how|who|why|tell|help)\b/.test(t)) return R([H(pick(['Hey! Lovely to hear from you.', `Hi ${name}! What shall we learn today?`, 'Hello! Bit says hi too.']))]);
  if (has(/how are you|hows it going|how are things|you ok|how was your day|what have you been up to|what are you doing|what were you doing/)) return R([H(`I'm great! ${todaysTinker()} How about you?`)]);
  if (has(/\b(im|i am) (good|great|fine|ok|okay|alright|happy|excited)\b/)) return R([H('Love that! Shall we put that energy into something? Try "quiz me" or "teach me".', 'cheer')]);
  if (has(/\b(failed|fail|bad (grade|mark|result)|did badly|messed up)\b/)) return R([H('Oh, that stings, I know. But one result doesn\'t decide who you are. Shall we work out what to fix, together?', 'think'), B('Beep. Hana failed her first robot test. Now she has me. Look how that turned out.'), H('...Perfectly, Bit. It turned out perfectly.')]);
  if (has(/\b(exam|exams|mocks?|test tomorrow)\b/) && has(/\b(scared|nervous|stressed|worried|anxious|panic|panicking|scary)\b/)) return R([H('Exams can feel huge. Let\'s shrink them: one topic, ten minutes, then a break. You know more than you think.', 'think'), H('If your head feels busy, say "breathe" and we\'ll do a one-minute breathing reset first. Or say "quiz me on" and a subject.')]);
  if (has(/\b(im|i am|feeling|feel) (tired|sad|stressed|nervous|worried|anxious|down|rubbish|awful|overwhelmed|panicking)\b/)) return R([H('That\'s okay. Thanks for telling me. Want to take a minute to breathe with me? Just say "breathe". Or we can do something small together, or just chat.', 'think')]);
  if (has(/\b(i give up|i cant do (this|it)|im (stupid|dumb|bad at)|i am (stupid|dumb|bad at)|im rubbish at)\b/)) return R([H(`Hey, ${name}, you're not stupid. Getting things wrong is literally how brains learn. Every wrong answer today is a right one tomorrow.`, 'think'), H('Let\'s try one small thing together. Say "quiz me" and I\'ll go easy.', 'happy')]);
  if (has(/\b(motivate me|motivation|inspire me|encourage me)\b/)) return R([H(pick(['Future you is going to be so glad you started today. Let\'s give them something to thank you for!', 'You don\'t have to be great to start, but you have to start to be great. Okay, that one\'s on a poster, but it\'s true!', 'One lesson. That\'s all. I bet you do two.']), 'cheer')]);
  if (has(/\b(im bored|i am bored|boring)\b/)) return R([H('Bored? Let\'s make it a game. Three quick questions, Bit keeps score.', 'cheer'), B('Beep. Scoreboard online.'), H('Say "quiz me" and we\'re on!')]);
  if (has(/\b(good ?night|going to (bed|sleep)|night night|sleep now)\b/)) return R([H('Night night! Sleep is when your brain saves today\'s learning. See you tomorrow!'), B('Beep. Powering down. Zzz.')], 'end');
  if (has(/favou?rite subject/)) return R([H('Physics! Anything where you can build something. Chemistry is a close second. Explosions, safely, of course.')]);
  if (has(/favou?rite (food|snack|thing to eat|drink)/)) return R([H('Strawberry mochi! And bubble tea when I\'ve finished a big build.'), B('My favourite food is electricity. Mains, not batteries.')]);
  if (has(/favou?rite (colou?r)/)) return R([H('Teal, obviously! Look at my hair. Orange is a close second, like my jacket.')]);
  if (has(/favou?rite (opening|chess)/)) return R([H('The King\'s Gambit! Risky, dramatic, and very me. Want to play?')]);
  if (has(/favou?rite (language|word)/)) return R([H('Japanese, because my name\'s Japanese! Hana means flower. And my favourite word is "eureka".')]);
  if (has(/favou?rite (animal|pet)/)) return R([H('Octopuses! Three hearts and they can open jars. Total inventors.')]);
  if (has(/favou?rite/)) return R([H('Ooh, tough one. Anything I can take apart and put back together, probably. What\'s yours?')]);
  if (has(/how old are you|your age/)) return R([H('Old enough to build robots, young enough to still lose my screwdriver every day.')]);
  if (has(/where (do you|are you) (live|from)/)) return R([H('In your phone! It\'s cosy in here. Bit keeps the battery warm.')]);
  if (has(/\b(are you|r u) (real|human|a person|an ai|ai|a robot|a bot)\b|is this a real person/)) return R([H('I\'m a character in this app, so I\'m a computer program, not a real person. But I really do want you to do well, and Bit is definitely a robot.'), B('Beep. Correct.')]);
  if (has(/who (made|created|built|designed) you/)) return R([H('I was made for the Sprout app. I like to think I built myself, but Bit says that\'s not how it works.')]);
  if (has(/what does hana mean|meaning of your name|why are you called hana/)) return R([H('Hana means flower in Japanese! That\'s why my learning garden is full of plants.')]);
  if (has(/\b(do you like me|are we friends|are we best friends)\b/)) return R([H(b.level >= 4 ? `Are you kidding? We're ${b.name.toLowerCase()}! ${b.emoji}` : `Of course! We're ${b.name.toLowerCase()} already, and every lesson we do together makes it stronger.`, 'cheer')]);
  if (has(/\b(i love you|love you|youre (the best|amazing|cute|pretty|great|awesome|cool)|you are (the best|amazing|cute|pretty|great|awesome|cool))\b/)) return R([H('Aww, stop it, you\'ll make Bit jealous! You\'re a pretty great study buddy yourself.', 'cheer'), B('Beep. I am not jealous. My fan is just loud.')]);
  if (has(/\b(nice|love|like|cool) (your )?(hair|jacket|outfit|style)\b/)) return R([H('Thank you! The teal happened after a chemistry experiment went... interestingly. I kept it.', 'cheer')]);
  if (has(/\b(youre|you are) (annoying|boring|stupid|dumb|useless|bad)|\bshut up\b|\bi hate you\b/)) return R([H('Oops, sorry! I\'ll keep it short. Tell me what you\'d like to do and I\'ll help.', 'sad')]);
  if (has(/hobby|hobbies|what do you like doing|what do you do for fun/)) return R([H('Tinkering! I\'m building Bit a jetpack. And chess, I\'m very competitive. Very.')]);
  if (has(/(fun|cool|random) fact|tell me something (interesting|cool|new)|did you know/)) return R([H(`Ooh, here's one: ${pick(FACTS)}`, 'cheer')]);
  if (has(/\b(study|revision|revise|learning) (tip|tips|advice|help)|how (do|should) i (study|revise)|tips? for (studying|revising|exams)/)) return R([H(`Here's a good one: ${pick(STUDY_TIPS)}`)]);
  if (has(/\b(sing|song)\b/)) return R([H('La la laaa, learning is fun, la la la... Bit, help me out!', 'cheer'), B('Beep beep boop. Boop. That was the chorus.')]);
  if (has(/\briddle\b/)) { const [q, a] = pick([['What has keys but can\'t open locks?', 'A piano!'], ['What gets wetter the more it dries?', 'A towel!'], ['What has a neck but no head?', 'A bottle!'], ['The more you take, the more you leave behind. What are they?', 'Footsteps!'], ['What can you catch but not throw?', 'A cold!']]); return R([H(`Okay, riddle time! ${q}`, 'think'), B('Thinking time. Beep. Beep. Beep.'), H(`It's ${a.toLowerCase()}`, 'cheer')]); }
  if (has(/flip a coin|coin flip|heads or tails/)) return R([H(`Flipping... it's ${Math.random() < 0.5 ? 'heads' : 'tails'}!`)]);
  if (has(/roll a (dice|die)/)) return R([H(`Rolling... you got a ${1 + Math.floor(Math.random() * 6)}!`)]);
  if (has(/what time is it|whats the time|what is the time|the time please|tell me the time/)) return R([H(`It's ${new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}.${partOfDay() === 'late' ? ' Which is very late, by the way!' : ''}`)]);
  if (has(/what day is it|whats the date|todays date/)) return R([H(`It's ${new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}.`)]);
  if (has(/\b(friendship|our (level|bond)|friend level)\b/)) return R([H(`We're ${b.name.toLowerCase()} ${b.emoji}, level ${b.level}.${b.next ? ' Do lessons and call me to level up!' : ' That\'s the top level. We\'re officially lab partners!'}`)]);
  return null;
}
