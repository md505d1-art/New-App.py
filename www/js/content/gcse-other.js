// More GCSE content for every other subject (added after each subject's starter unit).
// Question: [question, answer, [wrong answers], optional explanation]. Terms: [term, short definition].

export const MORE = {
  compsci: [
    { title: 'Data representation', desc: 'Binary, hex, images, sound and compression', lessons: [
      { title: 'Binary and hexadecimal', qs: [
        ['What is 1011 in denary?', '11', ['13', '9', '1011']],
        ['What is 255 in binary?', '11111111', ['10000000', '11111110', '100000000']],
        ['What is the hex digit for 12?', 'C', ['B', 'D', '12']],
        ['What is 1F in denary?', '31', ['15', '115', '25']],
        ['A binary shift left by 1 place…', 'Doubles the number', ['Halves it', 'Adds 1', 'Makes it negative']],
      ], terms: [['Bit', 'A single 0 or 1'], ['Byte', '8 bits'], ['Nibble', '4 bits'], ['Overflow', 'Result too big to store in the bits available']] },
      { title: 'Images, sound and compression', qs: [
        ['Image file size = width × height × …', 'colour depth', ['sample rate', 'resolution only', 'frame rate']],
        ['A higher sample rate gives…', 'Better quality sound and a bigger file', ['Smaller files', 'Lower quality', 'No change']],
        ['Lossy compression…', 'Permanently removes some data', ['Keeps all data', 'Makes files bigger', 'Only works on text']],
        ['Run length encoding is…', 'Lossless', ['Lossy', 'Encryption', 'A type of virus']],
        ['ASCII uses how many bits per character (standard)?', '7', ['8', '16', '32']],
      ], terms: [['Pixel', 'Single dot of colour in an image'], ['Colour depth', 'Bits per pixel'], ['Sample rate', 'Samples of sound taken per second'], ['Huffman coding', 'Lossless compression using a tree']] },
    ] },
    { title: 'Systems, networks and security', desc: 'CPU, memory, networks and threats', lessons: [
      { title: 'The CPU and memory', qs: [
        ['The fetch-decode-execute cycle is carried out by the…', 'CPU', ['Hard drive', 'Monitor', 'RAM']],
        ['Which register holds the address of the next instruction?', 'Program counter', ['Accumulator', 'MDR', 'Cache']],
        ['RAM is…', 'Volatile', ['Non-volatile', 'Read-only', 'Secondary storage']],
        ['Cache memory is…', 'Small, very fast memory near the CPU', ['A type of hard drive', 'Slow storage', 'Cloud storage']],
        ['Which is solid-state storage?', 'SSD', ['HDD', 'Blu-ray', 'Magnetic tape']],
      ], terms: [['Von Neumann architecture', 'Instructions and data stored in the same memory'], ['ALU', 'Does arithmetic and logic'], ['Clock speed', 'Cycles per second'], ['Virtual memory', 'Using storage as extra RAM']] },
      { title: 'Networks', qs: [
        ['A LAN covers…', 'A small area like a school', ['The whole world', 'A country', 'Satellites only']],
        ['Which device sends data to the right device on a LAN?', 'Switch', ['Router', 'Modem', 'Monitor']],
        ['TCP/IP layers include application, transport, internet and…', 'Link', ['Physical', 'Cloud', 'Session']],
        ['In a star topology, each device connects to a…', 'Central switch', ['Ring', 'Single cable', 'Bus']],
        ['Which protocol is used to send email?', 'SMTP', ['HTTP', 'FTP', 'IMAP']],
      ], terms: [['Protocol', 'Set of rules for communication'], ['IP address', 'Unique address on a network'], ['MAC address', 'Unique hardware address'], ['Bandwidth', 'Amount of data sent per second']] },
      { title: 'Cyber security', qs: [
        ['Phishing is…', 'Fake messages tricking people into giving details', ['A virus that copies itself', 'Guessing every password', 'Watching over someone\'s shoulder']],
        ['A brute-force attack…', 'Tries every possible password', ['Uses fake emails', 'Floods a server', 'Spies with cameras']],
        ['SQL injection targets…', 'Databases through input boxes', ['Printers', 'Monitors', 'Power supplies']],
        ['Which helps protect against malware?', 'Anti-malware software and updates', ['Sharing passwords', 'Turning off firewalls', 'Opening attachments']],
        ['Penetration testing is…', 'Testing a system by trying to break in legally', ['A type of virus', 'Backing up files', 'Encrypting data']],
      ], terms: [['Malware', 'Malicious software'], ['Firewall', 'Blocks unauthorised network traffic'], ['Encryption', 'Scrambling data so only the key can read it'], ['Social engineering', 'Tricking people into giving access']] },
    ] },
    { title: 'Algorithms and programming in depth', desc: 'Searching, sorting, logic and SQL', lessons: [
      { title: 'Searching and sorting', qs: [
        ['A binary search needs the list to be…', 'Sorted', ['Unsorted', 'Short', 'Numbers only']],
        ['Which sort repeatedly swaps adjacent items?', 'Bubble sort', ['Merge sort', 'Insertion sort', 'Binary sort']],
        ['Merge sort works by…', 'Splitting the list then merging in order', ['Swapping neighbours', 'Searching the middle', 'Guessing']],
        ['Linear search checks…', 'Each item in turn', ['The middle item first', 'Only the last item', 'Random items']],
        ['Abstraction means…', 'Removing unnecessary detail', ['Breaking into parts', 'Writing code', 'Testing']],
      ], terms: [['Algorithm', 'Step-by-step instructions'], ['Decomposition', 'Breaking a problem into smaller parts'], ['Abstraction', 'Removing unneeded detail'], ['Trace table', 'Tracks variable values step by step']] },
      { title: 'Logic, testing and SQL', qs: [
        ['An AND gate outputs 1 when…', 'Both inputs are 1', ['Either input is 1', 'Both inputs are 0', 'Inputs differ']],
        ['NOT 1 = ?', '0', ['1', '2', '10']],
        ['Which SQL keyword chooses which rows?', 'WHERE', ['SELECT', 'FROM', 'TABLE']],
        ['Testing with data just inside and outside limits is…', 'Boundary testing', ['Normal testing', 'Syntax testing', 'Random testing']],
        ['A syntax error is…', 'Code that breaks the language rules', ['Wrong output but runs', 'A slow program', 'A hardware fault']],
      ], terms: [['Iteration', 'Repeating code (loops)'], ['Selection', 'Choosing a path (if)'], ['Syntax error', 'Breaks language rules'], ['Logic error', 'Runs but gives the wrong result']] },
    ] },
    { title: 'Impacts of technology', desc: 'Ethics, law and the environment', lessons: [
      { title: 'Ethical, legal and environmental issues', qs: [
        ['Which law makes hacking illegal?', 'Computer Misuse Act 1990', ['Data Protection Act', 'Copyright Act', 'Freedom of Information Act']],
        ['The Data Protection Act controls…', 'How personal data is used', ['Hacking', 'Software piracy', 'Internet speed']],
        ['Open source software…', 'Lets users see and change the code', ['Must be paid for', 'Has hidden code', 'Cannot be shared']],
        ['E-waste is a problem because…', 'It contains toxic materials', ['It is too light', 'It is all recyclable', 'It is biodegradable']],
        ['The digital divide is…', 'The gap between people with and without technology', ['A network cable', 'A type of encryption', 'A file format']],
      ], terms: [['Copyright', 'Legal protection of creative work'], ['Proprietary software', 'Closed-source, owned by a company'], ['Digital divide', 'Unequal access to technology'], ['Privacy', 'Control over personal information']] },
    ] },
  ],
  business: [
    { title: 'Starting a business', desc: 'Enterprise, ownership and planning', lessons: [
      { title: 'Enterprise and ownership', qs: [
        ['An entrepreneur…', 'Takes risks to start a business', ['Works for the government', 'Only invests money', 'Never makes decisions']],
        ['Limited liability means…', 'Owners only lose what they invested', ['Owners lose everything', 'No one owns it', 'It cannot borrow']],
        ['A sole trader has…', 'Unlimited liability', ['Shareholders', 'Limited liability', 'A board of directors']],
        ['A franchise lets you…', 'Use an established brand', ['Avoid all fees', 'Never pay tax', 'Own shares']],
        ['A business plan helps to…', 'Get finance and set objectives', ['Avoid tax', 'Hire friends', 'Skip research']],
      ], terms: [['Entrepreneur', 'Person who starts a business'], ['Sole trader', 'Business owned by one person'], ['Partnership', 'Business owned by 2–20 people'], ['Private limited company', 'Ltd, shares sold privately']] },
      { title: 'Market research and location', qs: [
        ['Primary research includes…', 'Surveys and interviews', ['Government statistics', 'Internet articles', 'Newspapers']],
        ['Market segmentation means…', 'Dividing the market into groups', ['Selling shares', 'Lowering prices', 'Closing shops']],
        ['Qualitative data is about…', 'Opinions and feelings', ['Numbers only', 'Profits', 'Dates']],
        ['A market map shows…', 'Where products sit on two features', ['A shop\'s location', 'Delivery routes', 'Staff rotas']],
        ['Which affects business location?', 'Costs, labour and the market', ['The owner\'s birthday', 'Logos', 'Colours']],
      ], terms: [['Market research', 'Finding out about customers and competitors'], ['Primary research', 'New data you collect'], ['Secondary research', 'Data already collected'], ['Segmentation', 'Splitting customers into groups']] },
    ] },
    { title: 'Marketing, people and operations', desc: 'The 4 Ps, staff and production', lessons: [
      { title: 'The marketing mix', qs: [
        ['The 4 Ps are product, price, place and…', 'Promotion', ['People', 'Profit', 'Planning']],
        ['Penetration pricing means…', 'A low price to enter a market', ['A high price at launch', 'Copying rivals', 'Free products']],
        ['The product life cycle stage with peak sales is…', 'Maturity', ['Introduction', 'Growth', 'Decline']],
        ['An extension strategy…', 'Keeps a product selling for longer', ['Ends a product', 'Raises costs only', 'Closes a shop']],
        ['E-commerce is…', 'Selling online', ['Selling door to door', 'Wholesale only', 'Advertising on TV']],
      ], terms: [['Marketing mix', 'Product, price, place, promotion'], ['Product life cycle', 'Stages of a product\'s sales'], ['Price skimming', 'High launch price'], ['Brand', 'Name and image of a product']] },
      { title: 'Human resources', qs: [
        ['A flat structure has…', 'Few layers of management', ['Many layers', 'No staff', 'Only managers']],
        ['Span of control is…', 'The number of people a manager is responsible for', ['A manager\'s salary', 'The size of the office', 'Working hours']],
        ['Which is a financial motivator?', 'Bonus', ['Praise', 'Job rotation', 'Teamwork']],
        ['A zero-hours contract means…', 'No guaranteed hours', ['No pay', 'Full-time work', 'Working from home']],
        ['Induction training is for…', 'New staff', ['Managers only', 'Retired staff', 'Customers']],
      ], terms: [['Recruitment', 'Finding and hiring staff'], ['Hierarchy', 'Levels of authority'], ['Motivation', 'The will to work well'], ['Retention', 'Keeping staff']] },
      { title: 'Operations and quality', qs: [
        ['Job production makes…', 'One-off unique items', ['Huge quantities', 'Batches', 'Identical items forever']],
        ['Just-in-time stock means…', 'Stock arrives exactly when needed', ['Holding huge stock', 'Never ordering', 'Buying in bulk']],
        ['Quality assurance checks quality…', 'Throughout production', ['Only at the end', 'Never', 'Only by customers']],
        ['Procurement is…', 'Buying supplies', ['Selling products', 'Hiring staff', 'Advertising']],
        ['Economies of scale mean…', 'Lower average costs as output grows', ['Higher prices', 'Fewer customers', 'More waste']],
      ], terms: [['Batch production', 'Making groups of identical items'], ['Flow production', 'Continuous mass production'], ['Quality control', 'Checking products at the end'], ['Supply chain', 'Steps from raw materials to customers']] },
    ] },
    { title: 'Finance and the wider world', desc: 'Cash flow, break-even and influences', lessons: [
      { title: 'Finance', qs: [
        ['Break-even output = fixed costs ÷ …', 'contribution per unit (price − variable cost)', ['total costs', 'revenue', 'profit']],
        ['Cash flow is…', 'Money coming in and going out', ['Profit', 'Total sales', 'Assets']],
        ['Gross profit = revenue − …', 'cost of sales', ['all expenses', 'tax', 'interest']],
        ['Which is a long-term source of finance?', 'Share capital', ['Overdraft', 'Trade credit', 'Petty cash']],
        ['Average rate of return measures…', 'Profitability of an investment', ['Staff happiness', 'Market share', 'Sales volume']],
      ], terms: [['Fixed costs', 'Do not change with output'], ['Variable costs', 'Change with output'], ['Break-even', 'Revenue equals total costs'], ['Margin of safety', 'Sales above break-even']] },
      { title: 'External influences', qs: [
        ['Higher interest rates usually make borrowing…', 'More expensive', ['Cheaper', 'Free', 'Illegal']],
        ['A stakeholder is…', 'Anyone affected by a business', ['Only the owner', 'Only staff', 'Only customers']],
        ['Globalisation means…', 'Businesses trading across the world', ['Only local trade', 'Closing borders', 'Less competition']],
        ['A weak pound makes UK exports…', 'Cheaper abroad', ['More expensive abroad', 'Illegal', 'Unchanged']],
        ['Consumer law protects…', 'Customers\' rights', ['Only businesses', 'Shareholders', 'Banks']],
      ], terms: [['Stakeholder', 'Group affected by a business'], ['Globalisation', 'World becoming more connected'], ['Exchange rate', 'Value of one currency in another'], ['Ethics', 'Doing what is morally right']] },
    ] },
  ],
  economics: [
    { title: 'Markets and the wider economy', desc: 'Demand, supply and government', lessons: [
      { title: 'Demand, supply and price', qs: [
        ['If price rises, demand usually…', 'Falls', ['Rises', 'Stays the same', 'Doubles']],
        ['A shift in the supply curve to the right means…', 'Supply has increased', ['Supply has fallen', 'Demand has fallen', 'Price is fixed']],
        ['Price elasticity of demand measures…', 'How much demand responds to price', ['How much supply changes', 'Profit', 'Tax']],
        ['A monopoly is…', 'One firm dominating a market', ['Many small firms', 'A government', 'A trade union']],
        ['Opportunity cost is…', 'The next best alternative given up', ['The price paid', 'Tax', 'Profit']],
      ], terms: [['Scarcity', 'Unlimited wants, limited resources'], ['Equilibrium price', 'Where demand equals supply'], ['Opportunity cost', 'Next best alternative forgone'], ['Market failure', 'Markets giving a bad outcome']] },
      { title: 'Government and the economy', qs: [
        ['Inflation is…', 'A general rise in prices', ['Falling prices', 'Rising unemployment', 'Higher taxes']],
        ['Fiscal policy uses…', 'Taxes and government spending', ['Interest rates', 'Exchange rates only', 'Trade unions']],
        ['Monetary policy is set by the…', 'Bank of England', ['Prime Minister', 'Treasury only', 'EU']],
        ['GDP measures…', 'The value of output in a country', ['Population', 'Inflation', 'Unemployment']],
        ['A recession is…', 'Two quarters of falling GDP', ['A rise in prices', 'A tax rise', 'Full employment']],
      ], terms: [['GDP', 'Total value of goods and services'], ['Inflation', 'Rise in the general price level'], ['Fiscal policy', 'Government taxing and spending'], ['Monetary policy', 'Interest rates and money supply']] },
    ] },
  ],
  psychology: [
    { title: 'More psychology topics', desc: 'Perception, development, language and the brain', lessons: [
      { title: 'Perception and development', qs: [
        ['Perception is…', 'How we interpret sensory information', ['Sensation only', 'Memory', 'Sleep']],
        ['Gregory\'s theory says perception is…', 'Top-down, using past experience', ['Purely innate', 'Only bottom-up', 'Random']],
        ['Piaget\'s stage where children lack conservation is…', 'Pre-operational', ['Formal operational', 'Concrete operational', 'Adult']],
        ['A visual illusion like the Müller-Lyer shows…', 'Perception can be misled', ['Eyes are broken', 'Memory is perfect', 'Colour is fixed']],
        ['Dweck\'s growth mindset says ability…', 'Can be developed with effort', ['Is fixed at birth', 'Never changes', 'Is genetic only']],
      ], terms: [['Perceptual set', 'Expecting to see things a certain way'], ['Conservation', 'Knowing quantity stays the same when shape changes'], ['Schema', 'Mental framework of knowledge'], ['Egocentrism', 'Seeing only your own point of view']] },
      { title: 'The brain and mental health', qs: [
        ['Which nervous system controls fight or flight?', 'Sympathetic', ['Parasympathetic', 'Somatic', 'Central']],
        ['The frontal lobe is involved in…', 'Planning and decision making', ['Vision only', 'Hearing only', 'Balance only']],
        ['Depression is often treated with…', 'CBT and/or antidepressants', ['Surgery', 'Antibiotics', 'Ignoring it']],
        ['Neuroplasticity means…', 'The brain can change and adapt', ['The brain never changes', 'Neurones are fixed', 'Memory is lost']],
        ['A clinical interview is used to…', 'Help diagnose mental health conditions', ['Measure height', 'Test eyesight', 'Teach maths']],
      ], terms: [['Neurone', 'Nerve cell'], ['Neurotransmitter', 'Chemical messenger in the brain'], ['CBT', 'Therapy that changes unhelpful thoughts'], ['Stigma', 'Negative attitude towards a group']] },
    ] },
  ],
  sociology: [
    { title: 'More sociology topics', desc: 'Education, crime and stratification', lessons: [
      { title: 'Education and crime', qs: [
        ['The hidden curriculum is…', 'Lessons taught informally, like punctuality', ['The exam syllabus', 'Secret tests', 'Homework only']],
        ['Labelling theory says…', 'Labels can shape behaviour', ['Labels have no effect', 'Crime is genetic', 'Schools are fair']],
        ['Official crime statistics may be inaccurate because…', 'Many crimes go unreported', ['Police record everything', 'Crime never happens', 'They are made up']],
        ['A self-fulfilling prophecy is…', 'A prediction that makes itself come true', ['A school rule', 'A survey', 'A law']],
        ['Marxists see education as…', 'Reproducing class inequality', ['Totally fair', 'Only about skills', 'Unimportant']],
      ], terms: [['Hidden curriculum', 'Unwritten lessons of school'], ['Deviance', 'Breaking social norms'], ['Labelling', 'Giving someone an identity that sticks'], ['Meritocracy', 'Success based on ability and effort']] },
      { title: 'Social stratification', qs: [
        ['Social mobility is…', 'Moving between social classes', ['Moving house', 'Changing jobs only', 'Travelling']],
        ['Life chances are…', 'Opportunities to improve your quality of life', ['Lottery odds', 'Exam results', 'Health only']],
        ['Who wrote about class conflict between bourgeoisie and proletariat?', 'Karl Marx', ['Max Weber', 'Émile Durkheim', 'Ann Oakley']],
        ['Absolute poverty is…', 'Lacking basic needs to survive', ['Being poorer than others', 'Having no car', 'Earning below average']],
        ['Feminists argue society is…', 'Patriarchal', ['Matriarchal', 'Equal', 'Classless']],
      ], terms: [['Stratification', 'Layering of society into groups'], ['Social mobility', 'Moving up or down the class system'], ['Relative poverty', 'Poor compared to the average'], ['Patriarchy', 'Male-dominated society']] },
    ] },
  ],
  citizenship: [
    { title: 'Politics, power and the world', desc: 'Parliament, elections and the UK in the world', lessons: [
      { title: 'Parliament and elections', qs: [
        ['UK general elections use…', 'First past the post', ['Proportional representation', 'Single transferable vote', 'Two-round system']],
        ['Who scrutinises and revises laws after the Commons?', 'The House of Lords', ['The monarch', 'The courts', 'Local councils']],
        ['A bill becomes law after…', 'Royal Assent', ['A referendum', 'A court case', 'A petition']],
        ['The voting age in UK general elections is…', '18', ['16', '21', '17']],
        ['Pressure groups try to…', 'Influence government decisions', ['Win elections', 'Run courts', 'Make laws directly']],
      ], terms: [['Constituency', 'Area represented by an MP'], ['Referendum', 'Vote on a single issue'], ['Devolution', 'Passing powers to Scotland, Wales and NI'], ['Opposition', 'Largest party not in government']] },
      { title: 'The UK and the wider world', qs: [
        ['Which organisation keeps international peace?', 'The United Nations', ['NATO only', 'The EU', 'The Commonwealth']],
        ['The UK left the EU in…', '2020', ['2016', '2019', '2021']],
        ['The Commonwealth is…', 'An association of mostly former British territories', ['A military alliance', 'A trade union', 'A court']],
        ['An NGO is…', 'A non-governmental organisation', ['A government department', 'A political party', 'A court']],
        ['Which court rules on human rights cases from member states?', 'European Court of Human Rights', ['Supreme Court', 'Crown Court', 'Magistrates\' Court']],
      ], terms: [['United Nations', 'International body for peace and cooperation'], ['NGO', 'Charity or group independent of government'], ['Sovereignty', 'Power of a state to govern itself'], ['Global citizenship', 'Seeing yourself as part of a world community']] },
    ] },
  ],
  statistics: [
    { title: 'Statistics in depth', desc: 'Diagrams, correlation and probability', lessons: [
      { title: 'Diagrams and correlation', qs: [
        ['Spearman\'s rank measures…', 'Strength of correlation using ranks', ['The mean', 'Probability', 'Sample size']],
        ['A correlation coefficient of −0.9 shows…', 'Strong negative correlation', ['Weak positive correlation', 'No correlation', 'Strong positive correlation']],
        ['Correlation does not prove…', 'Causation', ['A pattern', 'A relationship', 'A trend']],
        ['A population pyramid is a type of…', 'Back-to-back bar chart', ['Pie chart', 'Line graph', 'Box plot']],
        ['Interpolation is estimating…', 'Within the range of data', ['Outside the data', 'The mean', 'The mode']],
      ], terms: [['Causation', 'One thing directly causes another'], ['Extrapolation', 'Estimating outside the data range'], ['Interpolation', 'Estimating within the data range'], ['Skew', 'Lopsided distribution']] },
      { title: 'Index numbers and probability', qs: [
        ['A base year index number is…', '100', ['0', '1', '1000']],
        ['A chain base index compares each value with…', 'The previous value', ['The first value', 'The mean', '100']],
        ['Stratified sampling…', 'Samples groups in proportion to their size', ['Picks every 10th', 'Picks volunteers', 'Picks friends']],
        ['Systematic sampling picks…', 'Every nth item', ['Random items', 'Only the first items', 'The largest items']],
        ['Expected frequency = probability × …', 'number of trials', ['mean', 'range', '100']],
      ], terms: [['Index number', 'Shows change compared with a base'], ['Stratified sample', 'Proportional groups'], ['Expected frequency', 'Times you expect an outcome'], ['Normal distribution', 'Symmetrical bell-shaped data']] },
    ] },
  ],
  astronomy: [
    { title: 'Astronomy in depth', desc: 'Planets, observing and cosmology', lessons: [
      { title: 'The Solar System', qs: [
        ['Which is the largest planet?', 'Jupiter', ['Saturn', 'Earth', 'Neptune']],
        ['Which planet is closest to the Sun?', 'Mercury', ['Venus', 'Mars', 'Earth']],
        ['A comet\'s tail always points…', 'Away from the Sun', ['Towards the Sun', 'Towards Earth', 'Down']],
        ['The asteroid belt lies between…', 'Mars and Jupiter', ['Earth and Mars', 'Jupiter and Saturn', 'Venus and Earth']],
        ['Kepler\'s laws describe…', 'Planetary orbits', ['Star colours', 'Tides', 'Eclipses only']],
      ], terms: [['Ecliptic', 'Apparent path of the Sun across the sky'], ['Dwarf planet', 'Like Pluto: has not cleared its orbit'], ['Light year', 'Distance light travels in a year'], ['Astronomical unit', 'Average Earth–Sun distance']] },
      { title: 'Observing and cosmology', qs: [
        ['Why are telescopes placed in space?', 'To avoid the atmosphere blurring images', ['To be closer to stars', 'Because it is warmer', 'To save money']],
        ['A reflecting telescope uses…', 'Mirrors', ['Only lenses', 'Radio waves only', 'Magnets']],
        ['Hubble\'s law says galaxies further away…', 'Move away faster', ['Move slower', 'Are closer', 'Are older only']],
        ['The cosmic microwave background is evidence for…', 'The Big Bang', ['Steady State', 'Plate tectonics', 'Black holes only']],
        ['A light pollution problem means…', 'Fewer stars are visible', ['More stars appear', 'Telescopes get hotter', 'The Moon disappears']],
      ], terms: [['Refracting telescope', 'Uses lenses'], ['Hubble\'s law', 'Recession speed increases with distance'], ['Exoplanet', 'Planet orbiting another star'], ['Dark matter', 'Unseen mass shown by gravity']] },
    ] },
  ],
  pe: [
    { title: 'Physiology, training and sport psychology', desc: 'More of the PE theory papers', lessons: [
      { title: 'Cardio-respiratory system and movement', qs: [
        ['Cardiac output = stroke volume × …', 'heart rate', ['breathing rate', 'tidal volume', 'blood pressure']],
        ['Tidal volume is…', 'Air breathed in or out in a normal breath', ['Total lung capacity', 'Maximum breath', 'Air left after breathing out']],
        ['A lever with the fulcrum in the middle is a…', 'First-class lever', ['Second-class lever', 'Third-class lever', 'Fourth-class lever']],
        ['Flexion at a joint means…', 'Decreasing the angle', ['Increasing the angle', 'Turning in a circle', 'Moving away from the body']],
        ['Which plane does a forward roll happen in?', 'Sagittal', ['Frontal', 'Transverse', 'Horizontal']],
      ], terms: [['Cardiac output', 'Blood pumped per minute'], ['Stroke volume', 'Blood pumped per beat'], ['Antagonistic pair', 'Muscles working in opposition'], ['EPOC', 'Extra oxygen used after exercise']] },
      { title: 'Training and sports psychology', qs: [
        ['The SPORT principles stand for specificity, progression, overload, reversibility and…', 'Tedium', ['Time', 'Training', 'Target']],
        ['Interval training alternates…', 'Work and rest', ['Sports', 'Weights only', 'Stretching only']],
        ['Intrinsic motivation comes from…', 'Inside, for enjoyment', ['Trophies', 'Money', 'Coaches only']],
        ['Which is a gross skill?', 'Sprinting', ['Darts throwing', 'Snooker shot', 'Typing']],
        ['Guidance using a demonstration is…', 'Visual guidance', ['Verbal guidance', 'Manual guidance', 'Mechanical guidance']],
      ], terms: [['Overload', 'Working harder than normal'], ['Reversibility', 'Losing fitness when training stops'], ['Arousal', 'Level of alertness and excitement'], ['Feedback', 'Information about performance']] },
    ] },
  ],
  food: [
    { title: 'More food preparation and nutrition', desc: 'Diet, provenance and cooking science', lessons: [
      { title: 'Diet, health and provenance', qs: [
        ['The Eatwell Guide shows…', 'The proportions of a healthy diet', ['Food prices', 'Cooking times', 'Recipes']],
        ['Which vitamin helps the body absorb calcium?', 'Vitamin D', ['Vitamin C', 'Vitamin A', 'Vitamin B12']],
        ['Anaemia can be caused by a lack of…', 'Iron', ['Calcium', 'Fibre', 'Vitamin C']],
        ['Food miles are…', 'How far food travels', ['Calories', 'Shelf life', 'Portion size']],
        ['Organic farming…', 'Avoids artificial fertilisers and pesticides', ['Uses more chemicals', 'Only grows wheat', 'Is always indoors']],
      ], terms: [['Macronutrient', 'Needed in large amounts: protein, fat, carbohydrate'], ['Micronutrient', 'Vitamins and minerals'], ['Provenance', 'Where food comes from'], ['Seasonal food', 'Food grown at its natural time']] },
      { title: 'Cooking methods and food science', qs: [
        ['Gelatinisation happens when…', 'Starch thickens a liquid when heated', ['Protein sets', 'Sugar browns', 'Fat melts']],
        ['Conduction transfers heat…', 'Through direct contact', ['Through air currents', 'By waves', 'By steam only']],
        ['Shortening in pastry is caused by…', 'Fat coating flour particles', ['Too much water', 'Yeast', 'Kneading']],
        ['Yeast needs warmth, moisture and…', 'Food (sugar)', ['Salt', 'Oil', 'Cold']],
        ['Enzymic browning happens when cut fruit is exposed to…', 'Oxygen', ['Water', 'Salt', 'Sugar']],
      ], terms: [['Gelatinisation', 'Starch granules swelling to thicken'], ['Denaturation', 'Protein changing structure'], ['Caramelisation', 'Sugar browning with heat'], ['Raising agent', 'Makes mixtures rise']] },
    ] },
  ],
  dt: [
    { title: 'More design and technology', desc: 'Materials, sustainability and making', lessons: [
      { title: 'Materials and processes', qs: [
        ['Which is a thermosetting plastic?', 'Epoxy resin', ['Acrylic', 'Polypropylene', 'HIPS']],
        ['Which wood is a softwood?', 'Pine', ['Oak', 'Mahogany', 'Beech']],
        ['A ferrous metal contains…', 'Iron', ['Copper', 'Aluminium', 'Tin only']],
        ['Laser cutting is an example of…', 'CAM', ['CAD', 'Hand tools', 'Casting']],
        ['A jig helps to…', 'Repeat accurate operations', ['Paint products', 'Design on screen', 'Test strength']],
      ], terms: [['CAD', 'Computer-aided design'], ['CAM', 'Computer-aided manufacture'], ['Tolerance', 'Allowed variation in size'], ['Composite', 'Two or more materials combined']] },
      { title: 'Sustainability and design', qs: [
        ['The 6 Rs include reduce, reuse, recycle, rethink, refuse and…', 'Repair', ['Replace', 'Rebuild', 'Return']],
        ['Planned obsolescence means…', 'Products are designed to have a limited life', ['Products last forever', 'Products are free', 'Products are recycled']],
        ['Anthropometric data is about…', 'Human body measurements', ['Weather', 'Materials', 'Costs']],
        ['Ergonomics is about…', 'Making products comfortable and easy to use', ['Colour', 'Packaging only', 'Price']],
        ['A design specification lists…', 'Requirements the product must meet', ['Only colours', 'The final price only', 'Staff names']],
      ], terms: [['Ergonomics', 'Designing for human use'], ['Anthropometrics', 'Human body measurement data'], ['Life cycle assessment', 'Environmental impact from start to end'], ['Iterative design', 'Design, test, improve, repeat']] },
    ] },
  ],
  engineering: [
    { title: 'Engineering in depth', desc: 'Drawings, systems and testing', lessons: [
      { title: 'Engineering drawings and systems', qs: [
        ['An orthographic drawing shows…', 'Front, side and plan views', ['A 3D sketch only', 'A circuit', 'A flowchart']],
        ['Third angle projection is shown by a symbol of a…', 'Cone viewed two ways', ['Square', 'Triangle', 'Star']],
        ['A system has input, process and…', 'Output', ['Outcome', 'Option', 'Order']],
        ['Which is a mechanical system?', 'A gear train', ['A light sensor', 'A website', 'A battery only']],
        ['Tensile strength is resistance to…', 'Being pulled apart', ['Being squashed', 'Bending', 'Heat']],
      ], terms: [['Orthographic projection', '2D views of a 3D object'], ['Gear ratio', 'Driven teeth ÷ driver teeth'], ['Hardness', 'Resistance to scratching and wear'], ['Ductility', 'Can be drawn into wires']] },
    ] },
  ],
  electronics: [
    { title: 'Electronics in depth', desc: 'Sensors, signals and microcontrollers', lessons: [
      { title: 'Sensors and microcontrollers', qs: [
        ['A potential divider uses two resistors to…', 'Split a voltage', ['Store charge', 'Make light', 'Amplify sound']],
        ['A transistor can act as a…', 'Switch or amplifier', ['Battery', 'Sensor only', 'Fuse']],
        ['An analogue signal…', 'Varies continuously', ['Is only 0 or 1', 'Never changes', 'Is digital']],
        ['A microcontroller is…', 'A small computer on a chip', ['A type of resistor', 'A battery', 'A speaker']],
        ['A capacitor…', 'Stores charge', ['Converts light to current', 'Only lets current one way', 'Measures temperature']],
      ], terms: [['Potential divider', 'Two resistors splitting a voltage'], ['Transistor', 'Electronic switch or amplifier'], ['Analogue', 'Continuously varying signal'], ['Digital', 'Signal with set values like 0 and 1']] },
    ] },
  ],
  art: [
    { title: 'Art in depth', desc: 'Techniques and analysis', lessons: [
      { title: 'Techniques and analysing artwork', qs: [
        ['Cross-hatching creates…', 'Tone using crossed lines', ['Colour mixing', 'Texture only in clay', 'Perspective']],
        ['Complementary colours are…', 'Opposite on the colour wheel', ['Next to each other', 'Black and white', 'Shades of one colour']],
        ['Which movement did Monet belong to?', 'Impressionism', ['Cubism', 'Pop Art', 'Surrealism']],
        ['A monoprint is…', 'A one-off print', ['A sculpture', 'A photograph', 'A collage']],
        ['When analysing artwork, consider content, form, process and…', 'Mood', ['Price', 'The artist\'s age only', 'Frame size']],
      ], terms: [['Tone', 'Lightness or darkness'], ['Composition', 'How elements are arranged'], ['Complementary colours', 'Opposite on the colour wheel'], ['Annotation', 'Notes explaining your work']] },
    ] },
  ],
  drama: [
    { title: 'Drama in depth', desc: 'Staging, design and set texts', lessons: [
      { title: 'Staging and design', qs: [
        ['A thrust stage has the audience on…', 'Three sides', ['One side', 'All four sides', 'Two sides']],
        ['Theatre in the round has the audience…', 'All around the stage', ['In front only', 'On two sides', 'Above']],
        ['A gobo is used in…', 'Lighting to project a pattern', ['Costume', 'Sound', 'Props']],
        ['Upstage is…', 'Furthest from the audience', ['Closest to the audience', 'Stage left', 'The wings']],
        ['Proxemics is the use of…', 'Space between actors', ['Lighting', 'Costume', 'Music']],
      ], terms: [['Proscenium arch', 'Frame around a stage'], ['Thrust stage', 'Audience on three sides'], ['Gobo', 'Stencil that shapes light'], ['Proxemics', 'Use of space between performers']] },
    ] },
  ],
  dance: [
    { title: 'Dance in depth', desc: 'Professional works and analysis', lessons: [
      { title: 'Analysing professional works', qs: [
        ['Motif development changes…', 'A short movement phrase', ['The music only', 'The costume', 'The stage']],
        ['Canon means…', 'Dancers perform the same move one after another', ['All dance together', 'Freezing', 'Improvising']],
        ['Unison means…', 'Dancers perform the same move at the same time', ['One after another', 'In mirror image', 'Alone']],
        ['Physical setting includes…', 'Set and props', ['Choreographic intent', 'Dynamics', 'Timing']],
        ['Dynamics describe…', 'How a movement is performed', ['Where it is performed', 'Who performs it', 'The music']],
      ], terms: [['Canon', 'Moves performed one after another'], ['Unison', 'Moves performed together'], ['Dynamics', 'Quality of movement'], ['Choreographic intent', 'What the dance aims to communicate']] },
    ] },
  ],
  music: [
    { title: 'Music in depth', desc: 'Set works, instruments and styles', lessons: [
      { title: 'Instruments and styles', qs: [
        ['Which family is the clarinet in?', 'Woodwind', ['Brass', 'Strings', 'Percussion']],
        ['Pizzicato means…', 'Plucking the strings', ['Bowing', 'Playing loudly', 'Sliding between notes']],
        ['A cadence is…', 'Two chords ending a phrase', ['A type of drum', 'A fast tempo', 'A melody']],
        ['A perfect cadence is chord…', 'V to I', ['IV to I', 'I to V', 'V to VI']],
        ['Syncopation means…', 'Accents off the beat', ['Playing in unison', 'Very slow tempo', 'No rhythm']],
      ], terms: [['Cadence', 'Chords ending a phrase'], ['Syncopation', 'Off-beat accents'], ['Ostinato', 'Repeated pattern'], ['Texture', 'How layers of sound combine']] },
      { title: 'Structure and harmony', qs: [
        ['Binary form is…', 'AB', ['ABA', 'ABACA', 'AABA']],
        ['Rondo form is…', 'ABACA', ['AB', 'ABA', 'Through-composed']],
        ['A major key usually sounds…', 'Bright or happy', ['Sad', 'Scary', 'Silent']],
        ['A countermelody is…', 'A second melody played against the main one', ['The bass line', 'A drum beat', 'A chord']],
        ['Homophonic texture is…', 'Melody with chordal accompaniment', ['A single line', 'Many independent melodies', 'Silence']],
      ], terms: [['Ternary form', 'ABA'], ['Modulation', 'Changing key'], ['Homophonic', 'Melody with accompaniment'], ['Polyphonic', 'Several independent melodies']] },
    ] },
  ],
  media: [
    { title: 'Media in depth', desc: 'Representation, theory and contexts', lessons: [
      { title: 'Representation and theory', qs: [
        ['Stereotyping is…', 'Oversimplified views of a group', ['Accurate representation', 'A camera angle', 'A genre']],
        ['Mulvey\'s "male gaze" is about…', 'Women being shown for male viewers', ['Men in sport', 'Children\'s TV', 'News headlines']],
        ['Uses and gratifications theory says audiences…', 'Actively choose media to meet needs', ['Are passive', 'Never choose', 'Only watch news']],
        ['Conglomerate ownership means…', 'A large company owns many media businesses', ['One small company', 'Government ownership', 'Charity ownership']],
        ['A media text\'s context includes…', 'Historical, social and political background', ['Only its colour', 'Only its length', 'Only the actors']],
      ], terms: [['Representation', 'How people, places and ideas are shown'], ['Stereotype', 'Simplified, fixed image of a group'], ['Conglomerate', 'Large company owning many businesses'], ['Active audience', 'Audience that interprets media']] },
    ] },
  ],
  film: [
    { title: 'Film in depth', desc: 'Genre, narrative and context', lessons: [
      { title: 'Genre and narrative', qs: [
        ['A genre is…', 'A type of film with shared conventions', ['A camera shot', 'A cinema', 'An actor']],
        ['Todorov\'s theory begins with…', 'Equilibrium', ['Disruption', 'Resolution', 'The villain']],
        ['A MacGuffin is…', 'An object that drives the plot', ['A type of edit', 'A lighting rig', 'A soundtrack']],
        ['Diegetic sound is…', 'Sound characters can hear', ['Background music only', 'Narration', 'Silence']],
        ['A cross-cutting edit…', 'Switches between scenes happening at the same time', ['Fades to black', 'Shows the past', 'Freezes a frame']],
      ], terms: [['Genre', 'Category of film'], ['Equilibrium', 'Normal state at the start'], ['Diegetic sound', 'Sound within the story world'], ['Cross-cutting', 'Switching between parallel scenes']] },
    ] },
  ],
  latin: [
    { title: 'Latin in depth', desc: 'Grammar and vocabulary', lessons: [
      { title: 'Verbs and cases', qs: [
        ['The nominative case is used for the…', 'Subject', ['Object', 'Possession', 'Indirect object']],
        ['The accusative case is used for the…', 'Direct object', ['Subject', 'Possession', 'Means']],
        ['"puella" means…', 'Girl', ['Boy', 'Mother', 'Queen']],
        ['"amo" means…', 'I love', ['I see', 'I go', 'I say']],
        ['The genitive case shows…', 'Possession (of)', ['The subject', 'The object', 'Location']],
      ], terms: [['Nominative', 'Case of the subject'], ['Accusative', 'Case of the direct object'], ['Genitive', 'Case showing possession'], ['Dative', 'Case of the indirect object']] },
      { title: 'Roman world and vocabulary', qs: [
        ['"rex" means…', 'King', ['Road', 'War', 'Slave']],
        ['"bellum" means…', 'War', ['Beautiful', 'Bell', 'Good']],
        ['"via" means…', 'Road', ['Life', 'Wine', 'Man']],
        ['Who were the wealthy Roman upper class?', 'Patricians', ['Plebeians', 'Slaves', 'Gladiators']],
        ['The Colosseum was used for…', 'Gladiator games and shows', ['Chariot races', 'Senate meetings', 'Baths']],
      ], terms: [['Patrician', 'Wealthy Roman aristocrat'], ['Plebeian', 'Ordinary Roman citizen'], ['Senate', 'Council of Roman elders'], ['Forum', 'Public square at the heart of a Roman town']] },
    ] },
  ],
};
