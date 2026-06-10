const optionLabels = ["A", "B", "C", "D"];
const TOPIC_DURATION_SEC = 30 * 60;
const TOTAL_DURATION_SEC = 2 * 60 * 60;

const engineerExamData = [
  {
    name: "Pattern Recognition",
    questions: [
      { prompt: "Find the next term: 2, 10, 30, 68, 130, 222, ?", options: ["330", "344", "350", "372"], correctIndex: 2, explanation: "The pattern is n^3 + n for n = 1..7. So next is 7^3 + 7 = 350." },
      { prompt: "Find the next term: 1, 4, 13, 40, 121, 364, ?", options: ["1089", "1093", "1096", "1101"], correctIndex: 1, explanation: "Each term is previous x3 + 1. So 364 x 3 + 1 = 1093." },
      { prompt: "Find the next term: 5, 9, 17, 33, 65, 129, ?", options: ["255", "257", "259", "261"], correctIndex: 1, explanation: "Differences double: +4, +8, +16, +32, +64, so next +128 gives 257." },
      { prompt: "Find the next term: 2, 6, 12, 20, 30, 42, ?", options: ["52", "54", "56", "58"], correctIndex: 2, explanation: "Differences are +4, +6, +8, +10, +12; next +14 => 56." },
      { prompt: "Find the next term: 81, 27, 9, 3, 1, 1/3, ?", options: ["1/6", "1/8", "1/9", "1/12"], correctIndex: 2, explanation: "Each term is divided by 3. So next is 1/9." },
      { prompt: "Find the next term: 4, 18, 48, 100, 180, ?", options: ["252", "270", "294", "306"], correctIndex: 2, explanation: "Term pattern is n(n+1)^2: 1x4, 2x9, 3x16, 4x25, 5x36. Next 6x49 = 294." },
      { prompt: "Find the next term: 3, 12, 7, 28, 11, 44, 15, ?", options: ["52", "56", "60", "64"], correctIndex: 2, explanation: "Two interleaved series: odd terms 3,7,11,15 (+4); even terms 12,28,44 (+16). Next even term is 60." },
      { prompt: "Find the next term: 2, 3, 6, 15, 42, 123, ?", options: ["360", "363", "366", "369"], correctIndex: 2, explanation: "Each term is previous x3 - 3. So 123 x 3 - 3 = 366." },
      { prompt: "Find the next term: 4, 7, 11, 18, 29, 47, ?", options: ["70", "74", "76", "78"], correctIndex: 2, explanation: "From term 3 onward, each term is sum of previous two. Next is 29 + 47 = 76." },
      { prompt: "Find the next term: 1, 8, 27, 64, 125, ?", options: ["196", "216", "225", "243"], correctIndex: 1, explanation: "These are cubes: 1^3, 2^3, 3^3, 4^3, 5^3. Next is 6^3 = 216." },
      { prompt: "Find the next term: 6, 11, 21, 36, 56, 81, ?", options: ["106", "109", "111", "113"], correctIndex: 2, explanation: "Differences are +5, +10, +15, +20, +25. Next +30 => 111." },
      { prompt: "Find the next term: 2, 5, 12, 27, 58, ?", options: ["111", "115", "117", "121"], correctIndex: 2, explanation: "Each term follows previous x2 + 1. So 58 x 2 + 1 = 117." },
      { prompt: "Find the next pair: AZ, BY, CX, DW, ?", options: ["EU", "EV", "EW", "EX"], correctIndex: 1, explanation: "First letter increases A,B,C,D,E while second decreases Z,Y,X,W,V. So EV." },
      { prompt: "Find the next term: 1, 2, 6, 24, 120, 720, ?", options: ["1440", "2880", "4320", "5040"], correctIndex: 3, explanation: "Factorial pattern: 1!,2!,3!,4!,5!,6!, next 7! = 5040." },
      { prompt: "Find the next term: 13, 18, 27, 40, 57, 78, ?", options: ["99", "101", "103", "105"], correctIndex: 2, explanation: "Differences are +5, +9, +13, +17, +21. Next +25 => 103." },
    ],
  },
  {
    name: "Logical and Numerical Reasoning",
    questions: [
      { prompt: "12 workers complete a task in 15 days. How many workers are needed to complete it in 20 days?", options: ["8", "9", "10", "11"], correctIndex: 1, explanation: "Work is constant: 12x15 = W x20 => W = 9." },
      { prompt: "A train crosses a 150 m platform in 15 s and a pole in 9 s. What is the train length?", options: ["180 m", "210 m", "225 m", "240 m"], correctIndex: 2, explanation: "Let length be L. L/9 = (L+150)/15 => 15L = 9L + 1350 => L = 225." },
      { prompt: "Find the smallest number that leaves remainders 1, 2, 3 when divided by 2, 3, 4 respectively.", options: ["7", "11", "23", "59"], correctIndex: 1, explanation: "n+1 must be divisible by 2,3,4 so n+1=12k. Smallest n=11." },
      { prompt: "If 5A = 4B = 3C and C = 120, then A equals:", options: ["72", "80", "96", "100"], correctIndex: 0, explanation: "Let 5A=4B=3C=k. Since C=120, k=360. Then A=360/5=72." },
      { prompt: "A sum doubles in 8 years at simple interest. In how many years will it triple?", options: ["12", "14", "16", "18"], correctIndex: 2, explanation: "If doubling takes 8 years, earning one principal takes 8 years. To triple, need two principals => 16 years." },
      { prompt: "In a class, ratio of boys to girls is 7:5. If 12 girls join, ratio becomes 7:6. Number of boys is:", options: ["70", "77", "84", "91"], correctIndex: 2, explanation: "Let boys=7x, girls=5x. 7x/(5x+12)=7/6 => x=12 => boys=84." },
      { prompt: "A and B together do work in 12 days. A alone in 20 days. B alone in:", options: ["24 days", "30 days", "36 days", "48 days"], correctIndex: 1, explanation: "B rate = 1/12 - 1/20 = 1/30. So B takes 30 days." },
      { prompt: "What is the next number: 2, 6, 12, 20, 30, ?", options: ["36", "40", "42", "44"], correctIndex: 2, explanation: "Pattern is n(n+1): 1x2,2x3,... next 6x7 = 42." },
      { prompt: "If ALL ROSES are FLOWERS and SOME FLOWERS fade quickly, which conclusion is definitely true?", options: ["Some roses fade quickly", "All flowers are roses", "No roses fade quickly", "Roses are flowers"], correctIndex: 3, explanation: "The guaranteed conclusion is only that all roses are flowers." },
      { prompt: "A number when divided by 7 gives remainder 5. What is remainder when 3n is divided by 7?", options: ["1", "2", "3", "4"], correctIndex: 0, explanation: "n=7k+5 => 3n=21k+15 => remainder 1." },
      { prompt: "The average of 8 numbers is 15. If one number 24 is replaced by 40, new average is:", options: ["16", "16.5", "17", "17.5"], correctIndex: 2, explanation: "Total increases by 16. New average = (8x15+16)/8 = 17." },
      { prompt: "If today is Wednesday, what day will it be after 100 days?", options: ["Friday", "Saturday", "Sunday", "Monday"], correctIndex: 0, explanation: "100 mod 7 = 2. Wednesday + 2 days = Friday." },
      { prompt: "A code: CAT -> DBU (each letter +1). Then MIND -> ?", options: ["NJOF", "NJOE", "NKOE", "OJOF"], correctIndex: 1, explanation: "Shift each letter by +1: M->N, I->J, N->O, D->E => NJOE." },
      { prompt: "Which is the odd one out? 121, 169, 225, 289, 361, 441", options: ["169", "225", "289", "361"], correctIndex: 1, explanation: "All are odd squares, but among given options 225 = 15^2 breaks the prime-square subset (13^2,17^2,19^2)." },
      { prompt: "A can complete a job in 15 days and B in 10 days. Working together for 3 days, fraction of work left is:", options: ["1/3", "2/5", "1/2", "3/5"], correctIndex: 2, explanation: "Combined rate is 1/15+1/10=1/6. In 3 days done 1/2, so 1/2 remains." },
    ],
  },
  {
    name: "Sequential Process Reasoning",
    questions: [
      { prompt: "A process has steps A,B,C,D,E,F. Constraints: A before D, B before C, C before E, D before F, E before F. Which sequence is valid?", options: ["B A C D E F", "A B D C E F", "B A D C E F", "A C B D E F"], correctIndex: 0, explanation: "Only B A C D E F satisfies all precedence constraints." },
      { prompt: "Tasks P,Q,R,S,T where P before Q and R, Q before S, R before T, S before T. Which must be first?", options: ["Q", "P", "R", "S"], correctIndex: 1, explanation: "P is prerequisite for both Q and R, so it must be first." },
      { prompt: "Startup order: Power -> BIOS -> Bootloader -> Kernel -> Services -> Login. If BIOS fails, immediate blocked next stage is:", options: ["Kernel", "Services", "Bootloader", "Login"], correctIndex: 2, explanation: "Bootloader is the immediate next stage after BIOS." },
      { prompt: "In a 5-stage pipeline S1->S2->S3->S4->S5, if S3 output is invalid, earliest mandatory rerun stage is:", options: ["S1", "S2", "S3", "S4"], correctIndex: 2, explanation: "The invalid output is generated at S3, so rerun from S3 onward." },
      { prompt: "Order flow: Validate Order -> Reserve Stock -> Process Payment -> Generate Invoice -> Ship. If payment fails, what should be rolled back first?", options: ["Validate Order", "Reserve Stock", "Generate Invoice", "Ship"], correctIndex: 1, explanation: "Reserve Stock is prior side effect and must be reversed first." },
      { prompt: "Workflow dependencies: A->C, B->C, C->D. Which tasks can run in parallel at start?", options: ["A and B", "B and C", "C and D", "A and D"], correctIndex: 0, explanation: "A and B have no prerequisites and can start together." },
      { prompt: "Data pipeline: Extract -> Clean -> Transform -> Validate -> Load. If validation fails, immediate previous stage to inspect is:", options: ["Extract", "Clean", "Transform", "Load"], correctIndex: 2, explanation: "Validate checks transformed output, so inspect Transform first." },
      { prompt: "Release stages: Code Freeze, QA Sign-off, Security Review, Release Approval, Production Deploy. Which order is valid?", options: ["Code Freeze -> Security -> QA -> Approval -> Deploy", "Code Freeze -> QA -> Security -> Approval -> Deploy", "QA -> Code Freeze -> Security -> Approval -> Deploy", "Code Freeze -> Approval -> QA -> Security -> Deploy"], correctIndex: 1, explanation: "Freeze first, then QA/security checks, then approval, then deploy." },
      { prompt: "If step X must occur exactly between Y and Z, which sequence is valid?", options: ["Y Z X", "X Y Z", "Y X Z", "Z X Y"], correctIndex: 2, explanation: "X is directly between Y and Z only in Y X Z." },
      { prompt: "Incident response: Detect -> Triage -> Contain -> Eradicate -> Recover -> Postmortem. If Contain is skipped, which immediate next phase is most at risk?", options: ["Detect", "Triage", "Eradicate", "Postmortem"], correctIndex: 2, explanation: "Eradication without containment risks ongoing spread and reinfection." },
      { prompt: "A 4-step approval requires step 1 and 2 in any order, then 3, then 4. Number of valid sequences?", options: ["1", "2", "3", "4"], correctIndex: 1, explanation: "Only 1 and 2 can swap; 3 and 4 are fixed. Total 2." },
      { prompt: "Build process: Compile -> Unit Test -> Package -> Integration Test -> Deploy. If integration fails after fixes, earliest mandatory rerun is:", options: ["Compile", "Unit Test", "Package", "Integration Test"], correctIndex: 2, explanation: "A corrected build must be packaged before rerunning integration tests." },
      { prompt: "Given precedence: M before N, N before O, M before P, P before O. Which statement is always true?", options: ["P before N", "N before P", "M before O", "O before M"], correctIndex: 2, explanation: "Both paths force M to happen before O." },
      { prompt: "Step A can retry up to 2 times before B starts. Worst-case attempts of A before B starts?", options: ["1", "2", "3", "4"], correctIndex: 2, explanation: "One initial attempt plus two retries equals 3 attempts." },
      { prompt: "Schedule K,L,M,N with rules K before M, L before N, and M before N. Which sequence is valid?", options: ["L K M N", "K M N L", "K L N M", "M K L N"], correctIndex: 0, explanation: "Only L K M N satisfies all three constraints." },
    ],
  },
  {
    name: "Computational Reasoning",
    questions: [
      { prompt: "Time complexity of binary search on sorted array of n elements?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], correctIndex: 1, explanation: "Binary search halves the search space each step." },
      { prompt: "Pseudocode: x=1; for i=1 to 4: x=x*2; print x. Output?", options: ["8", "16", "32", "64"], correctIndex: 1, explanation: "x doubles four times: 1->2->4->8->16." },
      { prompt: "Given n=13 (binary 1101), what is n<<1 in decimal?", options: ["14", "24", "26", "27"], correctIndex: 2, explanation: "Left shift by one bit multiplies by 2: 13 x 2 = 26." },
      { prompt: "Which data structure best supports FIFO behavior?", options: ["Stack", "Queue", "Heap", "Tree"], correctIndex: 1, explanation: "FIFO is queue behavior." },
      { prompt: "If a hash table has many collisions, expected lookup time trends toward:", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], correctIndex: 2, explanation: "With heavy collisions, lookups degrade toward linear time." },
      { prompt: "Pseudocode: sum=0; for i=1..5: if i%2==0 sum+=i. Final sum?", options: ["5", "6", "8", "10"], correctIndex: 1, explanation: "Even numbers are 2 and 4, so sum = 6." },
      { prompt: "For recurrence T(n)=2T(n/2)+n, asymptotic complexity is:", options: ["O(n)", "O(log n)", "O(n log n)", "O(n^2)"], correctIndex: 2, explanation: "By Master theorem, T(n)=Theta(n log n)." },
      { prompt: "Which sorting algorithm is stable in standard form?", options: ["Selection sort", "Heap sort", "Merge sort", "Quick sort"], correctIndex: 2, explanation: "Merge sort is stable in its standard implementation." },
      { prompt: "Evaluate: f(n){ if(n<=1)return 1; return n*f(n-1);} What is f(4)?", options: ["16", "20", "24", "32"], correctIndex: 2, explanation: "This is factorial recursion: 4x3x2x1 = 24." },
      { prompt: "Which traversal of a BST yields sorted keys?", options: ["Preorder", "Inorder", "Postorder", "Level-order"], correctIndex: 1, explanation: "Inorder traversal returns BST keys in ascending order." },
      { prompt: "Adjacency matrix storage for V vertices needs space:", options: ["O(V+E)", "O(V log V)", "O(V^2)", "O(E^2)"], correctIndex: 2, explanation: "Matrix has VxV entries." },
      { prompt: "Pseudocode bubble-sort pass on [3,1,4,2] to completion yields:", options: ["[1,2,3,4]", "[1,3,2,4]", "[2,1,3,4]", "[4,3,2,1]"], correctIndex: 0, explanation: "Bubble sort ascending fully sorts to [1,2,3,4]." },
      { prompt: "Bitwise result of 14 AND 11 is:", options: ["8", "10", "12", "14"], correctIndex: 1, explanation: "1110 AND 1011 = 1010 (decimal 10)." },
      { prompt: "Dijkstra shortest path algorithm primarily uses which paradigm?", options: ["Divide and conquer", "Greedy", "Dynamic programming", "Backtracking"], correctIndex: 1, explanation: "It repeatedly takes the locally optimal unsettled node (greedy)." },
      { prompt: "Stack ops: push 1, push 2, pop, push 3, pop. Popped sequence is:", options: ["1,2", "2,3", "3,2", "2,1"], correctIndex: 1, explanation: "LIFO gives first pop 2, second pop 3." },
    ],
  },
];

