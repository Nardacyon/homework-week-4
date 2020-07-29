var currentQuestionIndex = 0;
var timerInterval;
var score = 0;
const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

var secondsTime = (questions.length * 10) + 1; //noticed delay in timer display, added 1 to show its actual value at startup

var timerEl = document.querySelector("#timer");
var startEl = document.querySelector("#start");

//DOM Elements primarily used in the quiz portion
var questionEl = document.querySelector("#questions");
var choiceEl = document.querySelector("#choice");
var buttons = document.querySelector(".buttons");
var feedbackEl = document.querySelector("#feedback");

//DOM Elements primarily used in the end screen portion
var initialsEl = document.querySelector("#initials");
var submitButton = document.getElementById("submit");
var retakeQuiz = document.getElementById("home");
var scoreEl = document.querySelector(".score");

//Sounds when selecting answers
var correctSnd = document.createElement("audio");
correctSnd.setAttribute("src", "https://www.captainfalcon.com/sounds/melee/yes.mp3");
var wrongSnd = document.createElement("audio");
wrongSnd.setAttribute("src", "./assets/sfx/incorrect.wav");


//Start of actual functions in the code
startEl.addEventListener('click', startQuiz);


function startQuiz() {
  $(".start-screen").hide();
  getQuestion();
  startTimer();
}

//Goes through the current index and goes through each question
function getQuestion() {
  $(".quiz").show();

  //create var that references the questions array
  var currentQuestion = questions[currentQuestionIndex];
  //Display the current question
  questionEl.textContent = currentQuestion.title;

  //Creates a short hand variable for the forEach method that loops through each choice and change the text of the HTML buttons
  var allChoices = currentQuestion.choices;
  allChoices.forEach(function(choice, i) {
    document.querySelector(".choice" + i).innerHTML = "<button class='btn'>" + allChoices[i] + "</button>";
  });
    
  //Event listener that is used when the changed button is clicked
  buttons.addEventListener("click", checkAnswer);
}

//Checks if the textContent of the clicked button is the correct answer
function checkAnswer() {
    event.preventDefault(); 

    if (event.target.textContent === questions[currentQuestionIndex].answer) {
      correctSnd.play(); //Yes, this is Captain Falcon
      feedbackEl.textContent = "Correct!";
      score = score + 10;
    } else {
      wrongSnd.play();
      feedbackEl.textContent = "Wrong!"
      secondsTime -= 15;
    }
    //Makes sure to go through each question
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      getQuestion();
    } else { //If on the last question the quiz will display the end screen
      endQuiz();
    }
}

//End screen portion
function endQuiz() {
  $(".quiz").hide();
  $(".end-screen").show();
  //adds remaining time to the final score
  score = score + secondsTime
  scoreEl.textContent = "Score: " + score;
  
  clearInterval(timerInterval);
}

//End screen portion that takes the User's score and initials, and saves it to local storage.
submitButton.addEventListener("click", function(event) {
  event.preventDefault();

  var initials = initialsEl.value;
  var userScore = { initials, score };

  highscores.push(userScore); 
  highscores.sort((a,b) => b.score - a.score); //Sorts through local storage from highest to lowest scores
  highscores.splice(5); //Limits the amount of scores saved in the local storage

  localStorage.setItem("highscores", JSON.stringify(highscores)); //Sets item in local storage

  //Shows button that allows User to retake the quiz
  $("#home").show();
});

//Timer that is based on the number of questions multiplied by 10 seconds
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
