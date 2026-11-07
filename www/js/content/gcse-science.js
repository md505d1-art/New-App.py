// Full-specification GCSE science content (AQA order; notes where Edexcel/Eduqas differ).
// Added after each subject's starter units, so existing lessons keep their progress.
// Question: [question, correct answer, [wrong answers], optional explanation]. Terms: [term, short definition].

export const BIOLOGY = [
  { title: 'Cell biology', desc: 'Microscopes, cell division and transport', lessons: [
    { title: 'Microscopy and cell types', qs: [
      ['Which cells have a nucleus?', 'Eukaryotic cells', ['Prokaryotic cells', 'Bacterial cells', 'All cells'], 'Animal and plant cells are eukaryotic; bacteria are prokaryotic.'],
      ['Magnification = image size ÷ …', 'real size', ['resolution', 'image size', 'eyepiece'], 'Rearrange: real size = image size ÷ magnification.'],
      ['Why do electron microscopes show more detail?', 'Higher resolution', ['They use colour', 'They are cheaper', 'They use living cells']],
      ['Where is genetic material found in a bacterium?', 'In a single loop of DNA and plasmids', ['In the nucleus', 'In the mitochondria', 'In the cell wall']],
      ['1 micrometre (µm) is…', '0.001 mm', ['0.1 mm', '1000 mm', '0.000001 mm'], '1 mm = 1000 µm.'],
    ], terms: [['Resolution', 'Ability to tell two close points apart'], ['Plasmid', 'Small ring of DNA in bacteria'], ['Eukaryotic', 'Cell with a nucleus'], ['Prokaryotic', 'Cell with no nucleus']] },
    { title: 'Cell division and stem cells', qs: [
      ['Mitosis produces…', 'Two identical diploid cells', ['Four different cells', 'Gametes', 'One larger cell'], 'Used for growth and repair.'],
      ['What happens before a cell divides by mitosis?', 'DNA is copied and organelles increase', ['The nucleus disappears for good', 'The cell shrinks', 'Chromosomes halve']],
      ['Where are plant stem cells found?', 'Meristems', ['Xylem', 'Root hair cells', 'Guard cells']],
      ['Which stem cells can become any type of cell?', 'Embryonic stem cells', ['Adult bone marrow cells', 'Red blood cells', 'Nerve cells']],
      ['Therapeutic cloning uses an embryo with…', 'The same genes as the patient', ['Random genes', 'Bacterial genes', 'No genes'], 'So the cells are not rejected.'],
    ], terms: [['Mitosis', 'Division into two identical cells'], ['Stem cell', 'Undifferentiated cell that can specialise'], ['Differentiation', 'A cell becoming specialised'], ['Meristem', 'Growing tissue in plant tips']] },
    { title: 'Transport in cells', qs: [
      ['Diffusion is the net movement of particles from…', 'High to low concentration', ['Low to high concentration', 'Cold to hot areas', 'Inside to outside only']],
      ['Which needs energy from respiration?', 'Active transport', ['Diffusion', 'Osmosis', 'Evaporation']],
      ['A plant cell in pure water becomes…', 'Turgid', ['Plasmolysed', 'Flaccid', 'Lysed']],
      ['Why do root hair cells use active transport?', 'Mineral ions are more concentrated inside the root', ['Water is too heavy', 'Soil has no ions', 'Roots have no membranes']],
      ['Which increases the rate of diffusion?', 'A larger surface area', ['A thicker membrane', 'A smaller concentration difference', 'Lower temperature']],
    ], terms: [['Osmosis', 'Water moving across a partially permeable membrane'], ['Turgid', 'Plant cell swollen with water'], ['Concentration gradient', 'Difference in concentration between two areas'], ['Surface area to volume ratio', 'How much surface there is per unit volume']] },
  ] },
  { title: 'Organisation', desc: 'Digestion, heart, lungs and plants', lessons: [
    { title: 'Digestion and enzymes', qs: [
      ['Amylase breaks down…', 'Starch into sugars', ['Protein into amino acids', 'Fats into fatty acids', 'Glucose into starch']],
      ['Where is bile made?', 'Liver', ['Gall bladder', 'Pancreas', 'Stomach'], 'It is stored in the gall bladder.'],
      ['What does bile do?', 'Neutralises acid and emulsifies fat', ['Digests protein', 'Absorbs water', 'Makes amylase']],
      ['Why does an enzyme stop working at high temperature?', 'Its active site changes shape (denatures)', ['It runs out of energy', 'It dissolves', 'It becomes a substrate']],
      ['Which reagent tests for protein?', 'Biuret (turns purple)', ['Iodine (turns blue-black)', "Benedict's (turns brick red)", 'Ethanol (goes cloudy)']],
    ], terms: [['Enzyme', 'Biological catalyst'], ['Active site', 'Where the substrate fits'], ['Protease', 'Enzyme that digests protein'], ['Lipase', 'Enzyme that digests fats']] },
    { title: 'The heart and blood', qs: [
      ['Which blood vessel carries blood away from the heart?', 'Artery', ['Vein', 'Capillary', 'Valve']],
      ['Why does the left ventricle have a thicker wall?', 'It pumps blood around the whole body', ['It holds more blood', 'It pumps to the lungs', 'It has valves']],
      ['Where is the heart\'s natural pacemaker?', 'Right atrium', ['Left ventricle', 'Aorta', 'Septum']],
      ['Which blood component helps clot blood?', 'Platelets', ['Plasma', 'Red blood cells', 'White blood cells']],
      ['What do stents do?', 'Keep coronary arteries open', ['Replace heart valves', 'Lower cholesterol', 'Make the heart beat'], 'Statins lower cholesterol instead.'],
    ], terms: [['Double circulatory system', 'Blood passes the heart twice per circuit'], ['Capillary', 'Tiny vessel for exchange with cells'], ['Plasma', 'Liquid part of blood'], ['Coronary heart disease', 'Fatty build-up narrows heart arteries']] },
    { title: 'Lungs and non-communicable disease', qs: [
      ['Where does gas exchange happen in the lungs?', 'Alveoli', ['Trachea', 'Bronchi', 'Diaphragm']],
      ['Which is a risk factor for type 2 diabetes?', 'Obesity', ['A virus', 'Vaccination', 'Exercise']],
      ['Tumours that spread to other parts of the body are…', 'Malignant', ['Benign', 'Communicable', 'Inherited only']],
      ['Smoking increases the risk of…', 'Lung disease and cancer', ['Measles', 'Malaria', 'Rose black spot']],
      ['Breathing rate = breaths ÷ …', 'minutes', ['litres', 'heartbeats', 'seconds squared']],
    ], terms: [['Alveoli', 'Tiny air sacs for gas exchange'], ['Non-communicable disease', 'Cannot spread between people'], ['Malignant', 'Cancer that spreads'], ['Risk factor', 'Something that makes a disease more likely']] },
    { title: 'Plant tissues and transport', qs: [
      ['Which tissue carries water up a plant?', 'Xylem', ['Phloem', 'Palisade', 'Epidermis']],
      ['Translocation is the movement of…', 'Sugars in the phloem', ['Water in the xylem', 'Air through stomata', 'Minerals into roots']],
      ['What controls the opening of stomata?', 'Guard cells', ['Root hairs', 'Xylem', 'Chloroplasts']],
      ['Which increases transpiration?', 'Higher temperature', ['Higher humidity', 'Darkness', 'Less wind']],
      ['Where does most photosynthesis happen?', 'Palisade mesophyll', ['Spongy mesophyll', 'Upper epidermis', 'Xylem']],
    ], terms: [['Transpiration', 'Water loss from leaves'], ['Phloem', 'Tissue carrying dissolved sugars'], ['Stomata', 'Pores in a leaf'], ['Translocation', 'Moving sugars around a plant']] },
  ] },
  { title: 'Infection and response', desc: 'Pathogens, defences and medicines', lessons: [
    { title: 'Pathogens and disease', qs: [
      ['Which disease is caused by a virus?', 'Measles', ['Salmonella', 'Malaria', 'Gonorrhoea']],
      ['How is malaria spread?', 'By mosquitoes (a vector)', ['Through the air', 'In contaminated water', 'By touching'], 'It is caused by a protist.'],
      ['Which disease is treated with antibiotics?', 'Gonorrhoea', ['HIV', 'Measles', 'Tobacco mosaic virus'], 'Antibiotics kill bacteria, not viruses.'],
      ['Tobacco mosaic virus stops plants…', 'Photosynthesising well', ['Taking in water', 'Making seeds', 'Growing roots']],
      ['Rose black spot is caused by a…', 'Fungus', ['Virus', 'Bacterium', 'Protist']],
    ], terms: [['Pathogen', 'Microorganism that causes disease'], ['Vector', 'Animal that spreads a pathogen'], ['Toxin', 'Poison made by bacteria'], ['Communicable', 'Can spread between people']] },
    { title: 'Defences and vaccination', qs: [
      ['How do white blood cells help?', 'Phagocytosis, antibodies and antitoxins', ['They carry oxygen', 'They clot blood', 'They make hormones']],
      ['A vaccine contains…', 'Dead or inactive pathogens', ['Antibiotics', 'Live white blood cells', 'Painkillers']],
      ['Why does vaccination work?', 'White blood cells remember the antigen', ['It kills all bacteria', 'It replaces blood', 'It heats the body']],
      ['Herd immunity means…', 'Most people are immune, so the disease spreads less', ['Only animals are vaccinated', 'Everyone has the disease', 'Antibiotics are shared']],
      ['Which is a non-specific defence?', 'Stomach acid', ['Antibodies', 'Vaccines', 'Memory cells']],
    ], terms: [['Antibody', 'Protein that targets a specific antigen'], ['Antigen', 'Marker on a pathogen\'s surface'], ['Phagocytosis', 'White blood cell engulfing a pathogen'], ['Immunity', 'Body can fight a pathogen quickly']] },
    { title: 'Drugs and drug testing', qs: [
      ['Which drug comes from foxgloves?', 'Digitalis', ['Aspirin', 'Penicillin', 'Insulin'], 'Aspirin comes from willow; penicillin from mould.'],
      ['Who discovered penicillin?', 'Alexander Fleming', ['Louis Pasteur', 'Edward Jenner', 'Charles Darwin']],
      ['Why is a placebo used in a trial?', 'To compare against the real drug', ['To make the drug stronger', 'To save money', 'To find the dose']],
      ['In a double-blind trial…', 'Neither doctors nor patients know who gets the drug', ['Only patients know', 'Everyone knows', 'The drug is tested on cells']],
      ['Why is antibiotic resistance a problem?', 'Bacteria evolve so antibiotics stop working', ['Viruses get stronger', 'People become allergic', 'Antibiotics run out']],
    ], terms: [['Antibiotic', 'Medicine that kills bacteria'], ['Placebo', 'Dummy treatment with no drug'], ['Double-blind trial', 'No one knows who gets the real drug'], ['Painkiller', 'Treats symptoms, not the cause']] },
  ] },
  { title: 'Photosynthesis and respiration', desc: 'How organisms get energy', lessons: [
    { title: 'Photosynthesis', qs: [
      ['What is the word equation for photosynthesis?', 'Carbon dioxide + water → glucose + oxygen', ['Glucose + oxygen → carbon dioxide + water', 'Oxygen + water → glucose', 'Glucose → ethanol + carbon dioxide']],
      ['Photosynthesis is…', 'Endothermic', ['Exothermic', 'Neutral', 'Done in mitochondria']],
      ['Which is a limiting factor?', 'Light intensity', ['Oxygen level', 'Leaf colour', 'Soil type']],
      ['Light intensity follows the…', 'Inverse square law', ['Square law', 'Linear law', 'Double rule'], 'Halving the distance gives four times the intensity.'],
      ['Plants use glucose to make…', 'Starch, cellulose and proteins', ['Oxygen only', 'Chlorophyll only', 'Carbon dioxide']],
    ], terms: [['Chlorophyll', 'Green pigment that absorbs light'], ['Limiting factor', 'Thing that stops a rate going faster'], ['Endothermic', 'Takes in energy'], ['Cellulose', 'Makes plant cell walls']] },
    { title: 'Respiration and exercise', qs: [
      ['Aerobic respiration produces…', 'Carbon dioxide and water', ['Lactic acid', 'Ethanol', 'Oxygen']],
      ['Anaerobic respiration in muscles makes…', 'Lactic acid', ['Ethanol', 'Oxygen', 'Glucose']],
      ['Anaerobic respiration in yeast is called…', 'Fermentation', ['Photosynthesis', 'Diffusion', 'Digestion'], 'It makes ethanol and carbon dioxide.'],
      ['Oxygen debt is…', 'Oxygen needed to break down lactic acid', ['Oxygen stored in lungs', 'Oxygen in the blood', 'Oxygen you breathe out']],
      ['Metabolism is…', 'All the reactions in a cell or body', ['Only respiration', 'Only digestion', 'Body temperature']],
    ], terms: [['Aerobic', 'Respiration using oxygen'], ['Anaerobic', 'Respiration without oxygen'], ['Fermentation', 'Anaerobic respiration in yeast'], ['Oxygen debt', 'Extra oxygen needed after exercise']] },
  ] },
  { title: 'Homeostasis and response', desc: 'Nerves, hormones and control', lessons: [
    { title: 'The nervous system', qs: [
      ['What is the correct order of a reflex arc?', 'Receptor → sensory → relay → motor → effector', ['Effector → motor → relay → receptor', 'Brain → receptor → effector', 'Motor → sensory → effector']],
      ['Why are reflexes fast?', 'They bypass the conscious brain', ['They use hormones', 'They use the blood', 'They are learnt']],
      ['What is a synapse?', 'A gap between neurones', ['A type of hormone', 'A muscle', 'A receptor']],
      ['How does a signal cross a synapse?', 'Chemicals diffuse across the gap', ['Electricity jumps', 'Blood carries it', 'It is pushed by muscles']],
      ['Which part of the brain controls balance?', 'Cerebellum', ['Cerebrum', 'Medulla', 'Pituitary'], 'The medulla controls heart rate and breathing.'],
    ], terms: [['Homeostasis', 'Keeping internal conditions stable'], ['Receptor', 'Detects a stimulus'], ['Effector', 'Muscle or gland that responds'], ['Synapse', 'Gap between two neurones']] },
    { title: 'Hormones and blood glucose', qs: [
      ['Which gland releases insulin?', 'Pancreas', ['Pituitary', 'Thyroid', 'Adrenal']],
      ['What does insulin do?', 'Lowers blood glucose', ['Raises blood glucose', 'Speeds up the heart', 'Controls growth']],
      ['Type 1 diabetes is when…', 'The pancreas makes too little insulin', ['Cells ignore insulin', 'Glucagon is missing', 'The liver stores too much']],
      ['Which gland is the "master gland"?', 'Pituitary', ['Pancreas', 'Ovary', 'Adrenal']],
      ['Adrenaline prepares the body for…', 'Fight or flight', ['Sleep', 'Digestion', 'Growth']],
    ], terms: [['Hormone', 'Chemical messenger in the blood'], ['Insulin', 'Hormone that lowers blood glucose'], ['Glucagon', 'Hormone that raises blood glucose'], ['Negative feedback', 'Change triggers a response that reverses it']] },
    { title: 'Reproductive hormones', qs: [
      ['Which hormone causes eggs to mature?', 'FSH', ['Oestrogen', 'Testosterone', 'Insulin']],
      ['Which hormone triggers ovulation?', 'LH', ['FSH', 'Progesterone', 'Adrenaline']],
      ['Which hormone keeps the uterus lining thick?', 'Progesterone', ['FSH', 'LH', 'Testosterone']],
      ['How does the pill prevent pregnancy?', 'Hormones stop eggs maturing', ['It kills sperm', 'It blocks the uterus', 'It speeds up periods']],
      ['IVF stands for…', 'In vitro fertilisation', ['Internal vein feeding', 'In vivo fertilisation', 'Inherited variation factor']],
    ], terms: [['Oestrogen', 'Main female hormone'], ['Testosterone', 'Main male hormone'], ['Ovulation', 'Release of an egg'], ['Contraception', 'Prevents pregnancy']] },
  ] },
  { title: 'Inheritance and evolution', desc: 'DNA, genetics and natural selection', lessons: [
    { title: 'DNA and meiosis', qs: [
      ['Meiosis makes…', 'Four genetically different gametes', ['Two identical cells', 'Body cells', 'One gamete']],
      ['How many chromosomes in a human gamete?', '23', ['46', '92', '12']],
      ['DNA is a…', 'Double helix', ['Single strand', 'Triple ring', 'Straight chain']],
      ['A gene codes for…', 'A particular protein', ['A whole organism', 'A cell wall', 'A chromosome']],
      ['Which is an advantage of asexual reproduction?', 'Only one parent is needed', ['It creates variation', 'It needs two gametes', 'It is slower']],
    ], terms: [['Gamete', 'Sex cell'], ['Genome', 'All the genetic material of an organism'], ['Chromosome', 'Long coiled DNA molecule'], ['Meiosis', 'Division that makes gametes']] },
    { title: 'Genetic crosses', qs: [
      ['Two Bb parents: chance of a bb child?', '25%', ['50%', '75%', '0%']],
      ['A dominant allele is shown…', 'Whenever it is present', ['Only with two copies', 'Never', 'Only in males']],
      ['Cystic fibrosis is caused by a…', 'Recessive allele', ['Dominant allele', 'Virus', 'Missing chromosome']],
      ['Polydactyly is caused by a…', 'Dominant allele', ['Recessive allele', 'Bacterium', 'Diet']],
      ['Sex chromosomes in a male are…', 'XY', ['XX', 'YY', 'XXY']],
    ], terms: [['Allele', 'Version of a gene'], ['Genotype', 'The alleles you have'], ['Phenotype', 'The characteristic you show'], ['Homozygous', 'Two identical alleles']] },
    { title: 'Evolution and selection', qs: [
      ['Who proposed evolution by natural selection?', 'Charles Darwin', ['Gregor Mendel', 'Louis Pasteur', 'Isaac Newton']],
      ['Natural selection means…', 'The best-adapted survive and pass on genes', ['All organisms survive', 'Animals choose mates only', 'Genes never change']],
      ['Selective breeding is when…', 'Humans choose parents with useful traits', ['Nature chooses', 'Genes are cut out', 'Animals are cloned']],
      ['Genetic engineering means…', 'Moving a gene from one organism to another', ['Breeding two dogs', 'Making a vaccine', 'Cloning a plant from cuttings']],
      ['Fossils are evidence of…', 'Evolution over time', ['Photosynthesis', 'Digestion', 'Climate today']],
    ], terms: [['Mutation', 'Change in DNA'], ['Natural selection', 'Better-adapted organisms survive and breed'], ['Extinction', 'No individuals of a species remain'], ['Speciation', 'Formation of a new species']] },
  ] },
  { title: 'Ecology', desc: 'Ecosystems, cycles and biodiversity', lessons: [
    { title: 'Ecosystems and adaptations', qs: [
      ['A community is…', 'All the populations in a habitat', ['One species', 'Only the plants', 'The non-living factors']],
      ['Which is an abiotic factor?', 'Temperature', ['Predators', 'Disease', 'Competition']],
      ['Extremophiles live in…', 'Extreme conditions', ['Only oceans', 'Only forests', 'Human cells']],
      ['Animals compete for…', 'Food, mates and territory', ['Light only', 'Carbon dioxide', 'Minerals only']],
      ['A camel\'s hump stores…', 'Fat', ['Water', 'Oxygen', 'Salt']],
    ], terms: [['Ecosystem', 'Living things plus their environment'], ['Abiotic', 'Non-living factor'], ['Biotic', 'Living factor'], ['Interdependence', 'Species depend on each other']] },
    { title: 'Food chains and sampling', qs: [
      ['Producers make food by…', 'Photosynthesis', ['Eating others', 'Decomposing', 'Respiring only']],
      ['What is a quadrat used for?', 'Sampling plants or slow animals', ['Measuring light', 'Catching birds', 'Measuring rain']],
      ['If predators increase, prey usually…', 'Decrease', ['Increase', 'Stay the same', 'Become producers']],
      ['Why is little energy passed up a food chain?', 'Energy is lost as heat and waste', ['Animals stop eating', 'Plants hide energy', 'Energy is created']],
      ['A transect is used to…', 'See how distribution changes across an area', ['Count one plant', 'Measure soil pH', 'Catch insects']],
    ], terms: [['Producer', 'Makes its own food'], ['Consumer', 'Eats other organisms'], ['Quadrat', 'Square frame for sampling'], ['Biomass', 'Mass of living material']] },
    { title: 'Cycles and biodiversity', qs: [
      ['Which process removes carbon dioxide from the air?', 'Photosynthesis', ['Respiration', 'Combustion', 'Decay']],
      ['Decomposers are mainly…', 'Bacteria and fungi', ['Plants', 'Mammals', 'Birds']],
      ['Biodiversity is…', 'The variety of species in an area', ['The number of trees', 'The size of an animal', 'Rainfall']],
      ['Deforestation increases…', 'Carbon dioxide in the air', ['Biodiversity', 'Oxygen levels', 'Peat bogs']],
      ['Which helps protect biodiversity?', 'Breeding programmes and hedgerows', ['Monocultures', 'Burning peat', 'More landfill']],
    ], terms: [['Decomposer', 'Breaks down dead matter'], ['Biodiversity', 'Variety of living things'], ['Global warming', 'Rise in Earth\'s average temperature'], ['Deforestation', 'Cutting down forests']] },
  ] },
];

