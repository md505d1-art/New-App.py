// Full-specification content for GCSE Maths, English Language and English Literature.
// Added after each subject's starter units. Question: [question, answer, [wrong answers], optional explanation].

export const MATHS = [
  { title: 'Number', desc: 'Fractions, powers, ratio and accuracy', lessons: [
    { title: 'Fractions, decimals and percentages', qs: [
      ['What is 3/8 as a decimal?', '0.375', ['0.38', '0.83', '0.3'], '3 ÷ 8 = 0.375.'],
      ['2/3 + 1/4 = ?', '11/12', ['3/7', '3/12', '2/12'], 'Common denominator 12: 8/12 + 3/12.'],
      ['3/4 ÷ 1/2 = ?', '3/2', ['3/8', '2/3', '1/2'], 'Flip the second fraction and multiply: 3/4 × 2/1.'],
      ['Write 0.45 as a fraction in its simplest form.', '9/20', ['45/10', '4/5', '9/2']],
      ['What is 35% as a decimal?', '0.35', ['3.5', '0.035', '35']],
    ], terms: [['Numerator', 'Top number of a fraction'], ['Denominator', 'Bottom number of a fraction'], ['Recurring decimal', 'Digits that repeat for ever'], ['Mixed number', 'Whole number and a fraction']] },
    { title: 'Percentages and interest', qs: [
      ['Increase 60 by 15%.', '69', ['75', '61.5', '9'], '60 × 1.15 = 69.'],
      ['A £40 coat is reduced by 30%. New price?', '£28', ['£12', '£10', '£37']],
      ['£500 at 2% compound interest for 2 years?', '£520.20', ['£520', '£510', '£502'], '500 × 1.02² = 520.20.'],
      ['A price goes from £80 to £100. Percentage increase?', '25%', ['20%', '80%', '125%'], 'Change 20 ÷ original 80.'],
      ['After a 20% discount a TV costs £240. Original price?', '£300', ['£288', '£260', '£192'], 'Reverse percentage: 240 ÷ 0.8.'],
    ], terms: [['Multiplier', 'Number you multiply by for a percentage change'], ['Compound interest', 'Interest on the interest too'], ['Depreciation', 'Loss in value over time'], ['Reverse percentage', 'Finding the original amount']] },
    { title: 'Indices and surds', qs: [
      ['What is 5⁰?', '1', ['0', '5', 'Undefined']],
      ['What is 9^(1/2)?', '3', ['4.5', '81', '1/9']],
      ['What is 2⁻³?', '1/8', ['−8', '−6', '8']],
      ['Simplify √12', '2√3', ['3√2', '4√3', '6']],
      ['(x³)² = ?', 'x⁶', ['x⁵', 'x⁹', '2x³']],
    ], terms: [['Index', 'Power a number is raised to'], ['Surd', 'Root that is not a whole number'], ['Reciprocal', '1 divided by the number'], ['Rationalise', 'Remove a surd from the denominator']] },
    { title: 'Ratio and proportion', qs: [
      ['Share £60 in the ratio 1:2.', '£20 and £40', ['£30 and £30', '£15 and £45', '£10 and £50']],
      ['Simplify 12:18', '2:3', ['3:2', '6:9', '4:6']],
      ['5 pens cost £3. How much do 8 cost?', '£4.80', ['£4.50', '£5.00', '£2.40']],
      ['y is directly proportional to x. If x doubles, y…', 'Doubles', ['Halves', 'Stays the same', 'Squares']],
      ['y is inversely proportional to x. If x doubles, y…', 'Halves', ['Doubles', 'Stays the same', 'Is squared']],
    ], terms: [['Ratio', 'Compares parts of a whole'], ['Direct proportion', 'Both increase at the same rate'], ['Inverse proportion', 'One goes up as the other goes down'], ['Unitary method', 'Find the value of one first']] },
    { title: 'Standard form and bounds', qs: [
      ['Write 45 000 in standard form.', '4.5 × 10⁴', ['45 × 10³', '4.5 × 10³', '0.45 × 10⁵']],
      ['(2 × 10³) × (3 × 10⁴) = ?', '6 × 10⁷', ['6 × 10¹²', '5 × 10⁷', '6 × 10¹']],
      ['A length is 12 cm to the nearest cm. Lower bound?', '11.5 cm', ['11 cm', '11.9 cm', '12.5 cm']],
      ['Estimate 19.8 × 3.1', '60', ['57', '61.38', '62'], 'Round to 1 significant figure: 20 × 3.'],
      ['Round 0.004672 to 2 significant figures.', '0.0047', ['0.00467', '0.005', '0.0046']],
    ], terms: [['Standard form', 'A × 10ⁿ with 1 ≤ A < 10'], ['Significant figure', 'Digit counted from the first non-zero'], ['Upper bound', 'Largest value that rounds to the number'], ['Error interval', 'Range of possible values, e.g. 11.5 ≤ x < 12.5']] },
  ] },
  { title: 'Algebra', desc: 'Equations, graphs and sequences', lessons: [
    { title: 'Expanding and factorising', qs: [
      ['Expand (x + 3)(x + 5)', 'x² + 8x + 15', ['x² + 15', 'x² + 8x + 8', '2x + 8']],
      ['Factorise 6x + 9', '3(2x + 3)', ['6(x + 9)', '3(2x + 9)', '9(x + 1)']],
      ['Factorise x² − 9', '(x + 3)(x − 3)', ['(x − 3)²', '(x + 9)(x − 1)', 'x(x − 9)'], 'Difference of two squares.'],
      ['Expand (x − 4)²', 'x² − 8x + 16', ['x² + 16', 'x² − 16', 'x² − 4x + 16']],
      ['Factorise x² − 5x + 6', '(x − 2)(x − 3)', ['(x + 2)(x + 3)', '(x − 1)(x − 6)', '(x + 1)(x − 6)']],
    ], terms: [['Expand', 'Multiply out brackets'], ['Factorise', 'Put into brackets'], ['Coefficient', 'Number in front of a letter'], ['Difference of two squares', 'a² − b² = (a + b)(a − b)']] },
    { title: 'Equations and inequalities', qs: [
      ['Solve 5x − 7 = 18', 'x = 5', ['x = 2.2', 'x = 25', 'x = 11']],
      ['Solve 2(x + 3) = 14', 'x = 4', ['x = 5.5', 'x = 7', 'x = 10']],
      ['Solve 3x + 2 > 11', 'x > 3', ['x < 3', 'x > 13/3', 'x = 3']],
      ['Which integers satisfy −2 < x ≤ 1?', '−1, 0, 1', ['−2, −1, 0', '−2, −1, 0, 1', '0, 1']],
      ['Make x the subject of y = 4x − 1', 'x = (y + 1)/4', ['x = 4y + 1', 'x = (y − 1)/4', 'x = y/4 + 1']],
    ], terms: [['Inequality', 'Shows one value is bigger or smaller'], ['Integer', 'Whole number'], ['Subject', 'The letter a formula is "equal to"'], ['Solve', 'Find the value that makes it true']] },
    { title: 'Simultaneous equations', qs: [
      ['Solve x + y = 10 and x − y = 2', 'x = 6, y = 4', ['x = 4, y = 6', 'x = 5, y = 5', 'x = 8, y = 2']],
      ['Solve 2x + y = 7 and x + y = 4', 'x = 3, y = 1', ['x = 1, y = 3', 'x = 2, y = 3', 'x = 4, y = 0']],
      ['Graphically, the solution is where the lines…', 'Intersect', ['Are parallel', 'Cross the y-axis', 'Have equal gradients']],
      ['Two parallel lines have…', 'No solution', ['One solution', 'Two solutions', 'Infinite solutions only if steep']],
      ['3 apples and 2 pears cost £1.30; 1 apple and 2 pears cost 70p. One apple costs…', '30p', ['20p', '40p', '35p'], 'Subtract: 2 apples = 60p.'],
    ], terms: [['Simultaneous equations', 'Equations true at the same time'], ['Elimination', 'Add or subtract to remove a letter'], ['Substitution', 'Replace a letter with an expression'], ['Point of intersection', 'Where two graphs cross']] },
    { title: 'Quadratics', qs: [
      ['Solve x² − 7x + 12 = 0', 'x = 3 or x = 4', ['x = −3 or x = −4', 'x = 12', 'x = 7']],
      ['In the quadratic formula, what goes under the square root?', 'b² − 4ac', ['b² + 4ac', '4ac − b²', '2a']],
      ['Complete the square: x² + 6x = ?', '(x + 3)² − 9', ['(x + 6)² − 36', '(x + 3)² + 9', '(x − 3)² − 9']],
      ['The roots of a quadratic are where the graph…', 'Crosses the x-axis', ['Crosses the y-axis', 'Turns', 'Is steepest']],
      ['The turning point of y = (x − 2)² + 5 is…', '(2, 5)', ['(−2, 5)', '(2, −5)', '(5, 2)']],
    ], terms: [['Quadratic', 'Highest power is x²'], ['Root', 'Solution where y = 0'], ['Turning point', 'Maximum or minimum of a curve'], ['Discriminant', 'b² − 4ac']] },
    { title: 'Sequences', qs: [
      ['nth term of 7, 11, 15, 19?', '4n + 3', ['4n + 7', '3n + 4', 'n + 4']],
      ['Is 51 in the sequence 3n + 2?', 'No', ['Yes, when n = 17', 'Yes, when n = 16', 'Yes, when n = 49'], '3n + 2 = 51 gives n = 49/3, which is not a whole number.'],
      ['The 10th term of 2n² is…', '200', ['20', '400', '100']],
      ['1, 1, 2, 3, 5, 8 is a… sequence.', 'Fibonacci', ['Geometric', 'Arithmetic', 'Quadratic']],
      ['2, 6, 18, 54 is a… sequence.', 'Geometric', ['Arithmetic', 'Fibonacci', 'Square']],
    ], terms: [['Arithmetic sequence', 'Goes up or down by the same amount'], ['Geometric sequence', 'Multiplied by the same number each time'], ['nth term', 'Rule for any term'], ['Term-to-term rule', 'How to get the next term']] },
    { title: 'Graphs and functions', qs: [
      ['Gradient between (1, 2) and (3, 8)?', '3', ['6', '2', '1/3']],
      ['Where does y = 2x + 5 cross the y-axis?', '(0, 5)', ['(5, 0)', '(0, 2)', '(2, 5)']],
      ['Parallel lines have the same…', 'Gradient', ['y-intercept', 'Length', 'Equation']],
      ['y = 1/x is a… graph.', 'Reciprocal', ['Quadratic', 'Cubic', 'Linear']],
      ['If f(x) = 2x + 1, what is f(4)?', '9', ['8', '6', '24']],
    ], terms: [['Gradient', 'Steepness: change in y ÷ change in x'], ['y-intercept', 'Where a line crosses the y-axis'], ['Function', 'A rule that turns an input into an output'], ['Perpendicular', 'At right angles; gradients multiply to −1']] },
  ] },
  { title: 'Geometry and measures', desc: 'Shapes, angles, trigonometry and vectors', lessons: [
    { title: 'Angles and polygons', qs: [
      ['Angles on a straight line add up to…', '180°', ['90°', '360°', '270°']],
      ['Interior angles of a pentagon add up to…', '540°', ['360°', '720°', '500°'], '(5 − 2) × 180.'],
      ['Each exterior angle of a regular hexagon is…', '60°', ['120°', '45°', '72°']],
      ['Alternate angles on parallel lines are…', 'Equal', ['Add to 180°', 'Add to 90°', 'Double']],
      ['Co-interior angles add up to…', '180°', ['360°', '90°', 'They are equal']],
    ], terms: [['Alternate angles', 'Z-shape, equal'], ['Corresponding angles', 'F-shape, equal'], ['Polygon', 'Flat shape with straight sides'], ['Regular', 'All sides and angles equal']] },
    { title: 'Area, perimeter and volume', qs: [
      ['Area of a trapezium?', '½(a + b)h', ['a × b × h', '½bh', '(a + b)h']],
      ['Volume of a cylinder?', 'πr²h', ['2πrh', '⅓πr²h', 'πr²']],
      ['Volume of a cuboid 2 × 3 × 4 cm?', '24 cm³', ['9 cm³', '24 cm²', '52 cm³']],
      ['Area of a triangle with base 10 and height 6?', '30', ['60', '16', '15']],
      ['1 m² = …', '10 000 cm²', ['100 cm²', '1000 cm²', '1 000 000 cm²']],
    ], terms: [['Perimeter', 'Distance around a shape'], ['Prism', 'Same cross-section all the way through'], ['Surface area', 'Total area of all faces'], ['Volume', 'Space inside a 3D shape']] },
    { title: 'Circles, arcs and sectors', qs: [
      ['Circumference of a circle with diameter 10?', '10π', ['25π', '100π', '5π']],
      ['Area of a sector with angle 90° and radius 4?', '4π', ['16π', '8π', '2π'], '90/360 × π × 4².'],
      ['Arc length = (angle ÷ 360) × …', 'πd', ['πr²', '2r', 'r²']],
      ['The angle in a semicircle is…', '90°', ['180°', '60°', '45°']],
      ['The angle between a tangent and a radius is…', '90°', ['180°', '45°', 'It varies']],
    ], terms: [['Sector', 'Slice of a circle'], ['Arc', 'Part of the circumference'], ['Tangent', 'Line touching a circle once'], ['Segment', 'Area between a chord and an arc']] },
    { title: 'Pythagoras and trigonometry', qs: [
      ['A right-angled triangle has sides 5 and 12. Hypotenuse?', '13', ['17', '7', '169']],
      ['tan x = opposite ÷ …', 'adjacent', ['hypotenuse', 'opposite', 'sine']],
      ['What is sin 30°?', '0.5', ['√3/2', '1', '0']],
      ['What is cos 60°?', '0.5', ['√3/2', '0', '1']],
      ['What is tan 45°?', '1', ['0', '√2', '0.5']],
    ], terms: [['Hypotenuse', 'Longest side, opposite the right angle'], ['Sine rule', 'a/sin A = b/sin B'], ['Cosine rule', 'a² = b² + c² − 2bc cos A'], ['Angle of elevation', 'Angle looking up from horizontal']] },
    { title: 'Transformations and similarity', qs: [
      ['A translation is described by a…', 'Vector', ['Centre and angle', 'Mirror line', 'Scale factor only']],
      ['To describe a rotation you need…', 'Centre, angle and direction', ['A vector', 'A mirror line', 'A scale factor']],
      ['Enlargement by scale factor 3 multiplies area by…', '9', ['3', '6', '27']],
      ['Congruent shapes are…', 'Identical in shape and size', ['The same shape, different size', 'Reflections only', 'Always triangles']],
      ['Which is NOT a condition for congruent triangles?', 'AAA', ['SSS', 'SAS', 'RHS'], 'Equal angles only show similarity.'],
    ], terms: [['Similar', 'Same shape, different size'], ['Congruent', 'Exactly the same shape and size'], ['Scale factor', 'How many times bigger'], ['Translation', 'Slide without turning']] },
    { title: 'Vectors and bearings', qs: [
      ['Bearings are measured clockwise from…', 'North', ['East', 'South', 'The x-axis']],
      ['A bearing always has how many figures?', 'Three', ['Two', 'Four', 'One']],
      ['If the bearing of B from A is 070°, the bearing of A from B is…', '250°', ['110°', '290°', '070°'], 'Add 180°.'],
      ['(2, 3) + (1, −5) as column vectors = ?', '(3, −2)', ['(1, 8)', '(3, 8)', '(2, −15)']],
      ['Vectors a and 3a are…', 'Parallel', ['Perpendicular', 'Equal', 'Unrelated']],
    ], terms: [['Vector', 'Has size and direction'], ['Bearing', 'Three-figure angle clockwise from north'], ['Locus', 'Set of points that follow a rule'], ['Scale drawing', 'Accurate drawing at a fixed ratio']] },
  ] },
  { title: 'Probability and statistics', desc: 'Chance, charts and data', lessons: [
    { title: 'Probability', qs: [
      ['P(A or B) for mutually exclusive events = ?', 'P(A) + P(B)', ['P(A) × P(B)', 'P(A) − P(B)', '1 − P(A)']],
      ['P(A and B) for independent events = ?', 'P(A) × P(B)', ['P(A) + P(B)', 'P(A) ÷ P(B)', '1']],
      ['Probability of two heads with two coins?', '1/4', ['1/2', '1/3', '2/4']],
      ['A spinner lands on red 30 times in 100 spins. Relative frequency of red?', '0.3', ['30', '0.7', '3']],
      ['In a Venn diagram, A ∩ B means…', 'In both A and B', ['In A or B', 'Not in A', 'In neither']],
    ], terms: [['Mutually exclusive', 'Cannot happen at the same time'], ['Independent', 'One does not affect the other'], ['Relative frequency', 'Experimental probability'], ['Sample space', 'All possible outcomes']] },
    { title: 'Averages and spread from tables', qs: [
      ['To estimate the mean from grouped data you use the…', 'Midpoint of each group', ['Biggest value', 'Smallest value', 'Mode']],
      ['The interquartile range is…', 'Upper quartile − lower quartile', ['Highest − lowest', 'Median − mean', 'Mean ÷ 2']],
      ['Which average is affected most by an extreme value?', 'Mean', ['Median', 'Mode', 'They are all the same']],
      ['A box plot shows…', 'Median, quartiles and range', ['Only the mean', 'Every value', 'Frequency density']],
      ['The modal class is the group with…', 'The highest frequency', ['The highest values', 'The middle value', 'The widest range']],
    ], terms: [['Quartile', 'Splits data into quarters'], ['Interquartile range', 'Spread of the middle half'], ['Outlier', 'Value far from the rest'], ['Frequency', 'How often something happens']] },
    { title: 'Charts and sampling', qs: [
      ['In a histogram, the y-axis is…', 'Frequency density', ['Frequency', 'Cumulative frequency', 'Percentage']],
      ['Frequency density = frequency ÷ …', 'class width', ['total', 'midpoint', 'range']],
      ['A scatter graph sloping down shows…', 'Negative correlation', ['Positive correlation', 'No correlation', 'A mistake']],
      ['A random sample means…', 'Everyone has an equal chance of being picked', ['Choosing friends', 'Only the first ten', 'Choosing volunteers']],
      ['Cumulative frequency graphs are used to find the…', 'Median and quartiles', ['Mode', 'Mean', 'Total only']],
    ], terms: [['Correlation', 'Relationship between two variables'], ['Line of best fit', 'Straight line through the trend'], ['Sample', 'Part of a population'], ['Bias', 'Unfair tilt in data collection']] },
  ] },
];