const tpmExamData = [
  {
    name: "Logical and Numerical Reasoning",
    questions: [
      { prompt: "A team of 6 engineers completes a feature in 12 days. To finish the same work in 8 days, how many engineers are needed?", options: ["7", "8", "9", "10"], correctIndex: 2, explanation: "Total work = 6×12 = 72 person-days. Engineers needed = 72/8 = 9." },
      { prompt: "A SaaS product has 500 users in January and grows 20% each month. How many users are there in March?", options: ["600", "700", "720", "750"], correctIndex: 2, explanation: "500 × 1.2 × 1.2 = 720 users." },
      { prompt: "A PM has a $120K budget. Three features cost $45K, $38K, and $52K respectively. What is the maximum number of features that can be funded?", options: ["1", "2", "3", "All three"], correctIndex: 1, explanation: "$45K + $38K = $83K which is within budget. Adding $52K gives $135K which exceeds it, so 2 features maximum." },
      { prompt: "Team velocity is 40 story points per sprint. The backlog contains 320 story points. How many sprints are needed?", options: ["6", "7", "8", "9"], correctIndex: 2, explanation: "320 / 40 = 8 sprints." },
      { prompt: "Monthly churn rate is 5%. Starting with 2000 subscribers, how many remain after 2 months?", options: ["1800", "1805", "1808", "1900"], correctIndex: 1, explanation: "2000 × 0.95 × 0.95 = 2000 × 0.9025 = 1805." },
      { prompt: "Revenue grew from $2M to $3.5M over 2 years. What is the approximate CAGR?", options: ["25%", "32%", "37%", "50%"], correctIndex: 1, explanation: "CAGR = √(3.5/2) − 1 = √1.75 − 1 ≈ 1.3229 − 1 ≈ 32%." },
      { prompt: "3 out of every 25 users report a bug. With 10,000 users, how many bug reports are expected?", options: ["1,000", "1,200", "1,500", "2,000"], correctIndex: 1, explanation: "(3/25) × 10,000 = 1,200." },
      { prompt: "Version A converts 8% of 600 users. Version B converts 10% of 450 users. Which version has more absolute conversions?", options: ["Version A", "Version B", "Equal", "Cannot determine"], correctIndex: 0, explanation: "Version A: 0.08 × 600 = 48. Version B: 0.10 × 450 = 45. Version A has more conversions." },
      { prompt: "If 'All high-priority features are in Sprint 1' is true, which conclusion must also be true?", options: ["All Sprint 1 features are high priority", "If a feature is not in Sprint 1, it is not high priority", "Some Sprint 1 features are low priority", "Sprint 1 has no low-priority features"], correctIndex: 1, explanation: "The contrapositive of 'high-priority → Sprint 1' is 'not in Sprint 1 → not high-priority', which is logically equivalent." },
      { prompt: "A document review requires 3 sequential reviews: A (2 days), B (3 days), C (4 days). Total review time is:", options: ["6 days", "7 days", "8 days", "9 days"], correctIndex: 3, explanation: "Sequential: 2 + 3 + 4 = 9 days." },
      { prompt: "A PM spends 40% of an 8-hour day on product work. A feature requires 80 hours of PM product work. How many workdays are needed?", options: ["15", "20", "25", "30"], correctIndex: 2, explanation: "PM product hours per day = 0.4 × 8 = 3.2 hours. Days = 80 / 3.2 = 25." },
      { prompt: "Feature W depends on Y, and Y depends on X shipped in Q1. Earliest quarter W can ship is:", options: ["Q2", "Q3", "Q4", "Q5"], correctIndex: 1, explanation: "X→Q1, Y→Q2 (depends on X), W→Q3 (depends on Y). Earliest W can ship is Q3." },
      { prompt: "An A/B test runs for 2 weeks. Week 1: 200 users, 10% conversion. Week 2: 300 users, 8% conversion. Overall conversion rate is:", options: ["8.8%", "9.0%", "9.2%", "9.5%"], correctIndex: 0, explanation: "Total conversions = 20 + 24 = 44. Total users = 500. Rate = 44/500 = 8.8%." },
      { prompt: "If 5 out of 8 user interviews mention the same pain point, what percentage is that?", options: ["55%", "60%", "62.5%", "65%"], correctIndex: 2, explanation: "5/8 = 0.625 = 62.5%." },
      { prompt: "A sprint backlog has 10 stories: 4 at 3 points, 3 at 5 points, 3 at 8 points. Total sprint points:", options: ["45", "51", "55", "63"], correctIndex: 1, explanation: "4×3 + 3×5 + 3×8 = 12 + 15 + 24 = 51." },
    ],
  },
  {
    name: "Discovery and Strategy",
    questions: [
      { prompt: "In Jobs-to-be-Done (JTBD) theory, a 'job' refers to:", options: ["A coding task assigned to a developer", "The progress a customer wants to make in their life", "A feature on the product backlog", "A sprint story point"], correctIndex: 1, explanation: "JTBD defines a 'job' as the underlying progress a customer is trying to make in their situation." },
      { prompt: "TAM (Total Addressable Market) represents:", options: ["The company's current annual revenue", "The maximum revenue opportunity if 100% market share is captured", "The market segment currently served", "The product's development budget"], correctIndex: 1, explanation: "TAM is the total revenue opportunity available if a product achieves 100% market share." },
      { prompt: "A product has high user satisfaction scores but low market adoption. This most likely indicates a problem with:", options: ["Product quality", "Product-market fit", "Engineering execution", "User interface design"], correctIndex: 1, explanation: "High satisfaction but low adoption suggests the product serves its users well but hasn't found the right market or distribution channel." },
      { prompt: "The 'Blue Ocean Strategy' advises companies to:", options: ["Out-compete rivals in existing markets", "Create uncontested market space", "Reduce costs across all operations", "Copy the market leader's strategy"], correctIndex: 1, explanation: "Blue Ocean Strategy focuses on creating new market space where competition is irrelevant." },
      { prompt: "Porter's Five Forces does NOT include:", options: ["Supplier bargaining power", "Buyer bargaining power", "Threat of substitutes", "Employee satisfaction"], correctIndex: 3, explanation: "Porter's Five Forces are: competitive rivalry, supplier power, buyer power, threat of new entrants, and threat of substitutes. Employee satisfaction is not a force." },
      { prompt: "In a SWOT analysis, a new well-funded competitor entering your market is classified as a:", options: ["Strength", "Weakness", "Opportunity", "Threat"], correctIndex: 3, explanation: "External negative factors are classified as Threats in a SWOT analysis." },
      { prompt: "Net Promoter Score (NPS) is calculated as:", options: ["Average of all survey scores", "% Promoters minus % Detractors", "% Promoters plus % Passives", "Total responses divided by 10"], correctIndex: 1, explanation: "NPS = % Promoters (score 9-10) − % Detractors (score 0-6)." },
      { prompt: "A company launches a product without first validating whether customers want it. This violates core principles of:", options: ["Agile manifesto", "Lean startup methodology", "Waterfall methodology", "Design system thinking"], correctIndex: 1, explanation: "Lean Startup emphasizes validated learning: build-measure-learn to avoid building products nobody wants." },
      { prompt: "Which research method is best suited for understanding the 'why' behind user behavior?", options: ["A/B testing", "User interviews", "Click-through analytics", "Heatmaps"], correctIndex: 1, explanation: "User interviews reveal qualitative insights into motivations, context, and reasoning that quantitative methods cannot." },
      { prompt: "A 'competitive moat' in product strategy refers to:", options: ["A product's marketing budget", "A sustainable competitive advantage that is hard to replicate", "The product's feature list", "Company brand colors and design"], correctIndex: 1, explanation: "A competitive moat is a durable advantage (network effects, switching costs, IP) that protects against competition." },
      { prompt: "OKR stands for:", options: ["Operational Key Responsibilities", "Objectives and Key Results", "Organizational Knowledge Repository", "Output and Key Reviews"], correctIndex: 1, explanation: "OKR = Objectives (qualitative goals) and Key Results (measurable outcomes to track progress)." },
      { prompt: "Product-market fit is best evidenced by:", options: ["A large engineering team", "High NPS scores and strong organic growth", "Receiving venture capital funding", "Positive employee morale"], correctIndex: 1, explanation: "PMF shows when users love the product enough to recommend it, driving retention and organic growth." },
      { prompt: "In product discovery, a problem statement should focus on:", options: ["The proposed technical solution", "The user's unmet need or pain point", "The team's current capabilities", "A competitor's feature set"], correctIndex: 1, explanation: "Problem statements should be solution-agnostic and center on the user's actual need." },
      { prompt: "A 'pivot' in product development means:", options: ["Fixing a critical production bug", "A structured course correction to test a new hypothesis", "Adding a major new feature", "Launching the product in a new geography"], correctIndex: 1, explanation: "A pivot is a deliberate change to a core business or product hypothesis while retaining lessons learned." },
      { prompt: "Which user research technique involves observing users in their natural environment?", options: ["Usability testing in a lab", "Contextual inquiry / field study", "Online surveys", "Card sorting"], correctIndex: 1, explanation: "Contextual inquiry involves observing and interviewing users in their real environment to capture authentic behavior and context." },
    ],
  },
  {
    name: "Prioritization and Roadmapping",
    questions: [
      { prompt: "In the RICE scoring framework, 'I' stands for:", options: ["Innovation", "Impact", "Investment", "Integration"], correctIndex: 1, explanation: "RICE = Reach × Impact × Confidence / Effort. 'I' stands for Impact." },
      { prompt: "RICE score is calculated as:", options: ["(Reach + Impact + Confidence) / Effort", "(Reach × Impact × Confidence) / Effort", "Reach × Impact / (Confidence + Effort)", "(Reach + Impact) × Confidence / Effort"], correctIndex: 1, explanation: "RICE = (Reach × Impact × Confidence) / Effort. Higher score = higher priority." },
      { prompt: "In MoSCoW prioritization, 'S' stands for:", options: ["Strategy", "Serious", "Should have", "Sprint"], correctIndex: 2, explanation: "MoSCoW = Must have, Should have, Could have, Won't have." },
      { prompt: "Feature A has a RICE score of 100; Feature B has a RICE score of 150. With capacity for only one, which should be prioritized?", options: ["Feature A (lower scope risk)", "Feature B (higher RICE score)", "Neither; more data needed", "Ask the CEO"], correctIndex: 1, explanation: "Higher RICE score indicates greater expected impact per unit of effort, so Feature B is prioritized." },
      { prompt: "In the Kano model, features that cause dissatisfaction when absent but go unnoticed when present are called:", options: ["Performance features", "Excitement (Delighters)", "Basic / Must-be features", "Indifferent features"], correctIndex: 2, explanation: "Must-be (Basic) features are taken for granted by users; their absence causes dissatisfaction but their presence doesn't delight." },
      { prompt: "A 'Now-Next-Later' roadmap is most useful for:", options: ["Communicating exact delivery dates", "Conveying relative time horizons without committing to dates", "Assigning sprint tasks", "Documenting technical architecture"], correctIndex: 1, explanation: "Now-Next-Later communicates sequence and rough priority without over-committing to specific dates." },
      { prompt: "Technical debt should be prioritized when it:", options: ["Has no observable user impact", "Significantly slows down the team's ability to deliver new features", "Is requested by an investor", "Was introduced more than a year ago"], correctIndex: 1, explanation: "Technical debt that degrades team velocity has a direct business cost and warrants explicit prioritization." },
      { prompt: "Opportunity scoring ranks features by:", options: ["Importance to users minus current satisfaction", "Development effort plus complexity", "Expected revenue divided by cost", "Time-to-market estimate"], correctIndex: 0, explanation: "Opportunity Score = Importance − Satisfaction. High importance + low satisfaction = high opportunity to address." },
      { prompt: "An outcome-based roadmap prioritizes:", options: ["Shipping a predefined list of features", "Achieving measurable user or business outcomes", "Following competitor release schedules", "Filling all four calendar quarters evenly"], correctIndex: 1, explanation: "Outcome-based roadmaps focus teams on the desired change in behavior or metric, not just feature delivery." },
      { prompt: "A feature scores 8 on business value (weight 0.6) and 6 on user value (weight 0.4). Its weighted score is:", options: ["6.8", "7.0", "7.2", "7.6"], correctIndex: 2, explanation: "Weighted score = 8 × 0.6 + 6 × 0.4 = 4.8 + 2.4 = 7.2." },
      { prompt: "When stakeholders request conflicting feature priorities, a PM should:", options: ["Implement all requests in the order received", "Implement whichever stakeholder has the highest seniority", "Align priorities to company strategy and OKRs", "Delay all work until the conflict is resolved"], correctIndex: 2, explanation: "Prioritization decisions should be anchored to strategy and measurable goals, not internal politics." },
      { prompt: "The 'ice box' in product management refers to:", options: ["Cold storage for physical hardware", "A repository of ideas deprioritized indefinitely", "Bugs found in production", "Features already released"], correctIndex: 1, explanation: "The ice box holds ideas not actively prioritized but preserved for future consideration." },
      { prompt: "A dependency-first roadmap approach means:", options: ["Features are ordered by team preference", "Features that unblock other features are scheduled first", "Features are listed alphabetically", "Features are randomly sequenced"], correctIndex: 1, explanation: "Scheduling dependency-enabling features first prevents downstream blocking and keeps delivery flow smooth." },
      { prompt: "Which roadmap format is most appropriate for external stakeholder communication?", options: ["Detailed sprint plan", "Feature-level roadmap with exact dates", "Theme-based roadmap with time horizons", "Technical architecture plan"], correctIndex: 2, explanation: "Theme-based roadmaps communicate direction and priorities without over-committing to specific features or dates." },
      { prompt: "Story point estimation primarily measures:", options: ["Exact calendar time to complete a task", "Relative effort and complexity compared to a baseline", "Business value of a feature", "Number of lines of code"], correctIndex: 1, explanation: "Story points are a relative measure of effort/complexity, not calendar time, enabling team-calibrated estimation." },
    ],
  },
  {
    name: "Requirements Definition",
    questions: [
      { prompt: "A well-formed user story follows the format:", options: ["'Feature X with specification Y'", "'As a [user], I want [goal] so that [benefit]'", "'Task: implement X by date Y'", "'Module X with function Y'"], correctIndex: 1, explanation: "The canonical user story template captures who (role), what (goal), and why (benefit/value)." },
      { prompt: "Acceptance criteria define:", options: ["Code-level implementation details", "The conditions under which a feature is considered complete and accepted", "Individual team member responsibilities", "Budget allocation per feature"], correctIndex: 1, explanation: "Acceptance criteria specify the observable, testable conditions a feature must satisfy to be accepted by the product owner." },
      { prompt: "Which of the following is a non-functional requirement (NFR)?", options: ["'User can log in with email and password'", "'The page must load within 2 seconds'", "'User can search the product catalog'", "'System sends a confirmation email on order'"], correctIndex: 1, explanation: "NFRs specify system qualities (performance, security, scalability) rather than specific behaviors." },
      { prompt: "The primary audience of a Product Requirements Document (PRD) is:", options: ["End users and customers", "Engineering and design teams", "Board of directors", "Customer support team"], correctIndex: 1, explanation: "A PRD is written to help engineering and design teams understand what to build and why." },
      { prompt: "An 'edge case' in requirements refers to:", options: ["The most frequent user scenario", "A rare or extreme condition that the system must handle correctly", "A performance load test", "A stakeholder interview finding"], correctIndex: 1, explanation: "Edge cases are boundary conditions or unusual inputs that occur rarely but must be accounted for." },
      { prompt: "The phrase 'The system shall...' is characteristic of:", options: ["User stories", "Functional requirements", "Business cases", "Technical architecture docs"], correctIndex: 1, explanation: "'Shall' statements are the standard IEEE format for specifying functional requirements." },
      { prompt: "Ambiguous requirements most directly lead to:", options: ["Faster feature delivery", "Misaligned implementation and rework", "Better code quality", "Reduced testing effort"], correctIndex: 1, explanation: "Ambiguity forces teams to make assumptions, often resulting in implementations that don't match stakeholder intent." },
      { prompt: "A 'Definition of Done' (DoD) in Agile is:", options: ["The product roadmap for the quarter", "A shared checklist that must be satisfied for a story to be considered complete", "The release notes document", "The list of features in the next sprint"], correctIndex: 1, explanation: "The DoD ensures consistent quality by requiring all team-agreed criteria (tested, reviewed, deployed, etc.) to be met." },
      { prompt: "Which technique helps uncover missing requirements using concrete examples and scenarios?", options: ["UML class diagrams", "Example Mapping / BDD (Behaviour-Driven Development)", "Gantt charts", "SWOT analysis"], correctIndex: 1, explanation: "Example Mapping structures concrete examples (rules, scenarios, questions) to discover gaps and ambiguities before development." },
      { prompt: "In MoSCoW, 'W' (Won't have) items should:", options: ["Be implemented in the current release", "Be considered for a future release but not now", "Never be built under any circumstances", "Be immediately escalated to leadership"], correctIndex: 1, explanation: "'Won't have this time' signals items explicitly out of scope for the current iteration but may be revisited later." },
      { prompt: "A persona in requirements definition is:", options: ["A real user's account in the system", "A fictional, data-informed representation of a user archetype", "A legal entity or registered customer", "A developer alias used in version control"], correctIndex: 1, explanation: "Personas are composite characters built from research data to represent distinct user groups and guide requirement decisions." },
      { prompt: "Requirements traceability means:", options: ["Requirements have sequential ID numbers", "Each requirement can be linked to its source, related tests, and implemented features", "Requirements are stored in a cloud database", "Requirements are written in plain English"], correctIndex: 1, explanation: "Traceability creates verifiable links between requirements, their origins, design decisions, code, and tests." },
      { prompt: "In the story 'As an admin, I want to reset any user's password so that I can help locked-out users', the benefit clause is:", options: ["'As an admin'", "'I want to reset any user's password'", "'so that I can help locked-out users'", "'admin' and 'locked-out users'"], correctIndex: 2, explanation: "The 'so that...' clause captures the benefit and justifies why the feature has value." },
      { prompt: "A good acceptance criterion should be:", options: ["Vague to allow developer flexibility", "Specific, unambiguous, and independently testable", "Written by developers to reflect implementation choices", "Technology-specific to guide coding decisions"], correctIndex: 1, explanation: "Acceptance criteria must be testable and unambiguous so QA can objectively determine pass/fail." },
      { prompt: "A 'constraint' in requirements definition is:", options: ["An optional enhancement for future releases", "A restriction that limits the available solution space", "A fictional user archetype", "A test case for edge scenarios"], correctIndex: 1, explanation: "Constraints (e.g., must use existing database, must comply with GDPR) are non-negotiable boundaries the solution must respect." },
    ],
  },
];

