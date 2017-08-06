'use strict'

var questionText
var choicesPane
var choiceTemplate
var start = 'starter'

function run (data) {
  function doQuestion (question, results, callback) {
    console.log(question.text)
    choicesPane.innerHTML = ''
    questionText.innerHTML = question.text
    question.choices.forEach(function (choice) {
      var choiceContainer = document.importNode(choiceTemplate.content,
                                                true)
      choiceContainer.firstElementChild.innerHTML = choice.text
      console.log(choiceContainer.firstElementChild.innerHTML)
      choicesPane.appendChild(choiceContainer)
      choicesPane.lastElementChild.addEventListener('click', e => {
        console.log('click')
        callback(choice.value)
      })
    })
  }

  (function doQuiz (quizName) {
    var quiz = data[quizName]
    var resultNames = quiz.results
    var results = Array(resultNames.length).map(Number.prototype.valueOf, 0)
    ; (function loop (q) {
      if (q < quiz.questions.length) {
        doQuestion(quiz.questions[q], results, v => {
          v.forEach((n, i) => { results[i] += n })
          loop(q + 1)
        })
      } else {
        var result = resultNames[
            results.reduce((m, x, i) => x > results[m] ? i : m, 0)
        ]
        window.alert(result) // for dev purposes
        doQuiz(result)
      }
    })(0)
  })(start)
}

window.onload = function () {
  questionText = document.getElementById('question-text')
  choicesPane = document.getElementById('choices-pane')
  choiceTemplate = document.getElementById('choice-template')

  window.fetch('questions.json')
    .then(r => r.json())
    .then(data => run(data))
}
