// The rest of the GCSE catalogue across AQA, Edexcel (Pearson) and Eduqas. Starter content: two lessons per subject.
// Question format: [question, correct answer, [wrong answers], optional explanation].
const A = 'AQA', E = 'Edexcel', Q = 'Eduqas';

export const SUBJECTS_MORE = [
  { id: 'combined-science', name: 'Combined Science', glyph: '🔬', color: 'green', boards: [A, E, Q], sub: 'Trilogy, Synergy, Double Award', units: [
    { title: 'Science essentials', desc: 'Skills and big ideas across all three sciences', lessons: [
      { title: 'Working scientifically', qs: [
        ['Which variable do you change in an experiment?', 'independent variable', ['dependent variable', 'control variable', 'random variable']],
        ['A result that doesn\'t fit the pattern is called…', 'an anomaly', ['a control', 'a hypothesis', 'a mean']],
        ['Getting similar results when you repeat an experiment shows it is…', 'repeatable', ['valid', 'accurate', 'biased']],
        ['What is the SI unit of mass?', 'kilogram', ['gram', 'newton', 'litre']],
        ['A prediction you can test is a…', 'hypothesis', ['theory', 'conclusion', 'variable']],
      ], terms: [['Dependent variable', 'What you measure'], ['Control variable', 'Kept the same for a fair test'], ['Accuracy', 'How close to the true value'], ['Precision', 'How close repeat readings are']] },
      { title: 'Big ideas', qs: [
        ['Which gas do plants take in for photosynthesis?', 'carbon dioxide', ['oxygen', 'nitrogen', 'hydrogen']],
        ['What is the chemical symbol for sodium?', 'Na', ['So', 'S', 'Sd']],
        ['Which particle has no charge?', 'neutron', ['proton', 'electron', 'ion']],
        ['Energy cannot be created or destroyed, only…', 'transferred or stored', ['used up', 'destroyed by friction', 'turned into mass']],
        ['In an animal cell, most DNA is found in the…', 'nucleus', ['cell membrane', 'cytoplasm', 'ribosomes']],
      ], terms: [['Element', 'Only one type of atom'], ['Organ', 'Tissues working together'], ['Wave', 'Transfers energy, not matter'], ['Catalyst', 'Speeds up a reaction, not used up']] },
    ] },
  ] },
  { id: 'statistics', name: 'Statistics', glyph: '📊', color: 'blue', boards: [E], units: [
    { title: 'Data and averages', desc: 'Collecting, summarising and comparing data', lessons: [
      { title: 'Collecting data', qs: [
        ['Data that can only take certain values, like shoe size, is…', 'discrete', ['continuous', 'qualitative', 'biased']],
        ['Which sample gives every member an equal chance of being picked?', 'a random sample', ['a convenience sample', 'a quota sample', 'a biased sample']],
        ['"Don\'t you agree that school is too long?" is a…', 'leading question', ['open question', 'closed question', 'pilot survey']],
        ['Data you collect yourself is…', 'primary data', ['secondary data', 'grouped data', 'raw bias']],
        ['A small trial run of a survey is a…', 'pilot study', ['census', 'sampling frame', 'control group']],
      ], terms: [['Population', 'The whole group being studied'], ['Census', 'Data from every member of a population'], ['Sample', 'A smaller group from the population'], ['Qualitative data', 'Described in words, not numbers']] },
      { title: 'Averages and spread', qs: [
        ['Which average is affected most by extreme values?', 'mean', ['median', 'mode', 'interquartile range']],
        ['Interquartile range = …', 'upper quartile − lower quartile', ['maximum − minimum', 'mean − median', 'median − lower quartile']],
        ['On a scatter graph, y rising as x rises shows…', 'positive correlation', ['negative correlation', 'no correlation', 'causation']],
        ['Correlation on its own proves…', 'nothing about cause', ['that one causes the other', 'that the data is biased', 'that the sample is random']],
        ['The median of 2, 4, 7, 9 is…', '5.5', ['4', '7', '5.25'], 'Halfway between the middle two values, 4 and 7.'],
      ], terms: [['Outlier', 'A value far from the rest'], ['Range', 'Largest minus smallest'], ['Mode', 'Most frequent value'], ['Line of best fit', 'A line showing the trend']] },
    ] },
  ] },
  { id: 'rs', name: 'Religious Studies', glyph: '🕊️', color: 'purple', boards: [A, E, Q], units: [
    { title: 'Beliefs and practices', desc: 'Christianity and Islam', lessons: [
      { title: 'Christianity', qs: [
        ['The belief that God is three persons in one is…', 'the Trinity', ['the Incarnation', 'the Atonement', 'the Resurrection']],
        ['The belief that God became human in Jesus is…', 'the Incarnation', ['the Trinity', 'the Eucharist', 'salvation']],
        ['Which sacrament remembers the Last Supper?', 'the Eucharist (Holy Communion)', ['baptism', 'confirmation', 'marriage']],
        ['Christians celebrate Jesus rising from the dead at…', 'Easter', ['Christmas', 'Pentecost', 'Advent']],
        ['Agape means…', 'selfless, unconditional love', ['forgiveness', 'prayer', 'sin']],
      ], terms: [['Omnipotent', 'All-powerful'], ['Omniscient', 'All-knowing'], ['Salvation', 'Being saved from sin'], ['Atonement', 'Restoring the relationship with God']] },
      { title: 'Islam', qs: [
        ['How many Pillars of Islam are there?', 'Five', ['Three', 'Six', 'Ten']],
        ['The Muslim declaration of faith is the…', 'Shahadah', ['Hajj', 'Zakah', 'Sawm']],
        ['Fasting during Ramadan is called…', 'Sawm', ['Salah', 'Zakah', 'Hajj']],
        ['The pilgrimage to Makkah is…', 'Hajj', ['Shahadah', 'Salah', 'Sawm']],
        ['Tawhid is the belief in…', 'the oneness of God', ['angels', 'life after death', 'prophethood']],
      ], terms: [['Salah', 'Prayer five times a day'], ['Zakah', 'Giving 2.5% of savings to those in need'], ['Qur\'an', 'The holy book of Islam'], ['Akhirah', 'Life after death']] },
    ] },
  ] },
  { id: 'business', name: 'Business', glyph: '💼', color: 'yellow', boards: [A, E], units: [
    { title: 'Business essentials', desc: 'Money, ownership and marketing', lessons: [
      { title: 'Costs and profit', qs: [
        ['Revenue = price × …', 'quantity sold', ['costs', 'profit', 'fixed costs']],
        ['Profit = revenue − …', 'total costs', ['variable costs only', 'tax', 'price']],
        ['Rent that stays the same however much you make is a…', 'fixed cost', ['variable cost', 'revenue', 'profit']],
        ['A business owner with unlimited liability is a…', 'sole trader', ['private limited company', 'public limited company', 'shareholder']],
        ['The point where revenue equals total costs is the…', 'break-even point', ['margin of safety', 'profit target', 'cash flow']],
      ], terms: [['Entrepreneur', 'Starts a business and takes risks'], ['Stakeholder', 'Anyone affected by a business'], ['Limited liability', 'Owners only lose what they invested'], ['Cash flow', 'Money moving in and out']] },
      { title: 'Marketing', qs: [
        ['The 4 Ps are product, price, place and…', 'promotion', ['profit', 'people', 'planning']],
        ['Running your own questionnaire is…', 'primary research', ['secondary research', 'desk research', 'market share']],
        ['Splitting a market into groups of similar customers is…', 'market segmentation', ['market mapping', 'price skimming', 'branding']],
        ['Setting a high price when a new product launches is…', 'price skimming', ['penetration pricing', 'competitive pricing', 'cost-plus pricing']],
        ['A diagram comparing products on two features is a…', 'market map', ['break-even chart', 'organisation chart', 'cash-flow forecast']],
      ], terms: [['Brand', 'A name or design customers recognise'], ['Market share', 'A firm\'s share of total sales'], ['Penetration pricing', 'A low price to win customers'], ['USP', 'What makes a product different']] },
    ] },
  ] },
  { id: 'economics', name: 'Economics', glyph: '📈', color: 'green', boards: [A], units: [
    { title: 'Markets and the economy', desc: 'Supply, demand and the national economy', lessons: [
      { title: 'How markets work', qs: [
        ['When the price of a good rises, quantity demanded usually…', 'falls', ['rises', 'stays the same', 'doubles']],
        ['The price where supply equals demand is the…', 'equilibrium price', ['maximum price', 'cost price', 'subsidy']],
        ['Goods used together, like printers and ink, are…', 'complements', ['substitutes', 'inferior goods', 'public goods']],
        ['The next best alternative given up is the…', 'opportunity cost', ['fixed cost', 'marginal cost', 'sunk cost']],
        ['A tax on a product usually shifts supply to the…', 'left', ['right', 'top', 'it has no effect']],
      ], terms: [['Scarcity', 'Limited resources, unlimited wants'], ['Demand', 'What consumers are willing and able to buy'], ['Supply', 'What producers are willing and able to sell'], ['Market', 'Where buyers and sellers meet']] },
      { title: 'The national economy', qs: [
        ['A general rise in prices over time is…', 'inflation', ['deflation', 'recession', 'unemployment']],
        ['GDP measures…', 'the value of goods and services a country produces', ['government debt', 'the price of exports', 'the number of jobs']],
        ['Who sets the Bank Rate in the UK?', 'the Bank of England', ['Parliament', 'high street banks', 'the Treasury alone']],
        ['Two quarters in a row of falling GDP is a…', 'recession', ['boom', 'recovery', 'surplus']],
        ['Government spending and tax decisions are…', 'fiscal policy', ['monetary policy', 'supply-side policy', 'trade policy']],
      ], terms: [['Unemployment', 'Wanting a job but not having one'], ['Interest rate', 'The cost of borrowing'], ['Exports', 'Goods and services sold abroad'], ['Monetary policy', 'Using interest rates to manage the economy']] },
    ] },
  ] },
  { id: 'citizenship', name: 'Citizenship Studies', glyph: '🏛️', color: 'blue', boards: [A, E], units: [
    { title: 'Democracy, rights and the law', desc: 'How the UK is governed', lessons: [
      { title: 'Democracy in the UK', qs: [
        ['How often must a UK general election be held?', 'at least every five years', ['every year', 'every ten years', 'every two years']],
        ['The voting system for UK general elections is…', 'first past the post', ['proportional representation', 'alternative vote', 'single transferable vote']],
        ['The upper chamber of Parliament is the…', 'House of Lords', ['House of Commons', 'Cabinet', 'Supreme Court']],
        ['The head of the UK government is the…', 'Prime Minister', ['monarch', 'Speaker', 'Lord Chancellor']],
        ['A proposed law going through Parliament is a…', 'bill', ['act', 'statute', 'motion']],
      ], terms: [['Democracy', 'People choose their government'], ['Constituency', 'An area represented by one MP'], ['Rule of law', 'Everyone must obey the law'], ['Devolution', 'Powers passed to Scotland, Wales and NI']] },
      { title: 'Rights and the law', qs: [
        ['The age of criminal responsibility in England and Wales is…', '10', ['12', '16', '18']],
        ['Which court hears the most serious criminal cases?', 'Crown Court', ['Magistrates\' Court', 'County Court', 'Youth Court']],
        ['The Human Rights Act 1998 brought which rights into UK law?', 'the European Convention on Human Rights', ['the US Bill of Rights', 'Magna Carta', 'the Geneva Conventions']],
        ['In a Crown Court trial, the verdict is given by…', 'a jury', ['the judge alone', 'the police', 'the victim']],
        ['A pressure group aims to…', 'influence decisions on an issue', ['win general elections', 'run local councils', 'make laws directly']],
      ], terms: [['Civil law', 'Disputes between people or organisations'], ['Criminal law', 'Offences against society'], ['Rights', 'What everyone is entitled to'], ['Responsibilities', 'Duties we owe to others']] },
    ] },
  ] },
  { id: 'psychology', name: 'Psychology', glyph: '🧠', color: 'red', boards: [A, E], units: [
    { title: 'Memory and social influence', desc: 'How we remember and why we conform', lessons: [
      { title: 'Memory', qs: [
        ['The multi-store model of memory was proposed by…', 'Atkinson and Shiffrin', ['Milgram', 'Bandura', 'Freud']],
        ['Short-term memory holds about…', '7 ± 2 items', ['1 item', '100 items', 'unlimited items']],
        ['New learning disrupting older memories is…', 'retroactive interference', ['proactive interference', 'the primacy effect', 'displacement']],
        ['Remembering the first items in a list best is the…', 'primacy effect', ['recency effect', 'reconstruction', 'chunking']],
        ['Bartlett\'s War of the Ghosts study suggests memory is…', 'reconstructive', ['perfect', 'stored only as images', 'unlimited']],
      ], terms: [['Encoding', 'Changing information so it can be stored'], ['Storage', 'Holding information in memory'], ['Retrieval', 'Getting information back out'], ['Episodic memory', 'Memories of personal events']] },
      { title: 'Social influence', qs: [
        ['Milgram\'s study investigated…', 'obedience to authority', ['conformity to a group', 'memory', 'language']],
        ['Asch\'s line study investigated…', 'conformity', ['obedience', 'colour perception', 'attachment']],
        ['The bystander effect means people are less likely to help when…', 'others are present', ['they are alone', 'they are trained', 'they know the victim']],
        ['In Milgram\'s study, about how many went to 450 volts?', 'about 65%', ['about 10%', '100%', 'none']],
        ['Changing your behaviour to fit in with a group is…', 'conformity', ['obedience', 'prejudice', 'deindividuation']],
      ], terms: [['Obedience', 'Following orders from authority'], ['Deindividuation', 'Losing your identity in a crowd'], ['Prejudice', 'Judging without evidence'], ['Agentic state', 'Acting on behalf of an authority figure']] },
    ] },
  ] },
  { id: 'sociology', name: 'Sociology', glyph: '👥', color: 'purple', boards: [A, Q], units: [
    { title: 'Families and research', desc: 'How society shapes us, and how we study it', lessons: [
      { title: 'Families', qs: [
        ['Two parents and their children is a…', 'nuclear family', ['extended family', 'reconstituted family', 'lone-parent family']],
        ['A family formed when parents with children re-partner is…', 'reconstituted (blended)', ['nuclear', 'extended', 'beanpole']],
        ['Learning the norms and values of society is…', 'socialisation', ['stratification', 'globalisation', 'deviance']],
        ['Which perspective sees the family as meeting society\'s needs?', 'functionalism', ['Marxism', 'feminism', 'interactionism']],
        ['Feminists argue the traditional family often…', 'disadvantages women', ['benefits everyone equally', 'has disappeared', 'only exists in the UK']],
      ], terms: [['Norms', 'Unwritten rules of behaviour'], ['Values', 'Beliefs about what is important'], ['Primary socialisation', 'Learning in the family'], ['Secondary socialisation', 'Learning from school, peers and media']] },
      { title: 'Research methods', qs: [
        ['Data in numbers is…', 'quantitative', ['qualitative', 'secondary', 'biased']],
        ['Studying the same group over a long time is a…', 'longitudinal study', ['pilot study', 'case study', 'snapshot study']],
        ['Joining a group to study it from the inside is…', 'participant observation', ['a questionnaire', 'a structured interview', 'official statistics']],
        ['Research is reliable if…', 'it can be repeated with the same results', ['it is true to life', 'the sample is large', 'it uses interviews']],
        ['Getting permission from participants is…', 'informed consent', ['confidentiality', 'validity', 'debriefing']],
      ], terms: [['Validity', 'A true picture of what is studied'], ['Representative', 'Reflects the wider population'], ['Ethics', 'Moral rules for research'], ['Sample', 'The people chosen to study']] },
    ] },
  ] },
  { id: 'astronomy', name: 'Astronomy', glyph: '🔭', color: 'blue', boards: [E], units: [
    { title: 'Sky and space', desc: 'From the Moon to distant galaxies', lessons: [
      { title: 'Earth, Moon and Sun', qs: [
        ['How long does the Moon take to orbit the Earth?', 'about a month', ['one day', 'one year', 'one week']],
        ['Seasons happen because…', 'Earth\'s axis is tilted', ['Earth is closer to the Sun in summer', 'the Sun gets hotter', 'the Moon blocks sunlight']],
        ['A solar eclipse happens when…', 'the Moon passes between the Sun and Earth', ['Earth passes between the Sun and Moon', 'the Sun goes behind Earth', 'clouds cover the Sun']],
        ['The Sun is a…', 'star', ['planet', 'galaxy', 'nebula']],
        ['Which planet is the largest?', 'Jupiter', ['Saturn', 'Earth', 'Neptune']],
      ], terms: [['Orbit', 'The path of one body around another'], ['Lunar phase', 'How much of the lit Moon we see'], ['Axis', 'The line Earth spins around'], ['Light year', 'The distance light travels in a year']] },
      { title: 'Stars and the universe', qs: [
        ['Our galaxy is called…', 'the Milky Way', ['Andromeda', 'the Solar System', 'Orion']],
        ['Stars form from clouds of gas and dust called…', 'nebulae', ['black holes', 'comets', 'asteroids']],
        ['Red-shift of distant galaxies is evidence for…', 'an expanding universe', ['a shrinking universe', 'the Sun orbiting Earth', 'black holes']],
        ['A very massive star ends its life in a…', 'supernova', ['quiet fade', 'planet', 'comet']],
        ['The nearest star to Earth is…', 'the Sun', ['Proxima Centauri', 'Sirius', 'Polaris']],
      ], terms: [['Galaxy', 'A huge group of stars'], ['Supernova', 'An exploding star'], ['Black hole', 'Gravity so strong light can\'t escape'], ['Exoplanet', 'A planet orbiting another star']] },
    ] },
  ] },
  { id: 'latin', name: 'Latin', glyph: '🏺', color: 'red', boards: [Q], units: [
    { title: 'Language and Roman life', desc: 'Core vocabulary and the Roman world', lessons: [
      { title: 'Latin basics', qs: [
        ['What does "amo" mean?', 'I love', ['I walk', 'I see', 'I have']],
        ['What does "puella" mean?', 'girl', ['boy', 'road', 'sailor']],
        ['What does "servus" mean?', 'slave', ['master', 'soldier', 'friend']],
        ['In a Latin sentence the verb usually comes…', 'at the end', ['first', 'second', 'straight after the subject']],
        ['What does "et" mean?', 'and', ['but', 'or', 'in']],
      ], terms: [['Nominative', 'The case for the subject'], ['Accusative', 'The case for the object'], ['Ablative', 'Often means by, with or from'], ['Verb', 'An action word']] },
      { title: 'Roman life', qs: [
        ['The Roman god of war was…', 'Mars', ['Jupiter', 'Neptune', 'Mercury']],
        ['Romans watched gladiators in the…', 'amphitheatre', ['forum', 'basilica', 'villa']],
        ['The Roman marketplace and centre of public life was the…', 'forum', ['atrium', 'baths', 'circus']],
        ['What does "dominus" mean?', 'master', ['slave', 'house', 'gift']],
        ['What does "via" mean?', 'road', ['life', 'wine', 'city']],
      ], terms: [['Atrium', 'The main hall of a Roman house'], ['Senator', 'Member of Rome\'s governing council'], ['Toga', 'Formal dress of a citizen'], ['Familia', 'The whole household']] },
    ] },
  ] },
  { id: 'film', name: 'Film Studies', glyph: '🎬', color: 'purple', boards: [Q], units: [
    { title: 'Film form and industry', desc: 'How films are made and sold', lessons: [
      { title: 'Film form', qs: [
        ['A shot from head to waist is a…', 'medium shot', ['close-up', 'long shot', 'establishing shot']],
        ['Sound the characters can hear is…', 'diegetic sound', ['non-diegetic sound', 'foley only', 'voice-over']],
        ['Everything placed in the frame (set, props, costume, lighting) is…', 'mise-en-scène', ['montage', 'cinematography', 'editing']],
        ['A camera moving sideways on a track is a…', 'tracking shot', ['pan', 'tilt', 'zoom']],
        ['Low-key lighting creates…', 'shadows and a dark mood', ['bright, even light', 'a cartoon look', 'colour grading']],
      ], terms: [['Close-up', 'A shot showing detail, often a face'], ['Editing', 'Putting shots together'], ['Cinematography', 'Camera work and lighting'], ['Genre', 'A type of film with shared conventions']] },
      { title: 'Film industry', qs: [
        ['Overall creative control of a film usually belongs to the…', 'director', ['producer', 'editor', 'screenwriter']],
        ['A big-budget film made mainly for profit is a…', 'blockbuster', ['documentary', 'short film', 'art film']],
        ['The BBFC decides a film\'s…', 'age rating', ['budget', 'release date', 'box office']],
        ['Major Hollywood studios controlling production in the 1930s–40s was the…', 'studio system', ['auteur theory', 'independent cinema', 'star rating']],
        ['Money a film earns in cinemas is its…', 'box office', ['budget', 'franchise', 'marketing']],
      ], terms: [['Auteur', 'A director with a personal style'], ['Narrative', 'How the story is told'], ['Representation', 'How groups are shown'], ['Spectator', 'The person watching']] },
    ] },
  ] },
  { id: 'media', name: 'Media Studies', glyph: '📰', color: 'yellow', boards: [A, Q], units: [
    { title: 'Media language and audiences', desc: 'Reading media texts', lessons: [
      { title: 'Media language', qs: [
        ['The title at the top of a magazine cover is the…', 'masthead', ['byline', 'cover line', 'strapline']],
        ['Studying signs and symbols that create meaning is…', 'semiotics', ['ergonomics', 'economics', 'statistics']],
        ['Equilibrium, disruption, new equilibrium is…', 'Todorov\'s narrative theory', ['Propp\'s character types', 'Hall\'s reception theory', 'Gerbner\'s cultivation theory']],
        ['A text that copies another for humour is a…', 'parody', ['pastiche', 'genre', 'hybrid']],
        ['Text on a cover that teases stories inside is a…', 'cover line', ['masthead', 'central image', 'barcode']],
      ], terms: [['Representation', 'How people and places are shown'], ['Audience', 'Who a text is aimed at'], ['Genre', 'A type of media text'], ['Stereotype', 'An oversimplified image of a group']] },
      { title: 'Audiences and industries', qs: [
        ['A large, general audience is a…', 'mass audience', ['niche audience', 'target audience', 'core audience']],
        ['Owning businesses at different stages of production is…', 'vertical integration', ['horizontal integration', 'a conglomerate', 'regulation']],
        ['The UK regulator for TV and radio is…', 'Ofcom', ['IPSO', 'BBFC', 'ASA']],
        ['Uses and gratifications theory says audiences use media to…', 'meet their own needs', ['do nothing', 'only get news', 'watch passively']],
        ['The BBC is funded mainly by…', 'the licence fee', ['adverts', 'subscriptions', 'the National Lottery']],
      ], terms: [['Niche audience', 'A small, specific audience'], ['Conglomerate', 'A company owning many businesses'], ['Regulation', 'Rules that control media'], ['Convergence', 'Media coming together on one device']] },
    ] },
  ] },
  { id: 'art', name: 'Art and Design', glyph: '🎨', color: 'red', boards: [A, E, Q], units: [
    { title: 'Elements and movements', desc: 'The language of art and key styles', lessons: [
      { title: 'Formal elements', qs: [
        ['The formal elements include line, tone, colour, shape, form, texture and…', 'pattern', ['budget', 'genre', 'plot']],
        ['Red, yellow and blue are…', 'primary colours', ['secondary colours', 'tertiary colours', 'complementary colours']],
        ['Colours opposite each other on the colour wheel are…', 'complementary', ['analogous', 'primary', 'monochrome']],
        ['How light or dark something is, is its…', 'tone', ['texture', 'line', 'pattern']],
        ['Making an object look 3D on paper uses…', 'perspective and shading', ['bright colour only', 'a frame', 'a signature']],
      ], terms: [['Composition', 'How parts of an artwork are arranged'], ['Texture', 'How a surface feels or looks'], ['Form', 'A three-dimensional shape'], ['Annotation', 'Notes explaining your ideas']] },
      { title: 'Art movements', qs: [
        ['Monet and Renoir were part of…', 'Impressionism', ['Cubism', 'Pop Art', 'Surrealism']],
        ['Picasso and Braque developed…', 'Cubism', ['Impressionism', 'Baroque', 'Pop Art']],
        ['Andy Warhol is known for…', 'Pop Art', ['Renaissance art', 'Surrealism', 'Minimalism']],
        ['Dalí\'s melting clocks are an example of…', 'Surrealism', ['Pop Art', 'Realism', 'Impressionism']],
        ['Leonardo da Vinci worked during the…', 'Renaissance', ['Baroque period', 'Industrial Revolution', 'Modernism']],
      ], terms: [['Still life', 'A study of arranged objects'], ['Mood board', 'A collage of ideas and inspiration'], ['Medium', 'The material used, like paint or clay'], ['Sketchbook', 'Where you develop ideas']] },
    ] },
  ] },
  { id: 'dt', name: 'Design and Technology', glyph: '📐', color: 'blue', boards: [A, E, Q], units: [
    { title: 'Materials and designing', desc: 'What things are made of and how they are designed', lessons: [
      { title: 'Materials', qs: [
        ['Which of these is a hardwood?', 'oak', ['pine', 'MDF', 'plywood']],
        ['A plastic that can be reheated and reshaped is a…', 'thermoplastic', ['thermosetting plastic', 'composite', 'ferrous metal']],
        ['Metals that contain iron are…', 'ferrous', ['non-ferrous', 'always alloys', 'polymers']],
        ['MDF is a…', 'manufactured board', ['hardwood', 'softwood', 'metal']],
        ['A smart material that changes colour with temperature is…', 'thermochromic pigment', ['photochromic pigment', 'shape memory alloy', 'carbon fibre']],
      ], terms: [['Composite', 'Two or more materials combined'], ['Alloy', 'A metal mixed with other elements'], ['Sustainability', 'Meeting needs without harming the future'], ['Prototype', 'A working model of a design']] },
      { title: 'Designing', qs: [
        ['A list of what a product must do is a…', 'design specification', ['design brief', 'mood board', 'evaluation']],
        ['Designing to fit the human body uses…', 'ergonomics and anthropometrics', ['aesthetics only', 'primary research only', 'CAD only']],
        ['CAD stands for…', 'computer-aided design', ['cutting and drilling', 'central automated design', 'computer-assisted drawing']],
        ['Making large numbers of identical products continuously is…', 'mass production', ['one-off production', 'batch production', 'bespoke production']],
        ['The 6 Rs include reduce, reuse and…', 'recycle', ['remove', 'repaint', 'resell']],
      ], terms: [['Design brief', 'A short statement of the problem'], ['Batch production', 'Making a set number of products'], ['Iterative design', 'Improving through repeated testing'], ['CAM', 'Computer-aided manufacture']] },
    ] },
  ] },
  { id: 'electronics', name: 'Electronics', glyph: '🔌', color: 'yellow', boards: [Q], units: [
    { title: 'Components and logic', desc: 'Building blocks of circuits', lessons: [
      { title: 'Components', qs: [
        ['Which component only lets current flow one way?', 'diode', ['resistor', 'capacitor', 'switch']],
        ['An LDR\'s resistance falls when…', 'light gets brighter', ['it gets darker', 'it gets hotter', 'current stops']],
        ['An NTC thermistor\'s resistance falls when…', 'temperature rises', ['temperature falls', 'light falls', 'voltage falls']],
        ['Which component stores charge?', 'capacitor', ['diode', 'LED', 'transistor']],
        ['A transistor can be used as an…', 'electronic switch', ['energy store', 'light sensor', 'battery']],
      ], terms: [['Resistor', 'Limits current'], ['LED', 'Lights up when current flows forward'], ['Potential divider', 'Two resistors that split a voltage'], ['Logic gate', 'Gives an output based on inputs']] },
      { title: 'Logic', qs: [
        ['An AND gate outputs 1 when…', 'both inputs are 1', ['either input is 1', 'both inputs are 0', 'the inputs differ']],
        ['A NOT gate…', 'inverts its input', ['adds two inputs', 'stores a bit', 'always outputs 1']],
        ['An OR gate outputs 0 only when…', 'both inputs are 0', ['both inputs are 1', 'one input is 1', 'never']],
        ['In digital electronics, logic 1 usually means…', 'a high voltage (on)', ['zero volts', 'an error', 'a resistor']],
        ['Ohm\'s law is…', 'V = IR', ['P = IV', 'E = mc²', 'F = ma']],
      ], terms: [['Truth table', 'Lists the output for every input'], ['Input', 'A signal going into a system'], ['Process', 'What the system does'], ['Output', 'The result']] },
    ] },
  ] },
  { id: 'engineering', name: 'Engineering', glyph: '⚙️', color: 'green', boards: [A], units: [
    { title: 'Materials and processes', desc: 'How engineered products are made', lessons: [
      { title: 'Material properties', qs: [
        ['A material that can be drawn into wires is…', 'ductile', ['brittle', 'hard', 'elastic']],
        ['Steel is an alloy of iron and…', 'carbon', ['copper', 'tin', 'aluminium']],
        ['Resistance to scratching and wear is…', 'hardness', ['toughness', 'ductility', 'malleability']],
        ['Aluminium is used in aircraft because it is…', 'light and corrosion-resistant', ['magnetic', 'very heavy', 'a good insulator']],
        ['Brass is an alloy of copper and…', 'zinc', ['tin', 'iron', 'lead']],
      ], terms: [['Toughness', 'Resists breaking under impact'], ['Malleability', 'Can be hammered into shape'], ['Tensile strength', 'Resists being pulled apart'], ['Corrosion', 'Being worn away by chemical reaction']] },
      { title: 'Processes', qs: [
        ['Pouring molten metal into a mould is…', 'casting', ['forging', 'milling', 'soldering']],
        ['A machine that spins the workpiece against a cutting tool is a…', 'lathe', ['milling machine', 'pillar drill', 'laser cutter']],
        ['Joining metals by melting them together is…', 'welding', ['gluing', 'riveting', 'turning']],
        ['CNC stands for…', 'computer numerical control', ['central number cutting', 'computer network connection', 'controlled nut casting']],
        ['A drawing showing front, side and top views is an…', 'orthographic projection', ['isometric drawing', 'exploded view', 'sketch']],
      ], terms: [['Tolerance', 'Allowed variation in a measurement'], ['Quality control', 'Checking products meet standards'], ['Lean manufacturing', 'Reducing waste'], ['Prototype', 'An early model for testing']] },
    ] },
  ] },
  { id: 'food', name: 'Food Preparation and Nutrition', glyph: '🍳', color: 'red', boards: [A, Q], units: [
    { title: 'Nutrition and food science', desc: 'Healthy eating and safe cooking', lessons: [
      { title: 'Nutrition', qs: [
        ['Which nutrient is the body\'s main source of energy?', 'carbohydrate', ['protein', 'vitamin C', 'water']],
        ['Protein is needed mainly for…', 'growth and repair', ['strong teeth only', 'vision', 'energy only']],
        ['A lack of vitamin C causes…', 'scurvy', ['rickets', 'anaemia', 'goitre']],
        ['Iron is needed to make…', 'haemoglobin in red blood cells', ['bones', 'insulin', 'skin']],
        ['The Eatwell Guide suggests at least how many portions of fruit and veg a day?', '5', ['2', '3', '10']],
      ], terms: [['Macronutrient', 'Needed in large amounts (carbs, protein, fat)'], ['Micronutrient', 'Needed in small amounts (vitamins, minerals)'], ['Fibre', 'Helps digestion'], ['Calcium', 'Builds strong bones and teeth']] },
      { title: 'Food safety and science', qs: [
        ['The danger zone for bacterial growth is…', '5 °C to 63 °C', ['0 °C to 5 °C', '63 °C to 100 °C', '−18 °C to 0 °C']],
        ['Fridges should be kept at…', '0 °C to 5 °C', ['10 °C to 15 °C', '−18 °C', '20 °C']],
        ['Food should reach a core temperature of at least…', '75 °C', ['37 °C', '50 °C', '100 °C']],
        ['Bread rising as yeast makes carbon dioxide is…', 'fermentation', ['coagulation', 'gelatinisation', 'caramelisation']],
        ['Starch thickening a sauce when heated in liquid is…', 'gelatinisation', ['denaturation', 'emulsification', 'dextrinisation']],
      ], terms: [['Cross-contamination', 'Bacteria spreading between foods'], ['Coagulation', 'Proteins setting when heated'], ['Caramelisation', 'Sugar browning with heat'], ['Emulsion', 'Oil and water held together']] },
    ] },
  ] },
  { id: 'drama', name: 'Drama', glyph: '🎭', color: 'purple', boards: [A, E, Q], units: [
    { title: 'Skills and practitioners', desc: 'Techniques and the people behind them', lessons: [
      { title: 'Theatre skills', qs: [
        ['Speaking your thoughts aloud while the scene freezes is…', 'thought-tracking', ['hot-seating', 'still image', 'cross-cutting']],
        ['Questioning an actor who stays in role is…', 'hot-seating', ['thought-tracking', 'role on the wall', 'narration']],
        ['A frozen picture made by actors is a…', 'still image (tableau)', ['monologue', 'soliloquy', 'flashback']],
        ['The part of the stage closest to the audience is…', 'downstage', ['upstage', 'stage left', 'the wings']],
        ['A stage with the audience on three sides is a…', 'thrust stage', ['proscenium arch', 'theatre in the round', 'traverse stage']],
      ], terms: [['Proxemics', 'Using space to show relationships'], ['Projection', 'Making your voice carry'], ['Blocking', 'Planning actors\' movements'], ['Monologue', 'One character speaking alone']] },
      { title: 'Practitioners', qs: [
        ['Breaking the fourth wall to make the audience think is linked to…', 'Brecht', ['Stanislavski', 'Shakespeare', 'Ibsen']],
        ['Stanislavski\'s system aims for…', 'naturalistic, believable acting', ['alienating the audience', 'mask work only', 'puppetry']],
        ['Frantic Assembly is known for…', 'physical theatre', ['puppetry', 'opera', 'radio drama']],
        ['Artaud\'s Theatre of Cruelty aimed to…', 'shock the audience\'s senses', ['make them laugh', 'teach history', 'be naturalistic']],
        ['A placard showing a scene\'s title is a typical…', 'Brechtian technique', ['naturalistic technique', 'pantomime trick', 'Greek chorus']],
      ], terms: [['Verfremdungseffekt', 'Alienation: reminding the audience it\'s a play'], ['Emotion memory', 'Using your own past feelings'], ['Naturalism', 'Realistic acting and staging'], ['Chorus', 'A group commenting on the action']] },
    ] },
  ] },
  { id: 'dance', name: 'Dance', glyph: '💃', color: 'red', boards: [A], units: [
    { title: 'Performance and choreography', desc: 'Skills, devices and structures', lessons: [
      { title: 'Dance skills', qs: [
        ['Physical skills include balance, coordination, flexibility and…', 'strength', ['projection', 'focus', 'musicality']],
        ['Expressive skills include facial expression, focus, projection and…', 'musicality', ['strength', 'stamina', 'flexibility']],
        ['Dancers doing the same movement at the same time is…', 'unison', ['canon', 'contrast', 'motif']],
        ['Dancers performing the same movement one after another is…', 'canon', ['unison', 'retrograde', 'accumulation']],
        ['A short phrase that is repeated and developed is a…', 'motif', ['stimulus', 'structure', 'dynamic']],
      ], terms: [['Stimulus', 'The starting idea for a dance'], ['Dynamics', 'How a movement is done (speed, energy)'], ['Choreographic intent', 'What the dance aims to show'], ['Relationships', 'How dancers interact']] },
      { title: 'Choreography', qs: [
        ['A dance structured A–B–A is in…', 'ternary form', ['binary form', 'rondo form', 'narrative form']],
        ['Performing a motif backwards is…', 'retrograde', ['canon', 'unison', 'accumulation']],
        ['Adding one move each time a phrase repeats is…', 'accumulation', ['retrograde', 'contrast', 'climax']],
        ['The most important or exciting moment of a dance is the…', 'climax', ['transition', 'motif', 'stimulus']],
        ['A safe warm-up should…', 'raise the heart rate and mobilise joints', ['stretch cold muscles hard', 'be skipped', 'last a few seconds']],
      ], terms: [['Binary form', 'A dance in two sections (A–B)'], ['Transition', 'A link between sections'], ['Contact', 'Dancers touching or supporting each other'], ['Formation', 'The shape dancers make on stage']] },
    ] },
  ] },
  { id: 'music', name: 'Music', glyph: '🎵', color: 'blue', boards: [A, E, Q], units: [
    { title: 'Elements and theory', desc: 'How music works', lessons: [
      { title: 'Elements of music', qs: [
        ['How loud or quiet music is, is its…', 'dynamics', ['tempo', 'timbre', 'texture']],
        ['The speed of music is its…', 'tempo', ['pitch', 'metre', 'harmony']],
        ['Gradually getting louder is a…', 'crescendo', ['diminuendo', 'staccato', 'legato']],
        ['A single melody with no accompaniment is a…', 'monophonic texture', ['homophonic texture', 'polyphonic texture', 'heterophonic texture']],
        ['The distinctive sound of an instrument is its…', 'timbre', ['tempo', 'dynamics', 'structure']],
      ], terms: [['Staccato', 'Short and detached'], ['Legato', 'Smooth and connected'], ['Ostinato', 'A repeated pattern'], ['Syncopation', 'Accents off the beat']] },
      { title: 'Music theory', qs: [
        ['How many beats does a crotchet last in 4/4?', '1', ['2', '4', '½']],
        ['A minim lasts…', '2 beats', ['1 beat', '4 beats', '½ beat']],
        ['A chord of the 1st, 3rd and 5th notes of a scale is a…', 'triad', ['cadence', 'scale', 'interval']],
        ['A perfect cadence goes from chord…', 'V to I', ['I to IV', 'IV to I', 'V to vi'], 'IV to I is plagal; V to vi is interrupted.'],
        ['3/4 time has…', '3 crotchet beats per bar', ['4 beats per bar', '2 beats per bar', '6 quavers only']],
      ], terms: [['Major key', 'Often sounds bright'], ['Minor key', 'Often sounds sad or dark'], ['Interval', 'The distance between two notes'], ['Cadence', 'A musical full stop']] },
    ] },
  ] },
  { id: 'pe', name: 'Physical Education', glyph: '⚽', color: 'green', boards: [A, E, Q], units: [
    { title: 'The body and training', desc: 'Anatomy, physiology and fitness', lessons: [
      { title: 'Applied anatomy', qs: [
        ['Which blood vessels carry blood back to the heart?', 'veins', ['arteries', 'capillaries', 'the aorta']],
        ['Breathing out is called…', 'expiration', ['inspiration', 'respiration', 'diffusion']],
        ['The muscle that bends the arm at the elbow is the…', 'biceps', ['triceps', 'quadriceps', 'deltoid']],
        ['Cardiac output = stroke volume × …', 'heart rate', ['breathing rate', 'tidal volume', 'blood pressure']],
        ['Anaerobic exercise produces…', 'lactic acid', ['extra oxygen', 'glucose', 'only water']],
      ], terms: [['Tidal volume', 'Air breathed in or out per normal breath'], ['Stroke volume', 'Blood pumped per heartbeat'], ['Antagonistic pair', 'Muscles working in opposite directions'], ['Ligament', 'Joins bone to bone']] },
      { title: 'Training and health', qs: [
        ['SMART targets: specific, measurable, achievable, realistic and…', 'time-bound', ['tested', 'tough', 'team-based']],
        ['FITT stands for frequency, intensity, time and…', 'type', ['training', 'target', 'tempo']],
        ['Continuous training mainly improves…', 'cardiovascular endurance', ['flexibility', 'reaction time', 'power']],
        ['Making training gradually harder is…', 'progressive overload', ['reversibility', 'specificity', 'tedium']],
        ['Losing fitness when you stop training is…', 'reversibility', ['progression', 'overtraining', 'specificity']],
      ], terms: [['Specificity', 'Training matched to your sport'], ['Agility', 'Changing direction quickly'], ['Reaction time', 'Time to respond to a stimulus'], ['Warm-up', 'Prepares the body for exercise']] },
    ] },
  ] },
];

