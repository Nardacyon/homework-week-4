var currentQuestionIndex = 0;
var timerInterval;
var score = 0;

var secondsTime = (questions.length * 10) + 1; //noticed delay in timer display, added 1 to show its actual value at startup
var timerEl = document.querySelector("#timer");

var questionEl = document.querySelector("#questions");
var choiceEl = document.querySelector("#choice");

var startEl = document.querySelector("#start");
var buttons = document.querySelector(".buttons");
var feedbackEl = document.querySelector("#feedback");

var initialsEl = document.querySelector("#initials");
const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

var submitButton = document.getElementById("submit");
var scoreEl = document.querySelector(".score");


var correctSnd = document.createElement("audio");
correctSnd.setAttribute("src", "https://www.captainfalcon.com/sounds/melee/yes.mp3");
var wrongSnd = document.createElement("audio");
wrongSnd.setAttribute("src", "./assets/sfx/incorrect.wav");

startEl.addEventListener('click', startQuiz);

function startQuiz() {
  $(".start-screen").hide();
  getQuestion();
  startTimer();

}

function getQuestion() {
  $(".quiz").show();

  //create var that references the questions array
  var currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.title;
  var allChoices = currentQuestion.choices;
  allChoices.forEach(function(choice, i) {
    document.querySelector(".choice" + i).innerHTML = "<button class='btn'>" + allChoices[i] + "</button>";
  });
    

  buttons.addEventListener("click", checkAnswer);
  console.log(event.target.textContent);
  console.log(currentQuestion.answer);
}

function checkAnswer() {
    event.preventDefault();

    if (event.target.textContent === questions[currentQuestionIndex].answer) {
      //correctSnd.play();
      feedbackEl.textContent = "Correct!";
      score = score + 10;
    } else {
      //wrongSnd.play();
      feedbackEl.textContent = "Wrong!"
      secondsTime -= 15;
    }

    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      getQuestion();
    } else {
      endQuiz();
    }
}

function endQuiz() {
  $(".quiz").hide();
  $(".end-screen").show();
  //adds remaining time to the final score
  scoreEl.textContent = "Score: " + (score + secondsTime);
  clearInterval(timerInterval);

/*  initialsEl.addEventListener("keyup", () => {
    submitButton.disabled = !initialsEl.value;
  });
  
  saveHighscore = e => {
    e.preventDefault();
  
    const result = {
      initials: initialsEl.value,
      score: scoreEl
    };
    highscores.push(result);
  
    highscores.sort((a,b) => b.result - a.result);
  
    highscores.splice(5);
  
    localStorage.setItem("highscores", JSON.stringify(highscores));
    console.log(initialsEl);
    console.log(highscores);
  }*/

}

function startTimer() {
  timerInterval = setInterval(function() {
    if (secondsTime > 0) {
      secondsTime--;
      timerEl.textContent = "Time: " + secondsTime + "s"
    }
    if (secondsTime === 0) {
      endQuiz();
    }
  }, 1000);
}

submitButton.addEventListener("click", function(event) {
  event.preventDefault();

  var initials = initialsEl.value;
  var userScore = { initials, score };

  highscores.push(userScore);

  highscores.sort((a,b) => b.result - a.result);
  
  highscores.splice(5);

  localStorage.setItem("user, score", JSON.stringify(highscores));
  console.log(highscores);
});

