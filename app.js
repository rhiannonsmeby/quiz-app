/* eslint-disable no-console */
// eslint-disable-next-line strict
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'In which year was the Chicago World\'s fair held?',
      answers: [
        '1893',
        '1933',
        '1801',
        '1793'
      ],
      correctAnswer: '1893'
    },
    {
      question: 'What was the Chicago World\'s fair created to celebrate?',
      answers: [
        'The end of a severe economic depression',
        'The 100th anniversary of the US Post Office Department',
        'The 400th anniversary of Christopher Colombus\' arrival in the New World',
        'The restructuring of the city after the Great Chicago Fire'
      ],
      correctAnswer: 'The 400th anniversary of Christopher Colombus\' arrival in the New World'
    },
    {
      question: 'What nickname for Chicago was coined as a result of the World\'s Fair?',
      answers: [
        'The White City',
        'The Second City',
        'City by the Lake',
        'Chi-Town'
      ],
      correctAnswer: 'The White City'
    },
    {
      question: 'The Chicago World’s Fair ________.',
      answers: [
        'made Chicago home of the world’s first ferris wheel',
        'was the first fair ever powered by electricity',
        'introduced Pabst Blue Ribbon beer to the public for the first time',
        'All of the above'
      ],
      correctAnswer: 'All of the above'
    },
    {
      question: 'The nonfiction book, The Devil in the White City takes place during the fair and is about ________.',
      answers: [
        'a serial killer responsible for dozens of deaths at and around the fairgrounds',
        'the murder of Chicago’s recently re-elected mayor, Carter Harrison Sr.',
        'the top World’s Fair architect known for severely overworking laborers',
        'the Chicago race riots'
      ],
      correctAnswer: 'a serial killer responsible for dozens of deaths at and around the fairgrounds'
    },
  ],
  quizStarted: false,
  check: false,
  questionNumber: 0,
  questionIndex: 0,
  correct: 0,
  incorrect: 0,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

function generateStartPage() {
  return `<div class="start-page">
  <h2>Ready to start?</h2>
  <p>This is a brief, five question, quiz about the history and legacy of the Chicago World's Fair. Enjoy!</p>
    <img src="worldsfair.jpg" alt="some of the architecture at the Chicago World's Fair">
  <button type='submit' class="start">Start</button>
</div>`;
}

function generateQuestionPage(questionObject) {
  //this function will be responsible for listening for a button click and updating the page to the next question
  let answers = questionObject.answers.map((answer,idx)=> {
    if (idx === 0) {
      return `<input type="radio" id="answer${idx}" name="answer" value="${answer}" required>
    <label for="answer${idx}">${answer}</label><br>`;
    }
    return `<input type="radio" id="answer${idx}" name="answer" value="${answer}">
    <label for="answer${idx}">${answer}</label><br>`;
  });
  return `<div class="question-page">
  <div class="question-out-of">
  <p>${store.questionNumber +1} out of ${store.questions.length}</p>
  </div>
  <form id="question-form">
    <h2>${questionObject.question}</h2>
    ${answers.join('')}
    <button type="button" class="answer">Submit</button>
  </form>
  <p>Correct:${store.correct}</p><p>Incorrect:${store.incorrect}<p>
</div>`;
}

function generateGoodResultPage() {
  store.score++;
  return `<div class="result-page">
      <h2>You're right!</h2>
      <h3>Score:</h3>
        <p>Right: ${store.correct}</p>
        <p>Wrong: ${store.incorrect}</p>
        <img src="happyInChicago.jpg" alt="Chicago Cubs fans celebrating victory">
        <button class="next-question">Next</button>
    </div>
    `;
}

function generateBadResultPage() {
  return `<div class="result-page">
  <h2>You're wrong!</h2>
  <h4>The correct answer was: ${store.questions[store.questionNumber].correctAnswer}</h4>
  <h3>Score:</h3>
    <p>Right: ${store.correct}</p>
    <p>Wrong: ${store.incorrect}</p>
    <img src="sadInChicago.jpg" alt="Chicago Bears fan with their head down from disappointment">
    <button class="next-question">Next</button>
</div>`;
}

function generateEndPage() {
  return `<div class="result-page">
  <h2>End of Quiz</h2>
    <p>You got: ${store.correct} / ${store.questions.length}</p>
    <button class="restart">Reset</button>
    <img src="chicago.jpg" alt="Chicago skyline">
</div>`;
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function render() {
  if (store.quizStarted === false) {
    $('main').html(generateStartPage());
  }
  else if (store.questionNumber === store.questions.length) {
    $('main').html(generateEndPage());
  }
  else {
    $('main').html(generateQuestionPage(store.questions[store.questionIndex]));
  }
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

//User must click Start button to begin quiz
function handleStart() {
  //this function will be responsible for listening for the press of the start button-- maybe able to combine w next function
  $('main').on('click', '.start', function(event){
    event.preventDefault();
    store.quizStarted = true;
    render();
  });
}

function submitAnswer() {
  $('main').on('click', '.answer', function(event) {
    event.preventDefault();
    const userAnswer = $('input[name="answer"]:checked').val();
    if (userAnswer === store.questions[store.questionIndex].correctAnswer) {
      store.correct++;
      $('main').html(generateGoodResultPage());
    }
    else {
      store.incorrect++;
      $('main').html(generateBadResultPage());
    }
  });
}

//function triggered by 
function handleNextQuestion() {
  $('main').on('click', '.next-question', function(event) {
    event.preventDefault();
    store.questionNumber++;
    store.questionIndex++;
    render();
  });
}

function handleRetry() {
  $('main').on('click', '.restart', function(event) {
    event.preventDefault();
    store.score = 0;
    store.quizStarted = false;
    store.questionNumber = 0;
    store.questionIndex = 0;
    store.correct = 0;
    store.incorrect = 0;
    render();
  });
}

function main() {
  //contains all of the callbacks
  render();
  handleStart();
  submitAnswer();
  handleNextQuestion();
  handleRetry();
}

main();






