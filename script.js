// Trivia Game
// Sources: https://css-tricks.com/restart-css-animation/
var currentQuestionIndex;
var correct = 0;
var question, choice, choices;
var userScore = 0;

function get(x) {
  return document.getElementById(x);
}
// Declare variables
const openButton = get("open");
const modal = get("modal");
const close = get("close");
const askQuestion = get("question");
const getChoices = get("choices");
const listChoices = get("listChoices");
const score = get("score");
const resultScreen = get("overlay");
const results = get("results");
const textbox = get("textbox");
const iconBox = get("boxWithIcons");
const progBar = get("myProgress");
const timer = get('countdown');

const openBox = () => {
  modal.style.display = "block";
};

const closeBox = () => {
    document.location.href = '';
  modal.style.display = "none";
};

openButton.addEventListener("click", openBox);
close.addEventListener("click", closeBox);

const startBtn = get("start");
const hideP = get("hide");

function initialize() {
  clearChoices();
  startTimer();
  currentQuestionIndex = 0;
  startBtn.style.display = "none";
  hideP.style.display = "none";
  progBar.style.display = "block";
  displayQuestion();
}

// Create a class called Question that will use the questions that I put in an array as instances
class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
}

var questions = [
  new Question(
    "Where is Taylor from?",
    ["California", "New York", "Chicago", "Wisconsin", "Tennessee"],
    "New York"
  ),
  new Question(
    "Where did Taylor go to school?",
    [
      "University of Wisconsin-Madison",
      "NYU",
      "University of Oregon",
      "Tulane University",
      "Ohio State University"
    ],
    "University of Wisconsin-Madison"
  ),
  new Question(
    "What field does Taylor hope to work in?",
    [
      "Game Development",
      "Healthcare Technology",
      "Software Sales",
      "Finance",
      "Music"
    ],
    "Healthcare Technology"
  ),
  new Question(
    "Which of the following is Taylor's dog?",
    ["Frida", "Jack", "Snickers", "Lucy", "Taylor"],
    "Frida"
  ),
  new Question(
    "What is Taylor's number one hard skill?",
    [
      "Using a jackhammer",
      "Problem-solving",
      "Technical Writing",
      "Microsoft Word"
    ],
    "Problem-solving"
  ),
  new Question(
    "What is Taylor's strongest soft skill?",
    [
      "Timeliness",
      "Patience",
      "Communication",
      "Leadership",
      "All of the Above"
    ],
    "All of the Above"
  ),
  new Question(
    "What did Taylor study in school?",
    ["Finance", "Agriculture", "Computer Science", "Kinesiology", "English"],
    "Kinesiology"
  ),
  new Question(
    "What is Taylor's favorite condiment?",
    [
      "Ketchup",
      "Old Bay",
      "Mustard",
      "Frank's Hot Sauce",
      "Sriracha",
      "Tabasco"
    ],
    "Frank's Hot Sauce"
  ),
  new Question(
    "What sport did Taylor used to be pretty decent at?",
    ["Football", "Soccer", "Basketball", "Tennis", "Softball"],
    "Basketball"
  ),
  new Question(
    "What is Taylor's favorite hobby?",
    ["Knitting", "Crocheting", "Golfing", "Baking", "Drawing", "Writing poems"],
    "Baking"
  )
];

function correctAnswer(index) {
  index = currentQuestionIndex;
  return questions[index].answer;
}

function clearChoices() {
  let child = listChoices.firstElementChild;
  while (child) {
    listChoices.removeChild(child);
    child = listChoices.firstElementChild;
  }
}

function displayQuestion() {
  if (currentQuestionIndex == questions[questions.length - 1]) {
    askQuestion.innerHTML = `You got ${correct} of ${questions.length} questions correct.`;
  } else if (currentQuestionIndex + 1 > questions.length) {
    endGame();
  } else {
    askQuestion.innerHTML = `Question ${currentQuestionIndex + 1} of ${
      questions.length
    }: `;
    askQuestion.classList.add("questionChange");
    askQuestion.innerHTML += questions[currentQuestionIndex].text;
    displayChoices();
  }
}