let activeExamData = null;

const state = {
  started: false,
  topicIndex: 0,
  questionIndex: 0,
  totalRemaining: TOTAL_DURATION_SEC,
  topicRemaining: TOPIC_DURATION_SEC,
  answers: [],
  scores: [],
  timerId: null,
};

const roleSelectScreen = document.getElementById("role-select-screen");
const examScreen = document.getElementById("exam-screen");
const topicResultScreen = document.getElementById("topic-result-screen");
const finalResultScreen = document.getElementById("final-result-screen");

const topicTitle = document.getElementById("topic-title");
const questionCounter = document.getElementById("question-counter");
const topicTimerEl = document.getElementById("topic-timer");
const totalTimerEl = document.getElementById("total-timer");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");

nextBtn.addEventListener("click", goNext);
document.getElementById("engineer-tile").addEventListener("click", () => startExam("engineer"));
document.getElementById("tpm-tile").addEventListener("click", () => startExam("tpm"));

function startExam(role) {
  activeExamData = role === "tpm" ? tpmExamData : engineerExamData;
  state.started = true;
  state.topicIndex = 0;
  state.questionIndex = 0;
  state.totalRemaining = TOTAL_DURATION_SEC;
  state.topicRemaining = TOPIC_DURATION_SEC;
  state.answers = activeExamData.map((topic) => Array(topic.questions.length).fill(null));
  state.scores = activeExamData.map(() => 0);
  roleSelectScreen.classList.add("hidden");
  topicResultScreen.classList.add("hidden");
  finalResultScreen.classList.add("hidden");
  examScreen.classList.remove("hidden");
  renderQuestion();
  startTimer();
}