export const CHEMISTRY = [
  { title: 'Atomic structure and the periodic table', desc: 'Atoms, isotopes and groups', lessons: [
    { title: 'Atoms and isotopes', qs: [
      ['Relative mass of a proton?', '1', ['0', '1/2000', '2'], 'Neutrons also have mass 1; electrons are almost 0.'],
      ['Isotopes have the same number of protons but different numbers of…', 'Neutrons', ['Electrons', 'Protons', 'Shells']],
      ['Who discovered the nucleus with the gold foil experiment?', 'Rutherford', ['Dalton', 'Thomson', 'Bohr']],
      ['Thomson\'s model of the atom was the…', 'Plum pudding model', ['Nuclear model', 'Solid sphere', 'Electron cloud']],
      ['Electron arrangement of sodium (11)?', '2,8,1', ['2,9', '8,2,1', '2,8,2']],
    ], terms: [['Isotope', 'Same protons, different neutrons'], ['Atomic number', 'Number of protons'], ['Mass number', 'Protons plus neutrons'], ['Ion', 'Charged atom']] },
    { title: 'The periodic table', qs: [
      ['Group 1 metals are called…', 'Alkali metals', ['Halogens', 'Noble gases', 'Transition metals']],
      ['Why do group 1 metals get more reactive down the group?', 'The outer electron is further from the nucleus', ['They have more protons only', 'They are heavier', 'They have full shells']],
      ['Halogens get … reactive going down the group.', 'less', ['more', 'equally', 'randomly']],
      ['Why are noble gases unreactive?', 'They have full outer shells', ['They are metals', 'They have no electrons', 'They are liquids']],
      ['Mendeleev left gaps in his table for…', 'Undiscovered elements', ['Mistakes', 'Gases', 'Compounds']],
    ], terms: [['Group', 'Column of the periodic table'], ['Period', 'Row of the periodic table'], ['Halogen', 'Group 7 element'], ['Noble gas', 'Group 0 element']] },
    { title: 'Mixtures and separation', qs: [
      ['How do you separate sand from water?', 'Filtration', ['Distillation', 'Chromatography', 'Crystallisation']],
      ['Which separates liquids with different boiling points?', 'Fractional distillation', ['Filtration', 'Magnetism', 'Evaporation only']],
      ['Rf value = distance moved by spot ÷ …', 'distance moved by solvent', ['spot size', 'paper length', 'time']],
      ['A pure substance has…', 'A sharp melting point', ['A range of melting points', 'Several colours', 'No boiling point']],
      ['A formulation is…', 'A mixture designed for a purpose', ['A pure element', 'A single compound', 'A type of atom']],
    ], terms: [['Mixture', 'Substances not chemically joined'], ['Compound', 'Elements chemically bonded'], ['Chromatography', 'Separates dissolved substances'], ['Distillation', 'Separates a liquid by boiling and condensing']] },
  ] },
  { title: 'Bonding and structure', desc: 'Ionic, covalent and metallic', lessons: [
    { title: 'Ionic bonding', qs: [
      ['Ionic bonds form between…', 'A metal and a non-metal', ['Two non-metals', 'Two metals', 'Two noble gases']],
      ['A sodium ion has a charge of…', '+1', ['−1', '+2', '0']],
      ['Why do ionic compounds have high melting points?', 'Strong attraction between oppositely charged ions', ['Weak forces between molecules', 'Free electrons', 'They are gases']],
      ['Ionic compounds conduct electricity when…', 'Molten or dissolved', ['Solid', 'Cold', 'Never']],
      ['Formula of magnesium oxide?', 'MgO', ['Mg₂O', 'MgO₂', 'Mg₂O₃']],
    ], terms: [['Ionic bond', 'Attraction between opposite ions'], ['Cation', 'Positive ion'], ['Anion', 'Negative ion'], ['Lattice', 'Regular repeating arrangement']] },
    { title: 'Covalent and metallic structures', qs: [
      ['Why does graphite conduct electricity?', 'It has delocalised electrons', ['It has ions', 'It is a metal', 'It is magnetic']],
      ['Simple molecules have low boiling points because…', 'Forces between molecules are weak', ['Covalent bonds are weak', 'They have ions', 'They are giant']],
      ['Which is a giant covalent structure?', 'Diamond', ['Water', 'Methane', 'Oxygen']],
      ['Why are metals malleable?', 'Layers of atoms can slide', ['They have no electrons', 'They are giant covalent', 'They are brittle']],
      ['Nanoparticles are between…', '1 and 100 nanometres', ['1 and 100 millimetres', '1 and 100 metres', '0.1 and 1 mm']],
    ], terms: [['Covalent bond', 'Shared pair of electrons'], ['Delocalised electrons', 'Electrons free to move'], ['Alloy', 'Mixture of a metal with other elements'], ['Fullerene', 'Hollow carbon molecule']] },
  ] },
  { title: 'Quantitative chemistry', desc: 'Moles, masses and concentration', lessons: [
    { title: 'Moles and masses', qs: [
      ['Relative formula mass of H₂O? (H = 1, O = 16)', '18', ['17', '16', '34']],
      ['Moles = mass ÷ …', 'Mr', ['volume', 'Avogadro\'s number', 'concentration']],
      ['Avogadro\'s constant is…', '6.02 × 10²³', ['3.0 × 10⁸', '9.8', '6.02 × 10⁻²³']],
      ['Conservation of mass means…', 'Total mass stays the same in a reaction', ['Mass always increases', 'Gases have no mass', 'Atoms are destroyed']],
      ['Why might mass seem to drop in a reaction in an open flask?', 'A gas escapes', ['Atoms are destroyed', 'It cools down', 'It gets denser']],
    ], terms: [['Mole', 'Amount containing 6.02 × 10²³ particles'], ['Relative formula mass', 'Sum of relative atomic masses'], ['Limiting reactant', 'Reactant that is used up first'], ['Concentration', 'Amount of solute per volume']] },
    { title: 'Concentration and yield', qs: [
      ['Concentration in g/dm³ = mass ÷ …', 'volume in dm³', ['moles', 'Mr', 'time']],
      ['1 dm³ = …', '1000 cm³', ['100 cm³', '10 cm³', '1 cm³']],
      ['Percentage yield = actual ÷ … × 100', 'theoretical yield', ['atom economy', 'mass of reactants', 'moles']],
      ['A high atom economy means…', 'Little waste product', ['A fast reaction', 'A low yield', 'More energy needed']],
      ['At room temperature, 1 mole of any gas has a volume of…', '24 dm³', ['22.4 cm³', '1 dm³', '100 dm³'], 'Higher tier.'],
    ], terms: [['Yield', 'Amount of product made'], ['Atom economy', 'Percentage of reactant atoms in the useful product'], ['Titration', 'Finds the volume that exactly reacts'], ['Solute', 'Substance that dissolves']] },
  ] },
  { title: 'Chemical changes', desc: 'Reactivity, acids and electrolysis', lessons: [
    { title: 'Reactivity of metals', qs: [
      ['Which is most reactive?', 'Potassium', ['Copper', 'Iron', 'Gold']],
      ['Oxidation is…', 'Gain of oxygen or loss of electrons', ['Loss of oxygen', 'Gain of electrons', 'Adding water']],
      ['Iron is extracted by reduction with…', 'Carbon', ['Electrolysis', 'Oxygen', 'Water']],
      ['A more reactive metal can … a less reactive one from its compound.', 'displace', ['dissolve', 'neutralise', 'reduce to gas']],
      ['OIL RIG stands for…', 'Oxidation is loss, reduction is gain (of electrons)', ['Oxygen in, lead released', 'Only ions lose, reactants gain', 'Oxidation increases, reduction is gone']],
    ], terms: [['Displacement', 'More reactive metal swaps into a compound'], ['Reduction', 'Loss of oxygen or gain of electrons'], ['Ore', 'Rock containing enough metal to extract'], ['Reactivity series', 'Metals in order of reactivity']] },
    { title: 'Acids and salts', qs: [
      ['Acid + metal → salt + …', 'hydrogen', ['water', 'carbon dioxide', 'oxygen']],
      ['Acid + carbonate → salt + water + …', 'carbon dioxide', ['hydrogen', 'oxygen', 'ammonia']],
      ['Hydrochloric acid makes … salts.', 'chloride', ['sulfate', 'nitrate', 'carbonate']],
      ['Which ion makes solutions acidic?', 'H⁺', ['OH⁻', 'Na⁺', 'Cl⁻']],
      ['A strong acid…', 'Fully ionises in water', ['Is always concentrated', 'Partly ionises', 'Has a high pH']],
    ], terms: [['Alkali', 'Soluble base'], ['Neutralisation', 'Acid + base → salt + water'], ['pH scale', 'Measures acidity from 0 to 14'], ['Salt', 'Made when acid hydrogen is replaced by a metal']] },
    { title: 'Electrolysis', qs: [
      ['In electrolysis, positive ions move to the…', 'Cathode (negative electrode)', ['Anode', 'Salt bridge', 'Power pack']],
      ['Electrolysis of molten lead bromide gives…', 'Lead and bromine', ['Lead and hydrogen', 'Oxygen and bromine', 'Water']],
      ['Why is aluminium extracted by electrolysis?', 'It is more reactive than carbon', ['It is cheap', 'It is magnetic', 'It is a liquid']],
      ['Electrolysis of brine produces…', 'Hydrogen, chlorine and sodium hydroxide', ['Sodium and chlorine', 'Oxygen only', 'Water and salt']],
      ['Cryolite is used to…', 'Lower the melting point of aluminium oxide', ['Make it react faster', 'Colour the metal', 'Cool the electrodes']],
    ], terms: [['Electrolysis', 'Splitting a compound using electricity'], ['Electrolyte', 'Liquid or solution that conducts'], ['Anode', 'Positive electrode'], ['Cathode', 'Negative electrode']] },
  ] },
  { title: 'Energy, rates and equilibrium', desc: 'Energy changes and reaction speed', lessons: [
    { title: 'Energy changes', qs: [
      ['An exothermic reaction…', 'Gives out heat', ['Takes in heat', 'Has no energy change', 'Always needs light']],
      ['Which is endothermic?', 'Thermal decomposition', ['Combustion', 'Neutralisation', 'Respiration']],
      ['Activation energy is…', 'Minimum energy needed to react', ['Energy released', 'Energy of products', 'Heat of the room']],
      ['Breaking bonds is…', 'Endothermic', ['Exothermic', 'Neither', 'Only done by catalysts']],
      ['A hydrogen fuel cell produces…', 'Water only', ['Carbon dioxide', 'Methane', 'Smoke']],
    ], terms: [['Exothermic', 'Releases energy'], ['Endothermic', 'Absorbs energy'], ['Activation energy', 'Energy needed to start a reaction'], ['Reaction profile', 'Diagram of energy during a reaction']] },
    { title: 'Rates of reaction', qs: [
      ['Which increases the rate?', 'Higher temperature', ['Larger lumps', 'Lower concentration', 'Removing the catalyst']],
      ['Why does powder react faster than a lump?', 'Larger surface area', ['Higher mass', 'Lower temperature', 'Fewer particles']],
      ['A catalyst…', 'Lowers activation energy', ['Is used up', 'Raises activation energy', 'Changes the products']],
      ['Rate = amount of reactant used ÷ …', 'time', ['mass', 'volume', 'temperature']],
      ['Collision theory says reactions need…', 'Collisions with enough energy', ['Light', 'A catalyst always', 'Water']],
    ], terms: [['Catalyst', 'Speeds up a reaction without being used up'], ['Collision theory', 'Particles must collide with enough energy'], ['Rate', 'How fast reactants are used up'], ['Surface area', 'Total area exposed to react']] },
    { title: 'Reversible reactions', qs: [
      ['The symbol ⇌ means…', 'A reversible reaction', ['A fast reaction', 'An exothermic reaction', 'Electrolysis']],
      ['Dynamic equilibrium happens in a…', 'Closed system', ['Open beaker', 'Vacuum', 'Fire']],
      ['At equilibrium, forward and backward rates are…', 'Equal', ['Zero', 'Different', 'Increasing']],
      ['Le Chatelier\'s principle: a change in conditions makes the position…', 'Shift to oppose the change', ['Stay the same', 'Stop', 'Explode'], 'Higher tier.'],
      ['Heating blue hydrated copper sulfate gives…', 'White anhydrous copper sulfate and water', ['Copper metal', 'Blue gas', 'Sulfuric acid']],
    ], terms: [['Reversible reaction', 'Products can turn back into reactants'], ['Equilibrium', 'Forward and backward rates are equal'], ['Closed system', 'Nothing can get in or out'], ['Hydrated', 'Contains water of crystallisation']] },
  ] },
  { title: 'Organic chemistry and analysis', desc: 'Crude oil, tests and the atmosphere', lessons: [
    { title: 'Crude oil and fuels', qs: [
      ['Alkanes have the general formula…', 'CₙH₂ₙ₊₂', ['CₙH₂ₙ', 'CₙHₙ', 'CₙH₂ₙ₋₂']],
      ['Crude oil is separated by…', 'Fractional distillation', ['Filtration', 'Electrolysis', 'Chromatography']],
      ['Longer hydrocarbons are…', 'More viscous', ['More flammable', 'Lower boiling', 'Gases']],
      ['Cracking produces…', 'Shorter alkanes and alkenes', ['Crude oil', 'Water', 'Longer chains']],
      ['Bromine water with an alkene turns…', 'Colourless', ['Orange', 'Blue', 'Milky']],
    ], terms: [['Hydrocarbon', 'Contains hydrogen and carbon only'], ['Alkene', 'Hydrocarbon with a C=C double bond'], ['Cracking', 'Breaking long hydrocarbons'], ['Viscosity', 'How thick a liquid is']] },
    { title: 'Chemical tests', qs: [
      ['Hydrogen gives a…', 'Squeaky pop with a lit splint', ['Relit glowing splint', 'Milky limewater', 'Bleached litmus']],
      ['Oxygen…', 'Relights a glowing splint', ['Gives a squeaky pop', 'Turns limewater milky', 'Bleaches litmus']],
      ['Carbon dioxide turns limewater…', 'Milky', ['Blue', 'Red', 'Clear']],
      ['Chlorine…', 'Bleaches damp litmus paper', ['Relights a splint', 'Turns limewater milky', 'Pops']],
      ['Lithium ions give a … flame.', 'crimson', ['yellow', 'lilac', 'green']],
    ], terms: [['Flame test', 'Identifies metal ions by flame colour'], ['Precipitate', 'Solid formed in a solution'], ['Limewater', 'Tests for carbon dioxide'], ['Instrumental analysis', 'Using machines to identify substances']] },
    { title: 'Atmosphere and resources', qs: [
      ['Today\'s air is about 78% …', 'nitrogen', ['oxygen', 'carbon dioxide', 'argon']],
      ['Which is a greenhouse gas?', 'Methane', ['Nitrogen', 'Oxygen', 'Argon']],
      ['Incomplete combustion produces…', 'Carbon monoxide and soot', ['Only water', 'Oxygen', 'Nitrogen']],
      ['Potable water is…', 'Safe to drink', ['Pure H₂O', 'Sea water', 'Waste water']],
      ['A life cycle assessment looks at…', 'Environmental impact from start to end', ['Only the price', 'Only recycling', 'Only the factory']],
    ], terms: [['Greenhouse effect', 'Gases trap heat in the atmosphere'], ['Carbon footprint', 'Total greenhouse gas from an activity'], ['Potable water', 'Water safe to drink'], ['Finite resource', 'Will run out']] },
  ] },
];

