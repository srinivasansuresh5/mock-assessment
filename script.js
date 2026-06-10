const optionLabels = ["A", "B", "C", "D"];
const TOPIC_DURATION_SEC = 30 * 60;
const TOTAL_DURATION_SEC = 2 * 60 * 60;

const examData = [
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

const state = {
  started: false,
  topicIndex: 0,
  questionIndex: 0,
  totalRemaining: TOTAL_DURATION_SEC,
  topicRemaining: TOPIC_DURATION_SEC,
  answers: examData.map((topic) => Array(topic.questions.length).fill(null)),
  scores: examData.map(() => 0),
  timerId: null,
};

const startScreen = document.getElementById("start-screen");
const examScreen = document.getElementById("exam-screen");
const topicResultScreen = document.getElementById("topic-result-screen");
const finalResultScreen = document.getElementById("final-result-screen");
const startBtn = document.getElementById("start-btn");
const topicTitle = document.getElementById("topic-title");
const questionCounter = document.getElementById("question-counter");
const topicTimerEl = document.getElementById("topic-timer");
const totalTimerEl = document.getElementById("total-timer");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");

startBtn.addEventListener("click", startExam);
nextBtn.addEventListener("click", goNext);

function startExam() {
  state.started = true;
  startScreen.classList.add("hidden");
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
  return examData[state.topicIndex];
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
  const total = examData[topicIdx].questions.length;
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

  if (state.topicIndex < examData.length - 1 && state.totalRemaining > 0) {
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

  const rows = examData
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
