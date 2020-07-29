const highscoresList = document.getElementById('highscoresList');
const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
var clearButton = document.getElementById("clear");

clearButton.addEventListener('click', function(event) {
    localStorage.clear();
    location.reload();
});

highscoresList.innerHTML = highscores
    .map(userScore => {
        return `<li class="high-score" id="scoresList"> ${userScore.initials}-${userScore.score}</li>`;
    })
    .join("");
