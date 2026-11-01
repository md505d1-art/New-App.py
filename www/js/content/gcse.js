// GCSE subject courses (Year 11). Starter content written for AQA-style specifications.
// Each question: [question, correct answer, [wrong answers], optional explanation]. Terms become matching rounds.

export const SUBJECTS = [
  { id: 'maths', name: 'Maths', icon: 'math', color: 'blue', units: [
    { title: 'Number & Algebra', desc: 'Percentages, powers and equations', lessons: [
      { title: 'Number', qs: [
        ['What is 15% of 80?', '12', ['15', '8', '10'], '10% is 8 and 5% is 4, so 15% is 12.'],
        ['Write 0.00052 in standard form.', '5.2 × 10⁻⁴', ['52 × 10⁻⁵', '5.2 × 10⁴', '0.52 × 10⁻³'], 'The first number must be between 1 and 10.'],
        ['What is the highest common factor of 24 and 36?', '12', ['6', '72', '4']],
        ['Simplify 2³ × 2⁴', '2⁷', ['2¹²', '4⁷', '2¹'], 'When multiplying powers of the same base, add the powers.'],
        ['Round 3.14159 to 3 significant figures.', '3.14', ['3.141', '3.1', '3.142']],
      ], terms: [['Prime number', 'Exactly two factors: 1 and itself'], ['Factor', 'Divides exactly into a number'], ['Multiple', 'In a number\'s times table'], ['Reciprocal', '1 divided by the number']] },
      { title: 'Algebra', qs: [
        ['Solve 3x + 5 = 20', 'x = 5', ['x = 15', 'x = 25/3', 'x = 6'], 'Subtract 5 to get 3x = 15, then divide by 3.'],
        ['Expand 2(x + 4)', '2x + 8', ['2x + 4', 'x + 8', '2x + 6']],
        ['Factorise x² + 5x + 6', '(x + 2)(x + 3)', ['(x + 1)(x + 6)', '(x − 2)(x − 3)', '(x + 5)(x + 1)'], 'Find two numbers that multiply to 6 and add to 5.'],
        ['What is the gradient of y = 3x − 2?', '3', ['−2', '2', '−3'], 'In y = mx + c, m is the gradient.'],
        ['What is the nth term of 5, 8, 11, 14, …?', '3n + 2', ['3n + 5', 'n + 3', '5n + 3'], 'It goes up in 3s, and 3 × 1 + 2 = 5.'],
      ], terms: [['Expression', 'Terms with no equals sign'], ['Equation', 'Can be solved to find an unknown'], ['Identity', 'True for every value (≡)'], ['Formula', 'A rule linking variables']] },
    ] },
    { title: 'Geometry & Statistics', desc: 'Angles, circles and averages', lessons: [
      { title: 'Geometry', qs: [
        ['The interior angles of a triangle add up to…', '180°', ['360°', '90°', '270°']],
        ['Area of a circle with radius 3 cm?', '9π cm²', ['6π cm²', '3π cm²', '9 cm²'], 'Area = πr², and 3² = 9.'],
        ['A right-angled triangle has shorter sides 3 and 4. How long is the hypotenuse?', '5', ['7', '25', '12'], '3² + 4² = 9 + 16 = 25, and √25 = 5.'],
        ['The exterior angles of any polygon add up to…', '360°', ['180°', '540°', 'It depends on the sides']],
        ['sin x = opposite ÷ …', 'hypotenuse', ['adjacent', 'opposite', 'tangent'], 'SOH CAH TOA.'],
      ], terms: [['Radius', 'Centre to the edge'], ['Diameter', 'Edge to edge through the centre'], ['Circumference', 'Distance around a circle'], ['Chord', 'Line joining two points on a circle']] },
      { title: 'Statistics & probability', qs: [
        ['What is the mean of 2, 4, 6 and 8?', '5', ['4', '6', '20'], '2 + 4 + 6 + 8 = 20, and 20 ÷ 4 = 5.'],
        ['What is the median of 3, 7, 1, 9, 5?', '5', ['7', '1', '25'], 'In order: 1, 3, 5, 7, 9. The middle value is 5.'],
        ['What is the probability of rolling a 6 on a fair dice?', '1/6', ['1/2', '6', '5/6']],
        ['What is the range of 4, 10, 2, 7?', '8', ['10', '6', '5.75'], '10 − 2 = 8.'],
        ['If P(rain) = 0.3, what is P(not rain)?', '0.7', ['0.3', '1.3', '0.03'], 'Probabilities of all outcomes add up to 1.'],
      ], terms: [['Mean', 'Total ÷ how many'], ['Median', 'Middle value in order'], ['Mode', 'Most common value'], ['Range', 'Biggest − smallest']] },
    ] },
  ] },

  { id: 'english-lang', name: 'English Language', icon: 'english', color: 'red', units: [
    { title: 'Language & persuasion', desc: 'Techniques writers use', lessons: [
      { title: 'Language techniques', qs: [
        ['"The wind howled through the trees" uses…', 'personification', ['simile', 'alliteration', 'hyperbole']],
        ['"As brave as a lion" is a…', 'simile', ['metaphor', 'onomatopoeia', 'oxymoron'], 'Similes compare using "like" or "as".'],
        ['"Buzz", "crash" and "sizzle" are examples of…', 'onomatopoeia', ['alliteration', 'sibilance', 'assonance']],
        ['"I\'ve told you a million times" is…', 'hyperbole', ['personification', 'a rhetorical question', 'a simile']],
        ['Repeating the same consonant sound at the start of nearby words is…', 'alliteration', ['assonance', 'sibilance', 'rhyme']],
      ], terms: [['Metaphor', 'Says something IS something else'], ['Oxymoron', 'Two opposite words together'], ['Pathetic fallacy', 'Weather that reflects a mood'], ['Juxtaposition', 'Contrasting ideas side by side']] },
      { title: 'Persuasive writing', qs: [
        ['"Wouldn\'t you want a safer town?" is a…', 'rhetorical question', ['statistic', 'anecdote', 'simile']],
        ['"Nine out of ten students agree" uses…', 'a statistic', ['an anecdote', 'a rule of three', 'emotive language']],
        ['Using three ideas or adjectives in a row is called…', 'the rule of three', ['anaphora', 'hyperbole', 'sibilance']],
        ['In AQA Paper 2, Question 5 asks you to write…', 'to present a viewpoint', ['a description of a picture', 'a summary of two sources', 'a comparison of poems']],
        ['Speaking to the reader with "you" and "we" is…', 'direct address', ['first-person narration', 'the passive voice', 'an imperative']],
      ], terms: [['Fact', 'Can be proven true'], ['Opinion', 'A personal belief'], ['Anecdote', 'A short personal story'], ['Imperative', 'A command verb']] },
    ] },
    { title: 'Reading & accuracy', desc: 'Structure, grammar and punctuation', lessons: [
      { title: 'Structure', qs: [
        ['AQA Paper 1, Question 2 asks about…', 'language', ['structure', 'evaluation', 'your own writing'], 'Q1 list, Q2 language, Q3 structure, Q4 evaluation, Q5 writing.'],
        ['AQA Paper 1, Question 3 asks about…', 'structure', ['language', 'a summary', 'persuasive writing']],
        ['Why might a writer use a one-sentence paragraph?', 'To create emphasis or tension', ['To list facts', 'To slow the pace with detail', 'To introduce a new narrator']],
        ['A flashback is…', 'a move back in time in the story', ['a sudden plot twist', 'a description of the setting', 'the ending']],
        ['A story told using "I" is written in the…', 'first person', ['second person', 'third person', 'passive voice']],
      ], terms: [['Foreshadowing', 'Hints at what will happen'], ['Cyclical structure', 'Ends where it began'], ['Climax', 'The moment of highest tension'], ['Shift in focus', 'Moving from one thing to another']] },
      { title: 'Grammar & punctuation', qs: [
        ['Which punctuation joins two closely related main clauses?', 'a semicolon', ['a comma', 'an apostrophe', 'a hyphen']],
        ['In "the dog\'s bone", the apostrophe shows…', 'possession', ['omission', 'a plural', 'a quotation']],
        ['Fill the gap: "___ raining again."', 'It\'s', ['Its', 'Its\''], '"It\'s" is short for "it is".'],
        ['Which word is a conjunction?', 'because', ['quickly', 'beautiful', 'under']],
        ['Which sentence uses a colon correctly?', 'She packed three things: a map, a torch and water.', ['She packed: three things a map, a torch and water.', 'She: packed three things, a map, a torch and water.']],
      ], terms: [['Noun', 'A person, place or thing'], ['Verb', 'An action or state'], ['Adjective', 'Describes a noun'], ['Adverb', 'Describes a verb']] },
    ] },
  ] },

  { id: 'english-lit', name: 'English Literature', icon: 'literature', color: 'purple',
    note: 'Covers four commonly studied texts. Tell me which texts your school does and I can swap them.', units: [
    { title: 'Macbeth & A Christmas Carol', desc: 'Shakespeare and the 19th-century novel', lessons: [
      { title: 'Macbeth', qs: [
        ['Who tells Macbeth he will be king?', 'The three witches', ['Banquo', 'Lady Macbeth', 'Duncan']],
        ['Who does Macbeth murder to become king?', 'King Duncan', ['Malcolm', 'Macduff', 'Fleance']],
        ['"Out, damned spot!" is said by…', 'Lady Macbeth', ['Macbeth', 'one of the witches', 'Banquo']],
        ['Who kills Macbeth at the end of the play?', 'Macduff', ['Malcolm', 'Banquo', 'Ross']],
        ['What does Macbeth see before he kills Duncan?', 'A dagger', ['A ghost', 'A crown', 'Birnam Wood moving']],
      ], terms: [['Tragic hero', 'A great man brought down by a flaw'], ['Hamartia', 'A fatal flaw, like Macbeth\'s ambition'], ['Soliloquy', 'A speech alone that reveals thoughts'], ['Regicide', 'Killing a king']] },
      { title: 'A Christmas Carol', qs: [
        ['How many ghosts visit Scrooge after Marley?', 'Three', ['Two', 'Four', 'One']],
        ['Who is Scrooge\'s clerk?', 'Bob Cratchit', ['Fred', 'Fezziwig', 'Jacob Marley']],
        ['"Are there no prisons?" shows Scrooge\'s…', 'lack of care for the poor', ['kindness', 'fear of ghosts', 'love of Christmas']],
        ['Who was Scrooge\'s kind first employer?', 'Fezziwig', ['Fred', 'Belle', 'Marley']],
        ['Ignorance and Want appear as…', 'two children', ['two ghosts in chains', 'two dogs', 'two businessmen']],
      ], terms: [['Redemption', 'Scrooge changing for the better'], ['Allegory', 'A story with a hidden moral meaning'], ['Novella', 'A short novel'], ['Social responsibility', 'Caring for others in society']] },
    ] },
    { title: 'An Inspector Calls & Jekyll and Hyde', desc: 'Modern drama and Gothic fiction', lessons: [
      { title: 'An Inspector Calls', qs: [
        ['Who wrote An Inspector Calls?', 'J.B. Priestley', ['Charles Dickens', 'Arthur Miller', 'Robert Louis Stevenson']],
        ['What is the name of the young woman who dies?', 'Eva Smith', ['Sheila Birling', 'Edna', 'Sybil Birling']],
        ['Arthur Birling calls the Titanic…', '"unsinkable"', ['"doomed"', '"too expensive"', '"a disgrace"'], 'Dramatic irony: the audience knows it sank.'],
        ['Which characters accept some responsibility?', 'Sheila and Eric', ['Arthur and Sybil', 'Gerald and Arthur', 'Sybil and Gerald']],
        ['The play is set in…', '1912', ['1945', '1900', '1918'], 'It was written in 1945.'],
      ], terms: [['Dramatic irony', 'The audience knows more than the characters'], ['Socialism', 'Shared responsibility for each other'], ['Capitalism', 'Private profit and business'], ['Stage directions', 'Instructions in the script']] },
      { title: 'Jekyll and Hyde', qs: [
        ['Who wrote Strange Case of Dr Jekyll and Mr Hyde?', 'Robert Louis Stevenson', ['Mary Shelley', 'Bram Stoker', 'Charles Dickens']],
        ['Which character investigates for most of the story?', 'Mr Utterson', ['Dr Lanyon', 'Poole', 'Mr Enfield']],
        ['In the first chapter, Hyde tramples…', 'a young girl', ['a policeman', 'Dr Lanyon', 'Mr Utterson']],
        ['Who does Hyde murder?', 'Sir Danvers Carew', ['Dr Lanyon', 'Mr Enfield', 'Poole']],
        ['A key theme of the novella is…', 'the duality of human nature', ['the French Revolution', 'life in the trenches', 'romantic love']],
      ], terms: [['Duality', 'Two sides of one person'], ['Gothic', 'Dark, mysterious fiction'], ['Respectability', 'Keeping a proper reputation'], ['Atavism', 'Reverting to a primitive state']] },
    ] },
  ] },

  { id: 'biology', name: 'Biology', icon: 'biology', color: 'green', units: [
    { title: 'Cells & organisation', desc: 'Cell structure and body systems', lessons: [
      { title: 'Cells', qs: [
        ['Which part of a cell contains genetic material?', 'nucleus', ['mitochondria', 'ribosome', 'cell membrane']],
        ['Where does aerobic respiration happen?', 'mitochondria', ['chloroplasts', 'nucleus', 'ribosomes']],
        ['Which structure is in plant cells but not animal cells?', 'cell wall', ['cell membrane', 'nucleus', 'cytoplasm']],
        ['Bacteria are…', 'prokaryotic cells', ['eukaryotic cells', 'viruses', 'plant cells'], 'Prokaryotic cells have no nucleus.'],
        ['What do ribosomes make?', 'proteins', ['glucose', 'DNA', 'fats']],
      ], terms: [['Diffusion', 'From high to low concentration'], ['Osmosis', 'Water moving across a partially permeable membrane'], ['Active transport', 'Against a gradient, using energy'], ['Mitosis', 'Division into two identical cells']] },
      { title: 'Organisation', qs: [
        ['Which enzyme breaks down starch?', 'amylase', ['protease', 'lipase', 'insulin']],
        ['Which blood vessels carry blood away from the heart?', 'arteries', ['veins', 'capillaries', 'alveoli']],
        ['Where does gas exchange happen in the lungs?', 'alveoli', ['trachea', 'bronchi', 'diaphragm']],
        ['Which part of the blood helps it clot?', 'platelets', ['red blood cells', 'plasma', 'white blood cells']],
        ['The heart\'s natural pacemaker is in the…', 'right atrium', ['left ventricle', 'aorta', 'left atrium']],
      ], terms: [['Tissue', 'A group of similar cells'], ['Organ', 'Tissues working together'], ['Organ system', 'Organs working together'], ['Enzyme', 'A biological catalyst']] },
    ] },
    { title: 'Energy & health', desc: 'Photosynthesis, respiration, disease', lessons: [
      { title: 'Bioenergetics', qs: [
        ['Carbon dioxide + water → ?', 'glucose + oxygen', ['glucose + carbon dioxide', 'oxygen + water', 'starch + nitrogen'], 'This is photosynthesis, using light energy.'],
        ['Which pigment absorbs light for photosynthesis?', 'chlorophyll', ['haemoglobin', 'melanin', 'insulin']],
        ['Anaerobic respiration in muscles makes…', 'lactic acid', ['ethanol', 'oxygen', 'glucose']],
        ['Which is NOT a limiting factor for photosynthesis?', 'oxygen concentration', ['light intensity', 'temperature', 'carbon dioxide concentration']],
        ['Fermentation in yeast makes ethanol and…', 'carbon dioxide', ['oxygen', 'lactic acid', 'water']],
      ], terms: [['Aerobic', 'Respiration using oxygen'], ['Anaerobic', 'Respiration without oxygen'], ['Endothermic', 'Takes in energy (photosynthesis)'], ['Exothermic', 'Releases energy (respiration)']] },
      { title: 'Infection & response', qs: [
        ['Which type of pathogen causes measles?', 'virus', ['bacterium', 'fungus', 'protist']],
        ['Antibiotics kill…', 'bacteria', ['viruses', 'white blood cells', 'vaccines']],
        ['Malaria is caused by a…', 'protist', ['virus', 'bacterium', 'fungus'], 'It is spread by mosquitoes.'],
        ['Vaccines contain…', 'dead or inactive pathogens', ['antibiotics', 'live white blood cells', 'painkillers']],
        ['White blood cells make proteins called…', 'antibodies', ['antigens', 'enzymes', 'hormones']],
      ], terms: [['Pathogen', 'A microorganism that causes disease'], ['Antigen', 'A protein on a pathogen\'s surface'], ['Antibody', 'Binds to antigens'], ['Phagocytosis', 'Engulfing a pathogen']] },
    ] },
  ] },

  { id: 'chemistry', name: 'Chemistry', icon: 'chemistry', color: 'yellow', units: [
    { title: 'Atoms & bonding', desc: 'The periodic table and how atoms join', lessons: [
      { title: 'Atomic structure', qs: [
        ['Which particle has a positive charge?', 'proton', ['neutron', 'electron', 'atom']],
        ['The atomic number tells you the number of…', 'protons', ['neutrons', 'protons + neutrons', 'shells']],
        ['Group 1 elements are called the…', 'alkali metals', ['halogens', 'noble gases', 'transition metals']],
        ['Why are Group 0 elements unreactive?', 'They have full outer shells', ['They are metals', 'They are liquids', 'They have no electrons']],
        ['What is the relative charge of an electron?', '−1', ['+1', '0', '−2']],
      ], terms: [['Isotope', 'Same protons, different neutrons'], ['Element', 'Only one type of atom'], ['Compound', 'Elements chemically joined'], ['Mixture', 'Substances not chemically joined']] },
      { title: 'Bonding', qs: [
        ['Ionic bonding happens between…', 'a metal and a non-metal', ['two non-metals', 'two metals', 'noble gases']],
        ['Covalent bonds involve…', 'sharing pairs of electrons', ['transferring electrons', 'a sea of delocalised electrons', 'sharing protons']],
        ['Why is diamond so hard?', 'Each carbon forms four strong covalent bonds', ['It has delocalised electrons', 'It is ionic', 'It has weak forces between layers']],
        ['Why can graphite conduct electricity?', 'It has delocalised electrons', ['It is a metal', 'It is ionic', 'It is a liquid']],
        ['What is the formula of water?', 'H₂O', ['HO₂', 'H₂O₂', 'OH']],
      ], terms: [['Ion', 'A charged particle'], ['Metallic bonding', 'Positive ions in a sea of electrons'], ['Giant covalent', 'A huge network, like diamond'], ['Simple molecule', 'Small, with weak forces between molecules']] },
    ] },
    { title: 'Reactions', desc: 'Acids, rates and energy', lessons: [
      { title: 'Acids & reactivity', qs: [
        ['A solution with pH 7 is…', 'neutral', ['acidic', 'alkaline', 'strongly acidic']],
        ['Acid + alkali → ?', 'salt + water', ['salt + hydrogen', 'water + carbon dioxide', 'hydrogen + oxygen']],
        ['Acid + metal → salt + ?', 'hydrogen', ['water', 'oxygen', 'carbon dioxide']],
        ['Which metal is the most reactive?', 'potassium', ['copper', 'iron', 'gold']],
        ['Hydrochloric acid makes salts called…', 'chlorides', ['sulfates', 'nitrates', 'carbonates']],
      ], terms: [['Oxidation', 'Gain of oxygen or loss of electrons'], ['Reduction', 'Loss of oxygen or gain of electrons'], ['Neutralisation', 'Acid + base → salt + water'], ['Electrolysis', 'Splitting a compound with electricity']] },
      { title: 'Rates & energy', qs: [
        ['Why does heating make reactions faster?', 'Particles collide more often and with more energy', ['Activation energy goes up', 'There are fewer particles', 'The catalyst gets used up']],
        ['A catalyst…', 'speeds up a reaction without being used up', ['is used up in the reaction', 'slows a reaction down', 'raises the activation energy']],
        ['An exothermic reaction…', 'releases energy to the surroundings', ['takes in energy', 'has no energy change', 'always needs a catalyst']],
        ['The test for hydrogen is…', 'a squeaky pop with a lit splint', ['it relights a glowing splint', 'it turns limewater milky', 'it bleaches litmus paper']],
        ['The test for carbon dioxide is…', 'it turns limewater milky', ['a squeaky pop', 'it relights a glowing splint', 'it bleaches damp litmus paper']],
      ], terms: [['Activation energy', 'Minimum energy needed to react'], ['Collision theory', 'Particles must collide with enough energy'], ['Endothermic', 'Takes in energy from the surroundings'], ['Reversible reaction', 'Can go both ways (⇌)']] },
    ] },
  ] },

  { id: 'physics', name: 'Physics', icon: 'physics', color: 'purple', units: [
    { title: 'Energy & electricity', desc: 'Stores, transfers and circuits', lessons: [
      { title: 'Energy', qs: [
        ['What is the unit of energy?', 'joule (J)', ['watt (W)', 'newton (N)', 'volt (V)']],
        ['Which equation gives kinetic energy?', 'Eₖ = ½mv²', ['Eₖ = mgh', 'Eₖ = mv', 'Eₖ = Fd']],
        ['Power is…', 'energy transferred per second', ['force × mass', 'energy stored', 'charge × time']],
        ['Which is a renewable energy resource?', 'wind', ['coal', 'oil', 'natural gas']],
        ['Efficiency = useful output ÷ …', 'total input', ['wasted output', 'time', 'power']],
      ], terms: [['Conduction', 'Energy passed by vibrating particles'], ['Insulation', 'Reduces unwanted energy transfer'], ['Gravitational potential', 'Energy due to height (mgh)'], ['Specific heat capacity', 'Energy to heat 1 kg by 1 °C']] },
      { title: 'Electricity', qs: [
        ['V = I × ?', 'R', ['P', 'Q', 't'], 'Potential difference = current × resistance.'],
        ['What is the unit of current?', 'ampere (A)', ['volt (V)', 'ohm (Ω)', 'coulomb (C)']],
        ['In a series circuit, the current is…', 'the same everywhere', ['split between branches', 'zero', 'only at the battery']],
        ['UK mains electricity is…', '230 V, 50 Hz', ['12 V, 60 Hz', '110 V, 60 Hz', '230 V, 100 Hz']],
        ['Which wire is green and yellow?', 'earth', ['live', 'neutral', 'fuse']],
      ], terms: [['Current', 'Rate of flow of charge'], ['Potential difference', 'Energy per unit charge'], ['Resistance', 'Opposition to current'], ['Power', 'P = IV']] },
    ] },
    { title: 'Forces & waves', desc: 'Motion, Newton and the EM spectrum', lessons: [
      { title: 'Forces', qs: [
        ['What is the unit of force?', 'newton (N)', ['joule (J)', 'kilogram (kg)', 'watt (W)']],
        ['Newton\'s second law is…', 'F = ma', ['F = mv', 'E = mc²', 'P = IV']],
        ['Weight = mass × …', 'gravitational field strength', ['speed', 'height', 'volume']],
        ['On Earth, g is about…', '9.8 N/kg', ['1 N/kg', '98 N/kg', '0.98 N/kg']],
        ['Speed = distance ÷ …', 'time', ['mass', 'acceleration', 'force']],
      ], terms: [['Scalar', 'Size only, like speed'], ['Vector', 'Size and direction, like velocity'], ['Momentum', 'Mass × velocity'], ['Resultant force', 'One force with the same effect as all of them']] },
      { title: 'Waves', qs: [
        ['Which waves are longitudinal?', 'sound waves', ['light waves', 'water ripples', 'radio waves']],
        ['Wave speed = frequency × …', 'wavelength', ['amplitude', 'period', 'time']],
        ['Which EM wave has the shortest wavelength?', 'gamma rays', ['radio waves', 'visible light', 'microwaves']],
        ['All EM waves travel at the same speed through…', 'a vacuum', ['water', 'glass', 'solids']],
        ['What is the unit of frequency?', 'hertz (Hz)', ['metres (m)', 'seconds (s)', 'decibels (dB)']],
      ], terms: [['Amplitude', 'Maximum height from rest'], ['Wavelength', 'Peak to peak distance'], ['Frequency', 'Waves per second'], ['Transverse', 'Vibrations at right angles to travel']] },
    ] },
  ] },

  { id: 'geography', name: 'Geography', icon: 'geography', color: 'green', units: [
    { title: 'Physical geography', desc: 'Hazards, rivers and coasts', lessons: [
      { title: 'Natural hazards', qs: [
        ['Most earthquakes happen at…', 'plate margins', ['the centre of plates', 'deserts', 'only on coastlines']],
        ['At a destructive margin, the plates…', 'move towards each other', ['move apart', 'slide past each other', 'stay still']],
        ['Tropical storms form over seas warmer than about…', '27 °C', ['10 °C', '50 °C', '0 °C']],
        ['The San Andreas Fault is a…', 'conservative margin', ['constructive margin', 'destructive margin', 'hotspot']],
        ['Which is a primary effect of an earthquake?', 'buildings collapsing', ['disease weeks later', 'rising unemployment', 'rebuilding costs']],
      ], terms: [['Primary effect', 'Caused directly by the hazard'], ['Secondary effect', 'Results from the primary effects'], ['Mitigation', 'Reducing the impact'], ['Weathering', 'Rock breaking down where it is']] },
      { title: 'Rivers & coasts', qs: [
        ['Hydraulic action, abrasion, attrition and…', 'solution', ['deposition', 'transportation', 'saltation'], 'These are the four processes of erosion.'],
        ['V-shaped valleys form in a river\'s…', 'upper course', ['lower course', 'estuary', 'delta']],
        ['Longshore drift moves sediment…', 'along the coast', ['out to sea', 'up the river', 'into the air']],
        ['An oxbow lake forms from a…', 'meander', ['waterfall', 'spit', 'levee']],
        ['Which is hard engineering?', 'sea walls', ['beach nourishment', 'managed retreat', 'dune regeneration']],
      ], terms: [['Deposition', 'Dropping sediment'], ['Hydraulic action', 'Force of water breaking rock'], ['Spit', 'A ridge of sand sticking out to sea'], ['Levee', 'A raised river bank']] },
    ] },
    { title: 'Human geography', desc: 'Cities, development and resources', lessons: [
      { title: 'Urban world & development', qs: [
        ['Urbanisation means…', 'a growing share of people living in towns and cities', ['people moving to the countryside', 'building more farms', 'fewer people in cities']],
        ['GNI per head measures…', 'average income', ['life expectancy', 'literacy', 'birth rate']],
        ['A push factor for leaving the countryside is…', 'a lack of jobs', ['better city healthcare', 'more city schools', 'city nightlife'], 'Push factors drive people away; pull factors attract them.'],
        ['The Demographic Transition Model shows changes in…', 'birth and death rates', ['temperature', 'income', 'crop yields']],
        ['Nigeria and India are examples of…', 'NEEs', ['HICs', 'LICs that are shrinking', 'city states']],
      ], terms: [['HIC', 'Higher income country'], ['LIC', 'Low income country'], ['NEE', 'Newly emerging economy'], ['Sustainability', 'Meeting needs without harming the future']] },
      { title: 'Resources', qs: [
        ['Energy security means…', 'a reliable, affordable energy supply', ['using only solar power', 'importing all energy', 'using no energy']],
        ['Which is a renewable resource?', 'solar power', ['coal', 'oil', 'natural gas']],
        ['Food miles are…', 'the distance food travels to you', ['the calories in food', 'the size of a farm', 'the price of food']],
        ['Irrigation is…', 'supplying water to crops', ['removing salt from water', 'a type of soil', 'a farming tax']],
        ['In the UK, most water surplus areas are in the…', 'north and west', ['south and east', 'Midlands', 'London']],
      ], terms: [['Deficit', 'Demand is greater than supply'], ['Surplus', 'Supply is greater than demand'], ['Carbon footprint', 'Greenhouse gases you produce'], ['Renewable', 'Will not run out']] },
    ] },
  ] },

  { id: 'compsci', name: 'Computer Science', icon: 'cs', color: 'blue', units: [
    { title: 'Computer systems', desc: 'Hardware, data and networks', lessons: [
      { title: 'Hardware & data', qs: [
        ['What does CPU stand for?', 'Central Processing Unit', ['Computer Personal Unit', 'Central Program Utility', 'Core Processing Unit']],
        ['How many bits are in a byte?', '8', ['4', '16', '1024']],
        ['Binary 1010 in denary is…', '10', ['12', '5', '1010'], '8 + 2 = 10.'],
        ['Which memory is volatile?', 'RAM', ['ROM', 'SSD', 'hard disk'], 'Volatile memory is lost when the power goes off.'],
        ['Hexadecimal F in denary is…', '15', ['16', '6', '10']],
      ], terms: [['RAM', 'Temporary memory for running programs'], ['ROM', 'Stores the start-up instructions'], ['Cache', 'Very fast memory inside the CPU'], ['Secondary storage', 'Long-term, non-volatile storage']] },
      { title: 'Networks & security', qs: [
        ['LAN stands for…', 'Local Area Network', ['Large Access Network', 'Linked Area Node', 'Long Area Network']],
        ['Phishing is…', 'tricking people into giving personal details', ['a type of firewall', 'a backup method', 'encrypting data']],
        ['A firewall…', 'monitors and filters network traffic', ['speeds up the CPU', 'stores passwords', 'prints documents']],
        ['Which protocol loads secure web pages?', 'HTTPS', ['FTP', 'SMTP', 'IMAP']],
        ['Encryption…', 'scrambles data so only authorised people can read it', ['deletes data', 'compresses images', 'checks spelling']],
      ], terms: [['Malware', 'Software designed to cause harm'], ['IP address', 'Identifies a device on a network'], ['Router', 'Sends data between networks'], ['Protocol', 'Rules for communication']] },
    ] },
    { title: 'Algorithms & programming', desc: 'Thinking like a programmer', lessons: [
      { title: 'Algorithms', qs: [
        ['Which search needs the list to be sorted first?', 'binary search', ['linear search', 'bubble search', 'random search']],
        ['Decomposition means…', 'breaking a problem into smaller parts', ['removing unnecessary detail', 'finding patterns', 'writing code']],
        ['Abstraction means…', 'removing unnecessary detail', ['breaking a problem down', 'testing code', 'using loops']],
        ['Which sort repeatedly swaps neighbouring items?', 'bubble sort', ['merge sort', 'binary sort', 'linear sort']],
        ['In a flowchart, a diamond shape means…', 'a decision', ['input or output', 'a process', 'the start']],
      ], terms: [['Algorithm', 'Step-by-step instructions'], ['Iteration', 'Repeating code (a loop)'], ['Selection', 'Choosing a path (if)'], ['Sequence', 'Steps in order']] },
      { title: 'Programming', qs: [
        ['Which data type stores True or False?', 'Boolean', ['integer', 'string', 'real']],
        ['In Python, what does print(7 // 2) show?', '3', ['3.5', '4', '1'], '// is integer division.'],
        ['What does 7 % 2 give?', '1', ['3', '3.5', '0'], '% gives the remainder.'],
        ['A variable holding "Hello" is a…', 'string', ['integer', 'Boolean', 'float']],
        ['Which loop runs a set number of times?', 'a for loop', ['a while loop', 'an if statement', 'a function']],
      ], terms: [['Variable', 'A named storage location'], ['Constant', 'A value that cannot change while running'], ['Array', 'A list of items of the same type'], ['Function', 'A subroutine that returns a value']] },
    ] },
  ] },
];
