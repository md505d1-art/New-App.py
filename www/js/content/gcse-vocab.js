// GCSE vocabulary themes for the most-taken GCSE languages (French, Spanish, German).
// Added after the beginner units. Each `w` string has 80 entries in GCSE_WORDS order; nouns without articles,
// like the beginner list. Phrases are [English, translation] pairs: two per unit (one per lesson).

export const GCSE_WORDS = [
  ['school', '🏫'], ['teacher', '🧑‍🏫'], ['homework', '📝'], ['exam', '📄'], ['book', '📖'], ['pen', '🖊️'], ['maths', '➗'], ['break time', '🔔'],
  ['football', '⚽'], ['music', '🎵'], ['film', '🎬'], ['to read', '📚'], ['to swim', '🏊'], ['video games', '🎮'], ['cinema', '🍿'], ['weekend', '🛋️'],
  ['town', '🏙️'], ['shop', '🛍️'], ['station', '🚉'], ['park', '🌳'], ['beach', '🏖️'], ['hospital', '🏥'], ['restaurant', '🍽️'], ['library', '🏛️'],
  ['holidays', '🏝️'], ['plane', '✈️'], ['train', '🚆'], ['car', '🚗'], ['hotel', '🏨'], ['sea', '🌊'], ['mountain', '⛰️'], ['ticket', '🎫'],
  ['sun', '☀️'], ['rain', '🌧️'], ['snow', '❄️'], ['wind', '💨'], ['winter', '⛄'], ['spring', '🌷'], ['autumn', '🍂'], ['heat', '🥵'],
  ['house', '🏠'], ['bedroom', '🛏️'], ['kitchen', '🍳'], ['garden', '🌻'], ['breakfast', '🥐'], ['shower', '🚿'], ['to sleep', '😴'], ['to wake up', '⏰'],
  ['Monday', '1️⃣'], ['Tuesday', '2️⃣'], ['Wednesday', '3️⃣'], ['Thursday', '4️⃣'], ['Friday', '5️⃣'], ['Saturday', '6️⃣'], ['Sunday', '7️⃣'], ['today', '📅'],
  ['T-shirt', '👕'], ['trousers', '👖'], ['dress', '👗'], ['shoes', '👟'], ['hat', '🎩'], ['money', '💶'], ['expensive', '💰'], ['cheap', '🏷️'],
  ['job', '💼'], ['doctor', '🩺'], ['engineer', '👷'], ['nurse', '🧑‍⚕️'], ['shop assistant', '🧾'], ['university', '🎓'], ['future', '🔮'], ['to work', '🏢'],
  ['environment', '🌍'], ['pollution', '🏭'], ['recycling', '♻️'], ['phone', '📱'], ['computer', '💻'], ['internet', '🌐'], ['energy', '⚡'], ['to protect', '🛡️'],
];

export const GCSE_VOCAB_UNITS = [
  { title: 'GCSE: School', desc: 'Lessons, teachers and homework', color: 'blue', from: 0 },
  { title: 'GCSE: Free time', desc: 'Sport, music and films', color: 'green', from: 8 },
  { title: 'GCSE: Town', desc: 'Places around town', color: 'purple', from: 16 },
  { title: 'GCSE: Holidays', desc: 'Travel and places to stay', color: 'yellow', from: 24 },
  { title: 'GCSE: Weather', desc: 'Weather and seasons', color: 'blue', from: 32 },
  { title: 'GCSE: Home and routine', desc: 'Rooms and daily routine', color: 'red', from: 40 },
  { title: 'GCSE: Days', desc: 'Days of the week', color: 'green', from: 48 },
  { title: 'GCSE: Clothes and shopping', desc: 'What you wear and what it costs', color: 'purple', from: 56 },
  { title: 'GCSE: Jobs and the future', desc: 'Careers and plans', color: 'yellow', from: 64 },
  { title: 'GCSE: Environment and technology', desc: 'The planet and your phone', color: 'red', from: 72 },
];

