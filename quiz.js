document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answerButtons');
    const scoreContainer = document.getElementById('scoreContainer');
    const scoreElement = document.getElementById('scoreValue');
    const timerElement = document.getElementById('timer');
    const timeLeftElement = document.getElementById('timeLeft');

    let currentQuestionIndex;
    let score;
    let questions;
    let timer;
    let timeLeft;

    startButton.addEventListener('click', startGame);

    function startGame() {
        startButton.classList.add('hide');
        currentQuestionIndex = 0;
        score = 0;
        questions = [
            {
                question: 'What Material Is Littered Most?',
                answers: [
                    { text: 'Paper', correct: false },
                    { text: 'Cardboard', correct: false },
                    { text: 'Plastic', correct: true },
                    { text: 'Rubber', correct: false }
                ]
            },
            {
                question: 'When did littering start emerging significantly?',
                answers: [
                    { text: '1200s', correct: false },
                    { text: '1950s', correct: true },
                    { text: '2000s', correct: false },
                    { text: '1920s', correct: false }
                ]
            },
            {
                question: 'When was the first litter act?',
                answers:[
                    { text: '1954', correct: false},
                    { text: '1962', correct: false},
                    { text: '1958', correct: true},
                    { text: '1974', correct: false}
                ]
            }, 
            {
                question: 'How long does litter take to decompose',
                answers: [
                    { text: '100 Years', correct: false},
                    { text: '5 Years', correct: true},
                    { text: '10 Years', correct: false},
                    { text: '2 Years', correct: false}
                ]
            },
            {
                question: 'What is 1 way you can contribute?',
                answers: [
                    { text: 'Use Plastic Bags', correct: false},
                    { text: 'Throw Your Trash In The Ocean', correct: false},
                    { text: 'Join A Campaign', correct: true},
                    { text: 'Dont Pick Up Litter', correct: false}
                ]
            }
          
        ];
        questionElement.classList.remove('hide');
        answerButtonsElement.classList.remove('hide');
        timerElement.classList.remove('hide');
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            questionElement.innerText = currentQuestion.question;
            currentQuestion.answers.forEach(answer => {
                const button = document.createElement('button');
                button.innerText = answer.text;
                button.classList.add('btn');
                button.addEventListener('click', () => selectAnswer(button, answer.correct));
                answerButtonsElement.appendChild(button);
            });
            startTimer();
        } else {
            endGame();
        }
    }

    function resetState() {
        clearInterval(timer);
        timeLeft = 10;
        timeLeftElement.innerText = timeLeft;
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            timeLeftElement.innerText = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                showCorrectAnswer(false);
                setTimeout(() => {
                    currentQuestionIndex++;
                    setNextQuestion();
                }, 1000);
            }
        }, 1000);
    }

    function selectAnswer(button, correct) {
        clearInterval(timer);
        showCorrectAnswer(correct);
        Array.from(answerButtonsElement.children).forEach(btn => {
            btn.disabled = true;
        });
        setTimeout(() => {
            currentQuestionIndex++;
            setNextQuestion();
        }, 1000);
    }

    function showCorrectAnswer(correct) {
        if (correct) {
            score++;
        }
        scoreElement.innerText = `${score}/5`;
        Array.from(answerButtonsElement.children).forEach(button => {
            const answer = questions[currentQuestionIndex].answers.find(ans => ans.text === button.innerText);
            if (answer.correct) {
                button.classList.add('correct');
            } else {
                button.classList.add('wrong');
            }
        });
    }

    function endGame() {
        questionElement.innerText = 'Quiz Finished!';
        answerButtonsElement.innerHTML = '';
        timerElement.classList.add('hide');
        scoreContainer.classList.remove('hide');
        scoreElement.innerText = `${score}/5`;
    }
});