export const PHYSICS = [
  { title: 'Energy', desc: 'Stores, power and efficiency', lessons: [
    { title: 'Energy stores and equations', qs: [
      ['Kinetic energy = ½ × m × …', 'v²', ['v', 'g', 'h']],
      ['Gravitational potential energy = m × g × …', 'h', ['v²', 'a', 't']],
      ['Elastic potential energy = ½ × k × …', 'e²', ['e', 'k²', 'm']],
      ['Specific heat capacity is energy needed to raise 1 kg by…', '1 °C', ['100 °C', '1 K per second', 'its melting point']],
      ['Energy is measured in…', 'Joules', ['Watts', 'Newtons', 'Volts']],
    ], terms: [['Kinetic energy', 'Energy of movement'], ['Specific heat capacity', 'Energy to warm 1 kg by 1 °C'], ['Conservation of energy', 'Energy cannot be created or destroyed'], ['System', 'An object or group of objects']] },
    { title: 'Power and efficiency', qs: [
      ['Power = energy ÷ …', 'time', ['force', 'mass', 'distance']],
      ['1 watt is…', '1 joule per second', ['1 newton per metre', '1 volt per amp', '1 joule per kilogram']],
      ['Efficiency = useful output ÷ …', 'total input', ['wasted energy', 'time', 'power']],
      ['How can you reduce unwanted energy transfer in a house?', 'Insulation', ['Opening windows', 'Thinner walls', 'Metal frames']],
      ['Which energy resource is renewable?', 'Wind', ['Coal', 'Natural gas', 'Uranium']],
    ], terms: [['Power', 'Rate of energy transfer'], ['Efficiency', 'Useful output ÷ total input'], ['Renewable', 'Will not run out'], ['Thermal conductivity', 'How well a material conducts heat']] },
  ] },
  { title: 'Electricity', desc: 'Circuits, power and the grid', lessons: [
    { title: 'Current, potential difference and resistance', qs: [
      ['V = I × …', 'R', ['P', 't', 'Q']],
      ['Charge = current × …', 'time', ['voltage', 'resistance', 'power']],
      ['As a filament lamp gets hotter, its resistance…', 'Increases', ['Decreases', 'Stays the same', 'Becomes zero']],
      ['A thermistor\'s resistance falls when…', 'Temperature rises', ['Light falls', 'Current stops', 'It gets colder']],
      ['A diode lets current flow…', 'In one direction only', ['Both ways', 'Only when cold', 'Never']],
    ], terms: [['Current', 'Rate of flow of charge'], ['Potential difference', 'Energy transferred per unit charge'], ['Resistance', 'Opposition to current'], ['LDR', 'Resistance falls as light increases']] },
    { title: 'Series and parallel circuits', qs: [
      ['In a series circuit, the current is…', 'The same everywhere', ['Split between branches', 'Zero', 'Different in each part']],
      ['In parallel, the potential difference across each branch is…', 'The same as the supply', ['Shared out', 'Zero', 'Doubled']],
      ['Total resistance in series =', 'R₁ + R₂', ['R₁ × R₂', 'R₁ − R₂', 'Less than either']],
      ['Adding resistors in parallel makes the total resistance…', 'Smaller', ['Bigger', 'The same', 'Infinite']],
      ['An ammeter is connected in…', 'Series', ['Parallel', 'Either', 'Neither']],
    ], terms: [['Series circuit', 'Components in one loop'], ['Parallel circuit', 'Components on separate branches'], ['Ammeter', 'Measures current'], ['Voltmeter', 'Measures potential difference']] },
    { title: 'Mains electricity and power', qs: [
      ['UK mains electricity is…', '230 V, 50 Hz ac', ['12 V dc', '110 V, 60 Hz', '230 V dc']],
      ['Which wire is green and yellow?', 'Earth', ['Live', 'Neutral', 'Fuse']],
      ['P = I × …', 'V', ['R', 't', 'Q']],
      ['Why does the National Grid use high voltages?', 'Less energy is lost as heat', ['It is safer at home', 'Cables are thinner for looks', 'It speeds up electricity']],
      ['A step-down transformer…', 'Decreases the voltage', ['Increases the voltage', 'Makes dc', 'Stores charge']],
    ], terms: [['Alternating current', 'Current that keeps changing direction'], ['Live wire', 'Brown wire at 230 V'], ['Earth wire', 'Safety wire, green and yellow'], ['National Grid', 'Network that carries electricity across the country']] },
  ] },
  { title: 'Particles and atoms', desc: 'Density, states and radiation', lessons: [
    { title: 'Particle model', qs: [
      ['Density = mass ÷ …', 'volume', ['area', 'weight', 'time']],
      ['Specific latent heat is energy needed to…', 'Change the state of 1 kg', ['Raise 1 kg by 1 °C', 'Melt any mass', 'Boil water']],
      ['During melting, temperature…', 'Stays the same', ['Rises quickly', 'Falls', 'Doubles']],
      ['Gas pressure is caused by…', 'Particles colliding with the walls', ['Particles stopping', 'Heat leaving', 'Gravity only']],
      ['Heating a gas in a sealed container makes pressure…', 'Increase', ['Decrease', 'Stay the same', 'Reach zero']],
    ], terms: [['Density', 'Mass per unit volume'], ['Internal energy', 'Total kinetic and potential energy of particles'], ['Latent heat', 'Energy to change state'], ['Sublimation', 'Solid straight to gas']] },
    { title: 'Radioactivity', qs: [
      ['Which radiation is most ionising?', 'Alpha', ['Beta', 'Gamma', 'Radio waves']],
      ['Which radiation passes through paper but is stopped by a few mm of aluminium?', 'Beta', ['Alpha', 'Gamma', 'Radio waves'], 'Alpha is stopped by paper; gamma needs thick lead or concrete.'],
      ['Half-life is the time for…', 'Half the nuclei to decay', ['All the atoms to decay', 'The sample to double', 'One atom to decay']],
      ['Alpha particles are…', 'Two protons and two neutrons', ['Electrons', 'Electromagnetic waves', 'Single protons']],
      ['Contamination means…', 'Radioactive atoms get onto or into an object', ['Being near a source', 'Being hit by gamma rays only', 'Radiation being stopped']],
    ], terms: [['Half-life', 'Time for activity to halve'], ['Irradiation', 'Exposure to radiation'], ['Ionising', 'Knocks electrons off atoms'], ['Background radiation', 'Radiation around us all the time']] },
  ] },
  { title: 'Forces and motion', desc: 'Newton\'s laws, motion and momentum', lessons: [
    { title: 'Forces and Newton\'s laws', qs: [
      ['Weight = mass × …', 'gravitational field strength', ['acceleration only', 'speed', 'height']],
      ['F = m × …', 'a', ['v', 'g', 't']],
      ['Newton\'s first law: with no resultant force, an object…', 'Stays still or keeps moving at constant velocity', ['Always stops', 'Speeds up', 'Falls']],
      ['Newton\'s third law: forces come in…', 'Equal and opposite pairs', ['Threes', 'Unequal pairs', 'One direction']],
      ['Work done = force × …', 'distance', ['time', 'mass', 'speed']],
    ], terms: [['Resultant force', 'Overall force on an object'], ['Scalar', 'Has size only'], ['Vector', 'Has size and direction'], ['Inertia', 'Tendency to keep moving the same way']] },
    { title: 'Motion and stopping distance', qs: [
      ['Speed = distance ÷ …', 'time', ['mass', 'force', 'acceleration']],
      ['Acceleration = change in velocity ÷ …', 'time', ['distance', 'mass', 'force']],
      ['The gradient of a distance-time graph shows…', 'Speed', ['Acceleration', 'Distance', 'Force']],
      ['Stopping distance = thinking distance + …', 'braking distance', ['reaction time', 'speed', 'road length']],
      ['Which increases thinking distance?', 'Tiredness', ['Icy roads', 'Worn tyres', 'Bad brakes']],
    ], terms: [['Velocity', 'Speed in a given direction'], ['Acceleration', 'Rate of change of velocity'], ['Terminal velocity', 'Constant top speed when forces balance'], ['Braking distance', 'Distance travelled while braking']] },
    { title: 'Momentum and springs', qs: [
      ['Momentum = mass × …', 'velocity', ['acceleration', 'force', 'time']],
      ['In a collision, total momentum is…', 'Conserved', ['Lost', 'Doubled', 'Turned to heat']],
      ['Hooke\'s law: F = k × …', 'e (extension)', ['m', 'a', 'v']],
      ['Air bags reduce injury by…', 'Increasing the time to stop', ['Increasing speed', 'Adding mass', 'Removing momentum instantly']],
      ['Moment of a force = force × …', 'perpendicular distance from the pivot', ['mass', 'time', 'area']],
    ], terms: [['Momentum', 'Mass × velocity'], ['Elastic deformation', 'Returns to its original shape'], ['Limit of proportionality', 'Point where Hooke\'s law stops'], ['Moment', 'Turning effect of a force']] },
  ] },
  { title: 'Waves, magnetism and space', desc: 'Light, sound, motors and stars', lessons: [
    { title: 'Waves', qs: [
      ['Wave speed = frequency × …', 'wavelength', ['amplitude', 'period', 'time']],
      ['Sound waves are…', 'Longitudinal', ['Transverse', 'Electromagnetic', 'Not waves']],
      ['Which EM wave has the shortest wavelength?', 'Gamma rays', ['Radio waves', 'Visible light', 'Microwaves']],
      ['Which EM wave is used in thermal imaging?', 'Infrared', ['Ultraviolet', 'X-rays', 'Radio']],
      ['Refraction happens because waves…', 'Change speed in a new medium', ['Bounce off', 'Lose all energy', 'Stop moving']],
    ], terms: [['Amplitude', 'Maximum displacement from rest'], ['Frequency', 'Waves passing a point per second'], ['Transverse', 'Vibrations at right angles to travel'], ['Refraction', 'Change of direction at a boundary']] },
    { title: 'Magnetism', qs: [
      ['Like poles…', 'Repel', ['Attract', 'Do nothing', 'Cancel out']],
      ['A wire carrying current produces…', 'A magnetic field', ['An electric field only', 'Light', 'Sound']],
      ['How can you make an electromagnet stronger?', 'More turns or more current', ['Fewer turns', 'A plastic core', 'Less current']],
      ['Fleming\'s left-hand rule finds the direction of…', 'The force on a wire', ['The current only', 'The magnetic field only', 'Light']],
      ['F = B × I × …', 'l', ['m', 'v', 't']],
    ], terms: [['Magnetic field', 'Area where a magnetic force acts'], ['Induced magnet', 'Becomes magnetic in a field'], ['Solenoid', 'Coil of wire'], ['Motor effect', 'Force on a current-carrying wire in a field']] },
    { title: 'Space physics', qs: [
      ['Our Sun is in its…', 'Main sequence stage', ['Red giant stage', 'White dwarf stage', 'Protostar stage']],
      ['What will a star much bigger than the Sun become after a supernova?', 'A neutron star or black hole', ['A white dwarf', 'A red dwarf', 'A planet']],
      ['What keeps planets in orbit?', 'Gravity', ['Magnetism', 'Friction', 'Solar wind']],
      ['Red-shift suggests the universe is…', 'Expanding', ['Shrinking', 'Not moving', 'Rotating only']],
      ['Which theory says the universe began from a tiny, hot point?', 'Big Bang theory', ['Steady State theory', 'Plate tectonics', 'Natural selection']],
    ], terms: [['Red-shift', 'Light from distant galaxies is stretched'], ['Supernova', 'Explosion of a massive star'], ['Orbit', 'Curved path around another object'], ['Nebula', 'Cloud of dust and gas']] },
  ] },
];
