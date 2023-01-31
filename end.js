const saveScoreBtn = document.getElementById('saveScoreBtn');
const username = document.getElementById('username');
const finalScore = document.getElementById('finalScore');
// import form index.html
const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;

username.addEventListener('keyup',() =>{
    saveScoreBtn.disabled = !username.value;
})

saveHighScore = e => {
    console.log('clicked');
    e.preventDefault();
}

