// ---------- Data: questions array (8 objects) ----------
const questions = [
  {
    question: "Which keyword declares a block-scoped variable that can be reassigned?",
    options: ["var", "let", "const", "static"],
    answer: "let"
  },
  {
    question: "What does `typeof []` return in JavaScript?",
    options: ["array", "list", "object", "undefined"],
    answer: "object"
  },
  {
    question: "Which array method adds an item to the END of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: "push()"
  },
  {
    question: "Which DOM method creates a new HTML element?",
    options: ["document.makeElement()", "document.createElement()", "document.newTag()", "document.buildNode()"],
    answer: "document.createElement()"
  },
  {
    question: "Which method attaches a click handler to an element?",
    options: ["onClickAdd()", "attachEvent()", "addEventListener()", "bindClick()"],
    answer: "addEventListener()"
  },
  {
    question: "What is the result of `'5' + 3` in JavaScript?",
    options: ["8", "53", "NaN", "Error"],
    answer: "53"
  },
  {
    question: "Which loop is best when you know how many times to iterate?",
    options: ["for loop", "do...while loop", "if statement", "switch statement"],
    answer: "for loop"
  },
  {
    question: "How do you read the number of items in an array called `arr`?",
    options: ["arr.size", "arr.count()", "arr.length", "length(arr)"],
    answer: "arr.length"
  }
];

// ---------- State ----------
let currentIndex = 0;
let score = 0;
let answered = false;

// ---------- DOM references ----------
const quizEl = document.getElementById("quiz");
const nextBtn = document.getElementById("next-btn");
const progressText = document.getElementById("progress-text");
const scoreText = document.getElementById("score-text");
const barFill = document.getElementById("bar-fill");

// ---------- Helpers ----------
function updateHeader() {
  const shown = Math.min(currentIndex + 1, questions.length);
  progressText.textContent = `Question ${shown} of ${questions.length}`;
  scoreText.textContent = `Score: ${score}`;
  barFill.style.width = `${(currentIndex / questions.length) * 100}%`;
}

function getFeedback(finalScore) {
  const percent = (finalScore / questions.length) * 100;
  if (percent === 100) return "🏆 Perfect score! You're a JavaScript wizard!";
  if (percent >= 75) return "🎉 Great job! You know your JavaScript well.";
  if (percent >= 50) return "👍 Good effort! A little more practice and you'll ace it.";
  return "📚 Keep practicing — review arrays, loops and the DOM, then try again!";
}

// ---------- Render a question ----------
function showQuestion() {
  answered = false;
  quizEl.innerHTML = "";
  nextBtn.disabled = true;
  nextBtn.classList.remove("hidden");
  nextBtn.textContent = currentIndex === questions.length - 1 ? "Finish Quiz" : "Next Question";

  const current = questions[currentIndex];

  const questionEl = document.createElement("h2");
  questionEl.className = "question";
  questionEl.textContent = current.question;

  const optionsEl = document.createElement("div");
  optionsEl.className = "options";

  current.options.forEach((optionText) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = optionText;
    btn.addEventListener("click", () => selectOption(btn, optionText));
    optionsEl.appendChild(btn);
  });

  const feedbackEl = document.createElement("p");
  feedbackEl.className = "feedback";
  feedbackEl.id = "feedback";

  quizEl.append(questionEl, optionsEl, feedbackEl);
  updateHeader();
}

// ---------- Handle an answer ----------
function selectOption(selectedBtn, selectedText) {
  if (answered) return;
  answered = true;

  const correctAnswer = questions[currentIndex].answer;
  const feedbackEl = document.getElementById("feedback");
  const allButtons = quizEl.querySelectorAll(".option");

  if (selectedText === correctAnswer) {
    selectedBtn.classList.add("correct");
    score++;
    feedbackEl.textContent = "✅ Correct!";
  } else {
    selectedBtn.classList.add("wrong");
    allButtons.forEach((b) => {
      if (b.textContent === correctAnswer) b.classList.add("correct");
    });
    feedbackEl.textContent = `❌ Wrong! The correct answer is: ${correctAnswer}`;
  }

  allButtons.forEach((b) => (b.disabled = true));
  nextBtn.disabled = false;
  scoreText.textContent = `Score: ${score}`;
}

// ---------- Final screen ----------
function showResult() {
  quizEl.innerHTML = "";
  nextBtn.classList.add("hidden");
  barFill.style.width = "100%";
  progressText.textContent = "Quiz complete!";
  scoreText.textContent = `Score: ${score}`;

  const wrap = document.createElement("div");
  wrap.className = "result";

  const emoji = document.createElement("div");
  emoji.className = "emoji";
  emoji.textContent = score >= questions.length * 0.75 ? "🎯" : "💡";

  const heading = document.createElement("h2");
  heading.textContent = `You scored ${score} out of ${questions.length}`;

  const message = document.createElement("p");
  message.textContent = getFeedback(score);

  const restartBtn = document.createElement("button");
  restartBtn.className = "btn primary";
  restartBtn.textContent = "Restart Quiz";
  restartBtn.addEventListener("click", restartQuiz);

  wrap.append(emoji, heading, message, restartBtn);
  quizEl.appendChild(wrap);
}

// ---------- Restart ----------
function restartQuiz() {
  currentIndex = 0;
  score = 0;
  showQuestion();
}

// ---------- Next button ----------
nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

// ---------- Start ----------
showQuestion();
