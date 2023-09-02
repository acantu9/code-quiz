var scores = JSON.parse(localStorage.getItem("score")) || [];
scores.forEach(element => {
    var score = document.createElement("p");
    score.innerText = element.initials + " " + element.score;
    document.querySelector(".highscore").appendChild(score);
});