export const GCSE_VOCAB = {
  fr: {
    w: "école|professeur|devoirs|examen|livre|stylo|maths|récréation|foot|musique|film|lire|nager|jeux vidéo|cinéma|week-end|ville|magasin|gare|parc|plage|hôpital|restaurant|bibliothèque|vacances|avion|train|voiture|hôtel|mer|montagne|billet|soleil|pluie|neige|vent|hiver|printemps|automne|chaleur|maison|chambre|cuisine|jardin|petit-déjeuner|douche|dormir|se réveiller|lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche|aujourd'hui|tee-shirt|pantalon|robe|chaussures|chapeau|argent|cher|pas cher|travail|médecin|ingénieur|infirmier|vendeur|université|avenir|travailler|environnement|pollution|recyclage|portable|ordinateur|internet|énergie|protéger",
    phrases: [
      [["I have a lot of homework", "j'ai beaucoup de devoirs"], ['my teacher is nice', 'mon professeur est sympa']],
      [['I like playing football', "j'aime jouer au foot"], ['I go to the cinema', 'je vais au cinéma']],
      [['there is a park', 'il y a un parc'], ['the beach is beautiful', 'la plage est belle']],
      [['I went to the beach', 'je suis allé à la plage'], ['I took the train', "j'ai pris le train"]],
      [['the weather is nice', 'il fait beau'], ['it rains a lot', 'il pleut beaucoup']],
      [['I wake up at seven o\'clock', 'je me réveille à sept heures'], ['I live in a house', "j'habite dans une maison"]],
      [['today is Monday', "aujourd'hui c'est lundi"], ['on Saturdays I play football', 'le samedi je joue au foot']],
      [['the shoes are expensive', 'les chaussures sont chères'], ['I am wearing a T-shirt', 'je porte un tee-shirt']],
      [['I want to be a doctor', 'je veux être médecin'], ['I would like to go to university', "je voudrais aller à l'université"]],
      [['we must recycle', 'il faut recycler'], ['I use my phone every day', "j'utilise mon portable tous les jours"]],
    ],
  },
  es: {
    w: 'escuela|profesor|deberes|examen|libro|bolígrafo|matemáticas|recreo|fútbol|música|película|leer|nadar|videojuegos|cine|fin de semana|ciudad|tienda|estación|parque|playa|hospital|restaurante|biblioteca|vacaciones|avión|tren|coche|hotel|mar|montaña|billete|sol|lluvia|nieve|viento|invierno|primavera|otoño|calor|casa|dormitorio|cocina|jardín|desayuno|ducha|dormir|despertarse|lunes|martes|miércoles|jueves|viernes|sábado|domingo|hoy|camiseta|pantalones|vestido|zapatos|sombrero|dinero|caro|barato|trabajo|médico|ingeniero|enfermero|dependiente|universidad|futuro|trabajar|medio ambiente|contaminación|reciclaje|móvil|ordenador|internet|energía|proteger',
    phrases: [
      [['I have a lot of homework', 'tengo muchos deberes'], ['my teacher is nice', 'mi profesor es simpático']],
      [['I like playing football', 'me gusta jugar al fútbol'], ['I go to the cinema', 'voy al cine']],
      [['there is a park', 'hay un parque'], ['the beach is beautiful', 'la playa es bonita']],
      [['I went to the beach', 'fui a la playa'], ['I stayed in a hotel', 'me alojé en un hotel']],
      [['it is sunny', 'hace sol'], ['it rains a lot', 'llueve mucho']],
      [['I wake up at seven o\'clock', 'me despierto a las siete'], ['I live in a house', 'vivo en una casa']],
      [['today is Monday', 'hoy es lunes'], ['on Saturdays I play football', 'los sábados juego al fútbol']],
      [['the shoes are expensive', 'los zapatos son caros'], ['I am wearing a T-shirt', 'llevo una camiseta']],
      [['I want to be a doctor', 'quiero ser médico'], ['I would like to go to university', 'me gustaría ir a la universidad']],
      [['we must recycle', 'hay que reciclar'], ['I use my phone every day', 'uso mi móvil cada día']],
    ],
  },
  de: {
    w: 'Schule|Lehrer|Hausaufgaben|Prüfung|Buch|Kuli|Mathe|Pause|Fußball|Musik|Film|lesen|schwimmen|Videospiele|Kino|Wochenende|Stadt|Geschäft|Bahnhof|Park|Strand|Krankenhaus|Restaurant|Bibliothek|Ferien|Flugzeug|Zug|Auto|Hotel|Meer|Berg|Fahrkarte|Sonne|Regen|Schnee|Wind|Winter|Frühling|Herbst|Hitze|Haus|Schlafzimmer|Küche|Garten|Frühstück|Dusche|schlafen|aufwachen|Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag|heute|T-Shirt|Hose|Kleid|Schuhe|Hut|Geld|teuer|billig|Arbeit|Arzt|Ingenieur|Krankenpfleger|Verkäufer|Universität|Zukunft|arbeiten|Umwelt|Verschmutzung|Recycling|Handy|Computer|Internet|Energie|schützen',
    phrases: [
      [['I have a lot of homework', 'ich habe viele Hausaufgaben'], ['my teacher is nice', 'mein Lehrer ist nett']],
      [['I like playing football', 'ich spiele gern Fußball'], ['I go to the cinema', 'ich gehe ins Kino']],
      [['there is a park', 'es gibt einen Park'], ['the beach is beautiful', 'der Strand ist schön']],
      [['I went to the beach', 'ich bin an den Strand gegangen'], ['I took the train', 'ich habe den Zug genommen']],
      [['the sun is shining', 'die Sonne scheint'], ['it rains a lot', 'es regnet viel']],
      [['I wake up at seven o\'clock', 'ich wache um sieben Uhr auf'], ['I live in a house', 'ich wohne in einem Haus']],
      [['today is Monday', 'heute ist Montag'], ['on Saturday I play football', 'am Samstag spiele ich Fußball']],
      [['the shoes are expensive', 'die Schuhe sind teuer'], ['I am wearing a T-shirt', 'ich trage ein T-Shirt']],
      [['I want to be a doctor', 'ich will Arzt werden'], ['I would like to go to university', 'ich möchte an die Universität gehen']],
      [['we must recycle', 'man muss recyceln'], ['I use my phone every day', 'ich benutze mein Handy jeden Tag']],
    ],
  },
};

export function gcseWordsOf(code) {
  const v = GCSE_VOCAB[code]; if (!v) return [];
  const parts = v.w.split('|');
  if (parts.length !== GCSE_WORDS.length) throw new Error(`${code}: expected ${GCSE_WORDS.length} GCSE words, got ${parts.length}`);
  return parts.map((t, i) => ({ en: GCSE_WORDS[i][0], emoji: GCSE_WORDS[i][1], t, rom: '' }));
}