function startTimer() {
  stopTimer();
  state.timerId = setInterval(tick, 1000);
}

function tick() {
  if (!state.started) return;

  state.totalRemaining -= 1;
  state.topicRemaining -= 1;

  if (state.totalRemaining <= 0) {
    state.totalRemaining = 0;
    stopTimer();
    finishExam("Total exam time completed.");
    return;
  }

  if (state.topicRemaining <= 0) {
    state.topicRemaining = 0;
    showTopicResult(true);
    return;
  }

  updateTimers();
}

function stopTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function formatSec(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function getCurrentTopic() {
  return activeExamData[state.topicIndex];
}

function getCurrentQuestion() {
  return getCurrentTopic().questions[state.questionIndex];
}

function updateTimers() {
  topicTimerEl.textContent = formatSec(state.topicRemaining);
  totalTimerEl.textContent = formatSec(state.totalRemaining);
}

function renderQuestion() {
  const topic = getCurrentTopic();
  const q = getCurrentQuestion();
  updateTimers();

  topicTitle.textContent = topic.name;
  questionCounter.textContent = `Question ${state.questionIndex + 1} of ${topic.questions.length}`;
  questionText.textContent = q.prompt;

  const progressPercent = ((state.questionIndex + 1) / topic.questions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;

  optionsEl.innerHTML = "";
  feedbackEl.className = "feedback hidden";
  feedbackEl.textContent = "";
  nextBtn.disabled = true;

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.type = "button";
    btn.textContent = `${optionLabels[index]}. ${option}`;
    btn.addEventListener("click", () => answerQuestion(index));
    optionsEl.appendChild(btn);
  });
}