// GCSE modern foreign languages and which boards offer them. `code` links to a language course in the app.
export const GCSE_MFL = [
  { name: 'French', code: 'fr', boards: [A, E, Q] }, { name: 'German', code: 'de', boards: [A, E, Q] }, { name: 'Spanish', code: 'es', boards: [A, E, Q] },
  { name: 'Italian', code: 'it', boards: [A, E] }, { name: 'Chinese (Mandarin)', code: 'zh', boards: [A, E] }, { name: 'Urdu', code: 'ur', boards: [A, E] },
  { name: 'Japanese', code: 'ja', boards: [E] }, { name: 'Russian', code: 'ru', boards: [E] }, { name: 'Arabic', code: 'ar', boards: [E] },
  { name: 'Greek', code: 'el', boards: [E] }, { name: 'Persian', code: 'fa', boards: [E] }, { name: 'Portuguese', code: 'pt', boards: [E] },
  { name: 'Turkish', code: 'tr', boards: [E] }, { name: 'Polish', code: 'pl', boards: [A] }, { name: 'Modern Hebrew', code: 'he', boards: [A] },
  { name: 'Latin', code: null, course: 'gcse:latin', boards: [Q] },
  { name: 'Bengali', code: null, boards: [A] }, { name: 'Panjabi', code: null, boards: [A] }, { name: 'Gujarati', code: null, boards: [E] },
];

// Boards for the original nine subjects.
export const CORE_BOARDS = {
  maths: [A, E, Q], 'english-lang': [A, E, Q], 'english-lit': [A, E, Q], biology: [A, E, Q], chemistry: [A, E, Q], physics: [A, E, Q],
  geography: [A, E, Q], history: [A, E, Q], compsci: [A, E, Q],
};