function displayChoices() {
  getChoices.style.display = "none";
  let theseQs = questions[currentQuestionIndex].choices;
  for (let i = 0; i < theseQs.length; i++) {
    option = document.createElement("div");
    option.classList.add("choice");
    option.innerHTML = theseQs[i];
    listChoices.appendChild(option);
    chooseOption(option);
  }
}

function chooseOption(event) {
  event.addEventListener("click", function(e) {
    e = event;
    if (e.innerHTML == correctAnswer(currentQuestionIndex)) {
      showResult("win");
      addScore(10);
      clearChoices();
      currentQuestionIndex++;
      setTimeout(displayQuestion(), 5000);
    } else {
      showResult("lose");
      clearChoices();
      currentQuestionIndex++;
      setTimeout(displayQuestion(), 10000);
    }
    moveBar(10);
  });
}

function addScore(num) {
  userScore += num;
  score.innerText = userScore;
}

// Display overlay to show the result of the user's choice
function showResult(outcome) {
  if (outcome == "win") {
    resultScreen.style.display = "block";
    results.innerHTML = `Correct answer! Click anywhere to continue. `;
    results.style.display = "block";
    let myImg = document.images[currentQuestionIndex];
    myImg.style.display = "block";
    myImg.classList.add("images");
  }
  if (outcome == "lose") {
    resultScreen.style.display = "block";
    results.style.display = "block";
    results.innerHTML = `Sorry, that is incorrect.  The correct answer is ${correctAnswer(
      currentQuestionIndex
    )}. Click anywhere to continute`;
  }
}

// After each question is answered, when clicked, bounce the box
resultScreen.addEventListener("click", function(e) {
  e.preventDefault();
  textbox.classList.remove("bounce");
  // Allows the animation to occur more than once (via CSS tricks)
  void textbox.offsetWidth;
  resultScreen.style.display = "none";
  textbox.classList.add("bounce");
});

function endGame() {
  timer.style.display = 'none';
  getChoices.style.display = "none";
  hideP.style.display = "none";
  listChoices.style.display = "none";
  resultScreen.style.display = "block";
  results.innerHTML = `Thanks for playing! You answered ${userScore /
    10} questions correctly!`;
  resultScreen.classList.add("winning");
  resultScreen.addEventListener("click", function(e) {
    e.preventDefault();
    if (userScore >= 60) {
      askQuestion.innerHTML = `Thanks for playing Taylor's Trivia, it looks like you know her pretty well! If you want to learn more about Taylor, click the button below to go to her LinkedIn!`;
      readMoreAboutTaylor();
    } else {
      askQuestion.innerHTML = `Thanks for playing Taylor's Trivia.  You scored less than 60 points, so your Taylor knowledge needs some work.  Click below to read a short description of Taylor!`;
      readMoreAboutTaylor();
    }
  });
}

// Link to linkedin profile if user scores less than 60 points
function readMoreAboutTaylor() {
  var readHereBtn = document.createElement("button");
  readHereBtn.classList.add("readMore");
  readHereBtn.innerHTML = "Who is Taylor?";
  askQuestion.appendChild(readHereBtn);
  readHereBtn.addEventListener("click", function(e) {
    e.preventDefault();
    document.location.href =
      "https://www.linkedin.com/in/taylorpenberthy";
  });
}

// Progress bar
var width = 0;
function moveBar(num) {
  var elem = get("myBar");
  width += num;
  if (width >= 100) {
    elem.style.width = width + "%";
    elem.innerHTML = `100%`;
    elem.style.backgroundColor = "green";
    elem.style.color = "white";
  } else {
    elem.style.width = width + "%";
    elem.innerHTML = width * 1 + "%";
  }
}

function startTimer() {
  var timeLeft = 60;
  var myTimer = setInterval(function() {
    get("countdown").innerHTML = `${timeLeft} seconds remaining`;
    timeLeft -= 1;
    if (timeLeft <= 0) {
      clearInterval(myTimer);
      get("countdown").innerHTML = `TIME IS OUT`;
      endGame();
    }
  }, 1000);
}