function answerQuestion(selectedIndex) {
  const q = getCurrentQuestion();
  if (state.answers[state.topicIndex][state.questionIndex] !== null) return;

  const correctIndex = q.correctIndex;
  const isCorrect = selectedIndex === correctIndex;

  state.answers[state.topicIndex][state.questionIndex] = { selectedIndex, isCorrect };
  if (isCorrect) state.scores[state.topicIndex] += 1;

  const buttons = optionsEl.querySelectorAll(".option-btn");
  buttons.forEach((button, idx) => {
    button.disabled = true;
    if (idx === correctIndex) button.classList.add("correct");
    if (idx === selectedIndex && !isCorrect) button.classList.add("wrong");
  });

  feedbackEl.classList.remove("hidden");
  feedbackEl.classList.add(isCorrect ? "ok" : "bad");
  feedbackEl.textContent = `${isCorrect ? "Correct" : "Incorrect"}. You selected ${optionLabels[selectedIndex]}. Correct option is ${optionLabels[correctIndex]}. ${q.explanation}`;

  nextBtn.disabled = false;
}

function goNext() {
  const topic = getCurrentTopic();
  if (state.questionIndex < topic.questions.length - 1) {
    state.questionIndex += 1;
    renderQuestion();
  } else {
    showTopicResult(false);
  }
}