export const ENGLISH_LANG = [
  { title: 'Reading skills', desc: 'Every reading question on both papers', lessons: [
    { title: 'Retrieving information', qs: [
      ['Paper 1 Question 1 asks you to…', 'List four true things from a set part of the text', ['Analyse language', 'Write a story', 'Compare two texts']],
      ['For retrieval questions you should…', 'Use short quotes or paraphrase from the right lines', ['Explain techniques', 'Give your opinion', 'Write a paragraph']],
      ['Paper 2 Question 1 asks you to…', 'Choose four true statements', ['Write a summary', 'Evaluate a statement', 'Write an article']],
      ['Explicit information is…', 'Stated directly in the text', ['Hinted at', 'Your opinion', 'About the writer\'s life']],
      ['Implicit information is…', 'Suggested, not stated directly', ['Stated plainly', 'Always a fact', 'Only in headings']],
    ], terms: [['Explicit', 'Stated openly'], ['Implicit', 'Suggested or implied'], ['Paraphrase', 'Put into your own words'], ['Inference', 'Working out what is suggested']] },
    { title: 'Analysing language', qs: [
      ['A strong language answer includes…', 'Quote, technique, effect on the reader', ['Only a quote', 'Only the technique name', 'A summary of the plot']],
      ['"The wind howled" is an example of…', 'Personification', ['Simile', 'Alliteration', 'Onomatopoeia']],
      ['Connotations are…', 'Ideas and feelings a word suggests', ['Dictionary meanings', 'Rhyming words', 'Punctuation marks']],
      ['A semantic field is…', 'A group of words with a shared theme', ['A long sentence', 'A type of rhyme', 'A paragraph']],
      ['Which word class describes a noun?', 'Adjective', ['Verb', 'Adverb', 'Pronoun']],
    ], terms: [['Connotation', 'Feeling or idea a word suggests'], ['Semantic field', 'Words linked by a theme'], ['Sibilance', 'Repeated s sounds'], ['Pathetic fallacy', 'Weather reflecting mood']] },
    { title: 'Analysing structure', qs: [
      ['Structure is about…', 'How the text is organised and how focus shifts', ['Single words only', 'Spelling', 'The writer\'s biography']],
      ['A shift in focus from the setting to a character can…', 'Build tension or show importance', ['Make spelling clearer', 'End the story', 'Add a rhyme']],
      ['A cyclical structure…', 'Ends where it began', ['Has no ending', 'Is told backwards', 'Uses only dialogue']],
      ['A flashback…', 'Goes back to earlier events', ['Jumps to the future', 'Repeats the title', 'Is a short sentence']],
      ['A one-sentence paragraph is often used to…', 'Create impact or a turning point', ['Save ink', 'List facts', 'Introduce dialogue']],
    ], terms: [['Cyclical structure', 'Ending links back to the opening'], ['Foreshadowing', 'Hints at what will happen'], ['Climax', 'Most intense moment'], ['Shift in focus', 'Change in what the reader is shown']] },
    { title: 'Evaluating and comparing', qs: [
      ['Paper 1 Question 4 asks how far you…', 'Agree with a statement about the text', ['Can retell the plot', 'Like the writer', 'Can spot spelling errors']],
      ['A strong evaluation answer…', 'Gives a judgement backed by evidence and methods', ['Lists techniques only', 'Disagrees with everything', 'Summarises']],
      ['Paper 2 Question 4 compares…', 'Writers\' viewpoints and methods', ['Only facts', 'Only dates', 'Two stories you wrote']],
      ['A good comparison word is…', 'Whereas', ['Firstly', 'Finally', 'Because']],
      ['Paper 2 Question 2 is a summary of…', 'Differences or similarities between the sources', ['Your opinion', 'Language techniques only', 'One source']],
    ], terms: [['Viewpoint', 'The writer\'s attitude or opinion'], ['Evaluate', 'Judge how effective something is'], ['Synthesise', 'Bring ideas from two texts together'], ['Discourse marker', 'Word linking ideas, e.g. however']] },
  ] },
  { title: 'Writing skills', desc: 'Creative and viewpoint writing', lessons: [
    { title: 'Descriptive and narrative writing', qs: [
      ['Paper 1 Section B asks for…', 'Descriptive or narrative writing', ['A letter', 'A speech', 'A comparison']],
      ['"Show, don\'t tell" means…', 'Use details and actions instead of stating feelings', ['Use only dialogue', 'Write in the present tense', 'Avoid adjectives']],
      ['A good opening often…', 'Hooks the reader with something intriguing', ['Starts with "Once upon a time"', 'Explains everything', 'Is very long']],
      ['Which adds sensory detail?', '"The bitter smell of smoke clung to my coat"', ['"It was a nice day"', '"Then I went home"', '"It was very good"']],
      ['A narrative should have…', 'A clear structure and a satisfying ending', ['As many characters as possible', 'No paragraphs', 'Only description']],
    ], terms: [['Narrative', 'A story'], ['Sensory language', 'Appeals to the five senses'], ['Zoom in', 'Focus on a small detail'], ['Narrator', 'Voice telling the story']] },
    { title: 'Writing to argue and persuade', qs: [
      ['Paper 2 Section B asks you to…', 'Write your viewpoint in a set form', ['Write a poem', 'Retell a story', 'Analyse a source']],
      ['Which form needs a headline?', 'Article', ['Letter', 'Speech', 'Essay']],
      ['A counter-argument is…', 'An opposing view you then reject', ['Your main point', 'A statistic', 'A joke']],
      ['A rhetorical question…', 'Does not expect an answer', ['Needs a reply', 'Is always a fact', 'Ends a letter']],
      ['Which is a formal letter ending to a named person?', 'Yours sincerely', ['Yours faithfully', 'Cheers', 'Love from']],
    ], terms: [['Rhetorical question', 'Question asked for effect'], ['Counter-argument', 'Opposing view'], ['Anecdote', 'Short personal story'], ['Tone', 'The attitude of the writing']] },
    { title: 'Spelling, punctuation and grammar', qs: [
      ['Which is correct?', 'Their bags are over there.', ['There bags are over their.', 'They\'re bags are over there.', 'Their bags are over they\'re.']],
      ['A semicolon can join…', 'Two closely linked main clauses', ['A list of names only', 'A question and answer', 'Two words']],
      ['A colon is used before…', 'A list or explanation', ['Every comma', 'Speech only', 'A full stop']],
      ['"Its" or "it\'s": ___ raining.', 'It\'s', ['Its', 'Its\'', 'It is\'']],
      ['A complex sentence contains…', 'A main clause and a subordinate clause', ['Only one clause', 'Two main clauses joined by "and"', 'No verbs']],
    ], terms: [['Clause', 'Group of words with a verb'], ['Subordinate clause', 'Cannot stand alone'], ['Homophone', 'Sounds the same, different meaning'], ['Apostrophe', 'Shows possession or omission']] },
  ] },
];

