const question = document.getElementById('question');
const choices = document.querySelectorAll('.choice-text');
const questionCounterText = document.getElementById('questionCounter')
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let availableQuestion = [];
let questionCounter = 0;


// question and answer
let questions = [ 
    {
        question: "Gerakan memantulkan bola ke lantai dinamakan?",
        choice1: "dribbling",
        choice2: 'dribble',
        choice3: 'Tedang',
        choice4: 'Goyang',
        answer: 1
    },
    {
        question: "Yang merupakan cabang olah raga atletik ?",
        choice1: 'Lompat Tali',
        choice2: 'Lompat kodok',
        choice3: 'Lompat Jauh',
        choice4: 'Dakon',
        answer: 1
    },
    {
        question: "Jumlah pemain setiap team dalam permainan bola basket ?",
        choice1: 2,
        choice2: 7,
        choice3: 4,
        choice4: 5,
        answer: 4
    },
    {
        question: "	Organisasi voli Indonesia yaitu ?",
        choice1: 'PBB',
        choice2: 'PBVSI',
        choice3: 'PBVSS',
        choice4: 'PBSI',
        answer: 2
    },
    {
        question: "Panjang jaring basket ?",
        choice1: '40cm',
        choice2: '30cm',
        choice3: '50cm',
        choice4: '45cm',
        answer: 1
    },
    {
        question: "	Renang gaya dada sering disebut juga ?",
        choice1: 'Gaya Batu',
        choice2: 'FreeStyle',
        choice3: 'Gaya Katak',
        choice4: 'Gaya Anjing',
        answer: 3
    },
    {
        question: "	Dalam permainan softball, pergantian dilakukan apabila regu bertahan berhasil mematikan pemain dari regu penyerang sebanyak… Orang ?",
        choice1: 2,
        choice2: 3,
        choice3: 1,
        choice4: 4,
        answer: 4
    },
    {
        question: "	Jika pemain regu yang bertahan memasuki daerah gawang maka akan diberi hukuman ?",
        choice1: 'Lemparan 4 meter',
        choice2: 'Lemparan 7 meter',
        choice3: 'Lemparan 5 meter',
        choice4: 'Lemparan 6 meter',
        answer: 2
    },
    {
        question: "Permaianan sepak bola terdiri dari..babak ?",
        choice1: 'Satu',
        choice2: 'dua',
        choice3: 'satu dan dua',
        choice4: 'semua jawaban benar',
        answer: 2
    },
    {
        question: "Berdiri dengan satu kaki melatih untuk?",
        choice1: 'Keseimbangan',
        choice2: 'Betis',
        choice3: 'Paha',
        choice4: 'Dengkul',
        answer: 1
    },
]


const CORRECT_BONUS = 10;
const Max_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions];
    console.log(availableQuestion);
    getNewQuestions();
}

getNewQuestions = () => {
    if(availableQuestion.lengh === 0 || questionCounter >= Max_QUESTIONS){
        // export to locale storage
        localStorage.setItem('mostRecentScore',score);

        // goto end page
        return window.location.assign('/end.html');
    }

    questionCounter++;

    questionCounterText.innerText =`${questionCounter}/${Max_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random()*availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestion.splice(questionIndex,1);

    acceptingAnswer = true;
};

choices.forEach(choice  =>{
    choice.addEventListener('click',(e)=> {
       if(!acceptingAnswer) return;

       acceptingAnswer = false;
       const selectedChoice = e.target;
       const selectedAnswer = selectedChoice.dataset['number'];
        
       const classToApply = 
       selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

       if (classToApply === 'correct'){
        incrementScore(CORRECT_BONUS);
       }

       selectedChoice.parentElement.classList.add(classToApply);

       setTimeout(()=>{
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestions();
       },1000);
    });
});


incrementScore = num => {
    score += num ;
    scoreText.innerText = score;
}
startGame();