function getTopicStats(topicIdx) {
  const answerRow = state.answers[topicIdx];
  const attempted = answerRow.filter((v) => v !== null).length;
  const correct = state.scores[topicIdx];
  const total = activeExamData[topicIdx].questions.length;
  const wrong = attempted - correct;
  const unattempted = total - attempted;
  const accuracy = attempted ? Math.round((correct / attempted) * 100) : 0;
  return { attempted, correct, wrong, unattempted, total, accuracy };
}

function showTopicResult(timeExpired) {
  stopTimer();
  examScreen.classList.add("hidden");
  topicResultScreen.classList.remove("hidden");

  const topic = getCurrentTopic();
  const stats = getTopicStats(state.topicIndex);

  topicResultScreen.innerHTML = `
    <h2>${topic.name} - Consolidated Result</h2>
    <p class="subtitle">${timeExpired ? "Time expired for this topic." : "Topic completed."}</p>
    <div class="result-grid">
      <div class="result-row"><span>Correct</span><strong>${stats.correct} / ${stats.total}</strong></div>
      <div class="result-row"><span>Wrong</span><strong>${stats.wrong}</strong></div>
      <div class="result-row"><span>Unattempted</span><strong>${stats.unattempted}</strong></div>
      <div class="result-row"><span>Accuracy</span><strong>${stats.accuracy}%</strong></div>
    </div>
  `;

  const btn = document.createElement("button");
  btn.className = "btn primary";

  if (state.topicIndex < activeExamData.length - 1 && state.totalRemaining > 0) {
    btn.textContent = "Continue to Next Topic";
    btn.addEventListener("click", () => {
      state.topicIndex += 1;
      state.questionIndex = 0;
      state.topicRemaining = TOPIC_DURATION_SEC;
      topicResultScreen.classList.add("hidden");
      examScreen.classList.remove("hidden");
      renderQuestion();
      startTimer();
    });
  } else {
    btn.textContent = "View Final Consolidated Result";
    btn.addEventListener("click", () => finishExam("Exam completed."));
  }

  topicResultScreen.appendChild(btn);
}

function finishExam(reason) {
  state.started = false;
  stopTimer();
  examScreen.classList.add("hidden");
  topicResultScreen.classList.add("hidden");
  finalResultScreen.classList.remove("hidden");

  let totalCorrect = 0;
  let totalQuestions = 0;

  const rows = activeExamData
    .map((topic, idx) => {
      const stats = getTopicStats(idx);
      totalCorrect += stats.correct;
      totalQuestions += stats.total;
      return `<div class="result-row"><span>${topic.name}</span><strong>${stats.correct}/${stats.total}</strong></div>`;
    })
    .join("");

  const overallPercent = Math.round((totalCorrect / totalQuestions) * 100);

  finalResultScreen.innerHTML = `
    <h2>Final Consolidated Result</h2>
    <p class="subtitle">${reason}</p>
    <div class="result-grid">${rows}</div>
    <div class="result-row"><span>Total Score</span><strong>${totalCorrect} / ${totalQuestions}</strong></div>
    <div class="result-row"><span>Overall Percentage</span><strong>${overallPercent}%</strong></div>
    <button id="restart-btn" class="btn primary">Restart Exam</button>
  `;

  document.getElementById("restart-btn").addEventListener("click", () => {
    window.location.reload();
  });
}