export const ENGLISH_LIT = [
  { title: 'Macbeth in depth', desc: 'Characters, quotes, themes and context', lessons: [
    { title: 'Macbeth: characters and quotes', qs: [
      ['Who says "Fair is foul, and foul is fair"?', 'The witches', ['Macbeth', 'Banquo', 'Lady Macbeth']],
      ['"Look like th\'innocent flower, / But be the serpent under\'t" is said by…', 'Lady Macbeth', ['Macbeth', 'Duncan', 'Malcolm']],
      ['Who kills Macbeth?', 'Macduff', ['Malcolm', 'Banquo', 'Fleance']],
      ['"Out, damned spot!" shows Lady Macbeth\'s…', 'Guilt', ['Ambition', 'Bravery', 'Love of Duncan']],
      ['Malcolm calls Macbeth and his wife a "dead butcher and his…"', 'fiend-like queen', ['loyal queen', 'gentle wife', 'innocent bride']],
    ], terms: [['Tragic hero', 'Great figure brought down by a flaw'], ['Hamartia', 'Fatal flaw'], ['Soliloquy', 'Speech alone revealing thoughts'], ['Regicide', 'Killing a king']] },
    { title: 'Macbeth: themes and context', qs: [
      ['Which king was Shakespeare writing for?', 'James I', ['Elizabeth I', 'Henry VIII', 'Charles I']],
      ['The Divine Right of Kings meant…', 'Kings were chosen by God', ['Anyone could be king', 'Kings were elected', 'The church chose kings']],
      ['"Vaulting ambition" shows Macbeth knows ambition is…', 'Dangerous and could make him fall', ['Always good', 'Only for women', 'Easy to control']],
      ['Which plot of 1605 tried to kill James I?', 'The Gunpowder Plot', ['The Babington Plot', 'The Ridolfi Plot', 'The Rye House Plot']],
      ['Banquo is important because James I claimed…', 'To be descended from him', ['To have killed him', 'To be a witch', 'To be Scottish royalty by marriage only']],
    ], terms: [['Great Chain of Being', 'God-given order of everything'], ['Supernatural', 'Beyond the natural world'], ['Equivocation', 'Using ambiguous language to mislead'], ['Kingship', 'What makes a good ruler']] },
  ] },
  { title: 'A Christmas Carol in depth', desc: 'Staves, characters and context', lessons: [
    { title: 'A Christmas Carol: characters', qs: [
      ['Scrooge is "solitary as an…"', 'oyster', ['island', 'owl', 'orphan']],
      ['Who warns Scrooge first?', 'Jacob Marley', ['Fred', 'Bob Cratchit', 'Belle']],
      ['Which ghost shows Ignorance and Want?', 'The Ghost of Christmas Present', ['Christmas Past', 'Christmas Yet to Come', 'Marley']],
      ['Who was Scrooge\'s kind old employer?', 'Fezziwig', ['Fred', 'Topper', 'Old Joe']],
      ['Marley says "I wear the chain I forged in…"', 'life', ['hell', 'prison', 'secret']],
    ], terms: [['Redemption', 'Being saved from wrongdoing'], ['Novella', 'Short novel'], ['Stave', 'A verse of a song; Dickens\'s chapters'], ['Allegory', 'Story with a moral message']] },
    { title: 'A Christmas Carol: themes and context', qs: [
      ['When was A Christmas Carol published?', '1843', ['1812', '1870', '1901']],
      ['Scrooge\'s "decrease the surplus population" echoes…', 'Thomas Malthus', ['Charles Darwin', 'Karl Marx', 'Queen Victoria']],
      ['The 1834 Poor Law led to…', 'Workhouses for the poor', ['Free schools', 'Pensions', 'Free hospitals']],
      ['Dickens wanted readers to…', 'Take social responsibility for the poor', ['Avoid Christmas', 'Save money', 'Fear ghosts only']],
      ['Tiny Tim shows…', 'The cost of poverty on innocent people', ['Scrooge\'s childhood', 'Rich families', 'Victorian schools']],
    ], terms: [['Social responsibility', 'Duty to help others in society'], ['Workhouse', 'Harsh place for the poor to live and work'], ['Malthus', 'Economist who worried about overpopulation'], ['Victorian era', 'Queen Victoria\'s reign, 1837–1901']] },
  ] },
  { title: 'An Inspector Calls in depth', desc: 'Characters, quotes and context', lessons: [
    { title: 'An Inspector Calls: characters', qs: [
      ['Who says "We are members of one body"?', 'Inspector Goole', ['Mr Birling', 'Sheila', 'Gerald']],
      ['Mr Birling calls himself a "hard-headed, practical man of…"', 'business', ['honour', 'the people', 'science']],
      ['Who refused Eva help at the charity?', 'Mrs Birling', ['Sheila', 'Mr Birling', 'Eric']],
      ['Gerald knew Eva as…', 'Daisy Renton', ['Eva Smith only', 'Edna', 'Mrs Birling']],
      ['Which character changes the most?', 'Sheila', ['Mr Birling', 'Mrs Birling', 'Gerald']],
    ], terms: [['Dramatic irony', 'Audience knows more than the characters'], ['Mouthpiece', 'Character who voices the writer\'s views'], ['Capitalism', 'Private profit; look after yourself'], ['Socialism', 'Shared responsibility for everyone']] },
    { title: 'An Inspector Calls: themes and context', qs: [
      ['When was the play written and when is it set?', 'Written 1945, set 1912', ['Written 1912, set 1945', 'Both 1912', 'Both 1945']],
      ['Mr Birling calls the Titanic…', '"unsinkable"', ['"doomed"', '"too small"', '"dangerous"']],
      ['The Inspector warns of "fire and blood and…"', 'anguish', ['money', 'war', 'tears']],
      ['Why did Mr Birling sack Eva?', 'She led a strike for higher wages', ['She was rude to Sheila', 'She stole', 'She was late']],
      ['The ending phone call creates a…', 'Cyclical structure', ['Happy ending', 'Flashback', 'Prologue']],
    ], terms: [['Priestley', 'Socialist writer of the play'], ['Class', 'Social position based on wealth and status'], ['Responsibility', 'Duty for one\'s actions and others'], ['Generations', 'Young are open to change; old are not']] },
  ] },
  { title: 'Jekyll and Hyde in depth', desc: 'Characters, quotes and context', lessons: [
    { title: 'Jekyll and Hyde: characters', qs: [
      ['Who is the lawyer who investigates?', 'Utterson', ['Lanyon', 'Poole', 'Enfield']],
      ['Who dies of shock after seeing Hyde transform?', 'Dr Lanyon', ['Utterson', 'Poole', 'Enfield']],
      ['Who does Hyde murder with a cane?', 'Sir Danvers Carew', ['Lanyon', 'Enfield', 'Poole']],
      ['Utterson describes Hyde as "something…"', 'troglodytic', ['angelic', 'noble', 'gentle']],
      ['The final chapter is…', 'Henry Jekyll\'s Full Statement of the Case', ['Lanyon\'s Diary', 'The Last Night', 'Utterson\'s Will']],
    ], terms: [['Duality', 'Two sides of human nature'], ['Gothic', 'Dark, mysterious and supernatural genre'], ['Repression', 'Hiding unacceptable desires'], ['Doppelgänger', 'A double of a person']] },
    { title: 'Jekyll and Hyde: themes and context', qs: [
      ['When was the novella published?', '1886', ['1843', '1912', '1818']],
      ['Victorian gentlemen cared most about…', 'Reputation', ['Fame', 'Adventure', 'Sport']],
      ['Hyde as "ape-like" links to fears about…', 'Darwin\'s theory of evolution', ['Electricity', 'Railways', 'Germ theory only']],
      ['Who wrote Jekyll and Hyde?', 'Robert Louis Stevenson', ['Charles Dickens', 'Mary Shelley', 'Bram Stoker']],
      ['Hyde\'s door in a run-down street suggests…', 'A hidden, darker side', ['Wealth', 'Openness', 'Science']],
    ], terms: [['Reputation', 'What others think of you'], ['Science versus religion', 'New ideas challenging faith'], ['Atavism', 'Fear of humans reverting to primitive forms'], ['Victorian respectability', 'Strict public morality']] },
  ] },
  { title: 'Romeo and Juliet', desc: 'Plot, characters and themes', lessons: [
    { title: 'Romeo and Juliet: plot and characters', qs: [
      ['Where is the play set?', 'Verona', ['Venice', 'Rome', 'Mantua']],
      ['Who says "A plague o\' both your houses"?', 'Mercutio', ['Tybalt', 'Benvolio', 'Romeo']],
      ['Who marries Romeo and Juliet?', 'Friar Laurence', ['The Nurse', 'Friar John', 'Prince Escalus']],
      ['Romeo is banished for killing…', 'Tybalt', ['Mercutio', 'Paris', 'Lord Capulet']],
      ['The Prologue calls them "star-cross\'d…"', 'lovers', ['enemies', 'children', 'families']],
    ], terms: [['Prologue', 'Opening speech introducing the story'], ['Sonnet', '14-line love poem'], ['Fate', 'Events decided in advance'], ['Feud', 'Long, bitter quarrel']] },
    { title: 'Romeo and Juliet: themes', qs: [
      ['Why doesn\'t Romeo learn of the plan?', 'Friar John\'s letter never reaches him', ['Juliet tells him a lie', 'The Nurse forgets', 'Benvolio hides it']],
      ['Who does Lord Capulet want Juliet to marry?', 'Paris', ['Tybalt', 'Benvolio', 'Mercutio']],
      ['How does Juliet die?', 'She stabs herself with Romeo\'s dagger', ['Poison', 'A fall', 'In a duel']],
      ['The play\'s structure creates tension through…', 'Haste and short time scale', ['Long gaps between scenes', 'No conflict', 'Only comedy']],
      ['Light imagery is used for…', 'Love and beauty', ['Hatred', 'Death only', 'War']],
    ], terms: [['Patriarchy', 'Society controlled by men'], ['Tragedy', 'Play ending in disaster'], ['Oxymoron', 'Two opposite words together'], ['Foreshadowing', 'Hints at later events']] },
  ] },
  { title: 'Power and Conflict poetry', desc: 'The AQA anthology poems', lessons: [
    { title: 'Ozymandias, London and The Prelude', qs: [
      ['"Look on my works, ye Mighty, and despair!" is from…', 'Ozymandias', ['London', 'Tissue', 'The Prelude']],
      ['"Mind-forg\'d manacles" is from…', 'London', ['Ozymandias', 'Exposure', 'Kamikaze']],
      ['Ozymandias is written in the form of a…', 'Sonnet', ['Ballad', 'Dramatic monologue', 'Free verse']],
      ['In the extract from The Prelude, the speaker is frightened by…', 'A huge mountain peak', ['A storm at sea', 'Soldiers', 'A city']],
      ['Shelley, Blake and Wordsworth were…', 'Romantic poets', ['War poets', 'Victorian novelists', 'Modern poets']],
    ], terms: [['Romanticism', 'Movement celebrating nature and emotion'], ['Irony', 'Opposite of what is expected'], ['Hubris', 'Excessive pride'], ['Sonnet', '14-line poem']] },
    { title: 'My Last Duchess and The Charge of the Light Brigade', qs: [
      ['My Last Duchess is a…', 'Dramatic monologue', ['Sonnet', 'Elegy', 'Haiku']],
      ['"Then all smiles stopped together" suggests the Duke…', 'Had the duchess killed', ['Made her laugh', 'Married her', 'Painted her']],
      ['"Theirs not to reason why" is from…', 'The Charge of the Light Brigade', ['Exposure', 'Bayonet Charge', 'Remains']],
      ['The Charge of the Light Brigade is about a battle in the…', 'Crimean War', ['First World War', 'Iraq War', 'Second World War']],
      ['How many men "rode into the valley of Death"?', 'Six hundred', ['Five hundred', 'One thousand', 'Sixty']],
    ], terms: [['Dramatic monologue', 'One character speaks to a silent listener'], ['Enjambment', 'A sentence running over a line break'], ['Dactylic metre', 'Stressed then two unstressed syllables'], ['Control', 'Power over others']] },
    { title: 'War poems: Exposure, Bayonet Charge and Remains', qs: [
      ['"But nothing happens" is repeated in…', 'Exposure', ['Bayonet Charge', 'Remains', 'Poppies']],
      ['In Exposure, the main enemy is…', 'The weather', ['The Germans', 'The officers', 'Hunger']],
      ['"Suddenly he awoke and was running" opens…', 'Bayonet Charge', ['Remains', 'Exposure', 'Kamikaze']],
      ['Remains is about a soldier who…', 'Is haunted by killing a looter', ['Turns back his plane', 'Photographs war', 'Dies in a charge']],
      ['"His bloody life in my bloody hands" shows…', 'Guilt and trauma', ['Pride', 'Joy', 'Boredom']],
    ], terms: [['PTSD', 'Trauma that stays after a terrible event'], ['Caesura', 'A pause in the middle of a line'], ['In medias res', 'Starting in the middle of the action'], ['Colloquial language', 'Informal, everyday speech']] },
    { title: 'Poppies, War Photographer and Kamikaze', qs: [
      ['Poppies is told by…', 'A mother whose son leaves', ['A soldier', 'A pilot', 'A photographer']],
      ['"Spools of suffering set out in ordered rows" is from…', 'War Photographer', ['Poppies', 'Tissue', 'Remains']],
      ['In Kamikaze, the pilot…', 'Turns back and is shunned by his family', ['Completes his mission', 'Becomes a hero', 'Writes a letter']],
      ['War Photographer contrasts war zones with…', 'Comfortable life in England', ['Other wars', 'The sea', 'A school']],
      ['Poppies uses images of…', 'Childhood and home', ['Weapons only', 'Mountains', 'Ships']],
    ], terms: [['Grief', 'Deep sorrow after loss'], ['Juxtaposition', 'Two contrasting things side by side'], ['Shame', 'Feeling of disgrace'], ['Imagery', 'Language that creates pictures']] },
    { title: 'Identity and nature: Tissue, The Emigrée, Checking Out Me History, Storm on the Island', qs: [
      ['"Paper that lets the light / shine through" is from…', 'Tissue', ['The Emigrée', 'London', 'Storm on the Island']],
      ['In The Emigrée, the speaker remembers her city as…', 'Sunlight-clear', ['Dark and cold', 'Full of war only', 'A desert']],
      ['Checking Out Me History is about…', 'Identity and history left out of school lessons', ['A storm', 'A duke', 'A soldier\'s death']],
      ['"We are prepared" opens…', 'Storm on the Island', ['Exposure', 'Tissue', 'Kamikaze']],
      ['Who wrote Checking Out Me History?', 'John Agard', ['Seamus Heaney', 'Imtiaz Dharker', 'Carol Rumens']],
    ], terms: [['Identity', 'Who you are and where you belong'], ['Dialect', 'Local form of a language'], ['Extended metaphor', 'A metaphor developed through a text'], ['Fragility', 'Being easily broken']] },
  ] },
  { title: 'Unseen poetry', desc: 'Tackling a poem you have never seen', lessons: [
    { title: 'Reading an unseen poem', qs: [
      ['What should you do first with an unseen poem?', 'Read it twice and work out what it is about', ['Count the syllables', 'Write about the poet\'s life', 'List every technique']],
      ['Free verse has…', 'No regular rhyme or rhythm', ['Fourteen lines', 'A strict rhyme scheme', 'Three lines']],
      ['A volta is…', 'A turn or shift in a poem', ['A rhyme', 'A stanza', 'A title']],
      ['The tone of a poem is…', 'Its mood or attitude', ['Its length', 'Its rhyme', 'Its title']],
      ['The best way to compare two unseen poems is to…', 'Link ideas and methods throughout', ['Write about one then the other with no links', 'Only compare titles', 'Count lines']],
    ], terms: [['Stanza', 'Group of lines in a poem'], ['Volta', 'Turning point in a poem'], ['Rhyme scheme', 'Pattern of rhymes'], ['Free verse', 'No fixed rhyme or rhythm']] },
  ] },
];
