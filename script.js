let questions = [{
        'question': 'Wer hat HTML erfunden?',
        'answer_1': 'Robbie Williams',
        'answer_2': 'Lady Gaga',
        'answer_3': 'Tim Berners_Lee', //X
        'answer_4': 'Justin Bieber',
        'right_answer': 'answer_3'
    },
    {
        'question': 'Was bedeutet das HTML Tag <a>?',
        'answer_1': 'Text Fett',
        'answer_2': 'Container',
        'answer_3': 'Link', //X
        'answer_4': 'Kursiv',
        'right_answer': 'answer_3'
    },
    {
        'question': 'Wie erstellt man einen Zeilenumbruch?',
        'answer_1': 'break',
        'answer_2': 'a',
        'answer_3': 'b',
        'answer_4': 'br', //X
        'right_answer': 'answer_4'
    },
    {
        'question': 'Welche Angabe ist korrekt, um jeden zweiten Absatz auszuwählen?',
        'answer_1': 'p:nth-child(even)', //X
        'answer_2': 'p: nth-child(even)',
        'answer_3': ':nth-child(even) p',
        'answer_4': 'p:nthchild(even)',
        'right_answer': 'answer_1'
    },
    {
        'question': 'Welche CSS-Codezeile ist korrekt?',
        'answer_1': 'p {font-family:Helvetica, font-weight:bold}',
        'answer_2': 'p {font-family:Helvetica, sans-serif; font-weight:bold;}', //X
        'answer_3': 'p {font-family=Helvetica, sans-serif; font-weight=bold}',
        'answer_4': 'p {font-family:Helvetica, font-weight:bold};',
        'right_answer': 'answer_2'
    },
    {
        'question': 'Wer hat JavaScript erfunden?',
        'answer_1': 'Bill Gates',
        'answer_2': 'James T. Kirk',
        'answer_3': 'Brendan Eich', //X
        'answer_4': 'Han Solo',
        'right_answer': 'answer_3'
    },
    {
        'question': 'Wie definiert man in JavaScript eine Variable?',
        'answer_1': 'Let 100 = rate;',
        'answer_2': '100 = let rate;',
        'answer_3': 'rate = 100;',
        'answer_4': 'let rate = 100;', //X
        'right_answer': 'answer_4'
    }
];

let currentQuestion = 0;

let questionNumber = 1;

let counter = 0;

let AUDIO_SUCCESS = new Audio('audio/win.mp3');

let AUDIO_FAIL = new Audio('audio/fail.mp3');

let AUDIO_END = new Audio('audio/end.mp3');

function init() {
    showQuestion();
    currentQuestionNumber();
}


function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
        AUDIO_END.play();
    } else {
        loadQuestions();
        showProgressBar();
        currentQuestionNumber();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function showProgressBar() {
    let percent = currentQuestion / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progressBar').innerHTML = `${percent}%`;
    document.getElementById('progressBar').style = `width: ${percent}%;`;
}

function loadQuestions() {
    let question = questions[currentQuestion];
    document.getElementById('question').innerHTML = question['question'];
    document.getElementById('answerA').innerHTML = question['answer_1'];
    document.getElementById('answerB').innerHTML = question['answer_2'];
    document.getElementById('answerC').innerHTML = question['answer_3'];
    document.getElementById('answerD').innerHTML = question['answer_4'];
}

function currentQuestionNumber() {
    document.getElementById('currentQuestion').innerHTML = '';
    document.getElementById('currentQuestion').innerHTML = questionNumber;
    document.getElementById('allQuestions').innerHTML = '';
    document.getElementById('allQuestions').innerHTML = questions.length;
}

function answer(selection) {
    let question = questions[currentQuestion];
    if (selection == question['right_answer']) {
        counter++;
        AUDIO_SUCCESS.play();
        document.getElementById(selection).classList.add('bg-success');
    } else {
        AUDIO_FAIL.play();
        document.getElementById(question['right_answer']).classList.add('bg-success');
        document.getElementById(selection).classList.add('bg-danger');
    }
    document.getElementById('nextButton').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    questionNumber++;
    document.getElementById('nextButton').disabled = true;
    showQuestion();
    resetAnswers();
}

function resetAnswers() {
    document.getElementById('answer_1').classList.remove('bg-danger');
    document.getElementById('answer_1').classList.remove('bg-success');
    document.getElementById('answer_2').classList.remove('bg-danger');
    document.getElementById('answer_2').classList.remove('bg-success');
    document.getElementById('answer_3').classList.remove('bg-danger');
    document.getElementById('answer_3').classList.remove('bg-success');
    document.getElementById('answer_4').classList.remove('bg-danger');
    document.getElementById('answer_4').classList.remove('bg-success');
}

function showEndScreen() {
    document.getElementById('cardBody').innerHTML = ``;
    document.getElementById('cardBody').innerHTML = `
    <div class="endsreen">
        <div><img src="img/brain_result.png" class="brain_result_img"></div>        
        <div class="endsreen_text"><b>COMPLETE</b></div>
        <div class="endsreen_text"><b>HTML QUIZ</b></div>
        <br>
            <div class="endsreen_score">        
                <div class="endsreen_score_text"><b>YOUR SCORE</b></div><div class="endsreen_text"><b>${counter}</b>/${questions.length}</div>
            </div>
        <br>
        <button type="button" class="btn btn-primary">SHARE</button>
        <a href="index.html" class="btn btn-outline-primary" id="restartButton" >REPLAY</a>
        <div><img src="img/tropy.png" class="tropy"></div>
    </div>
    `;
}