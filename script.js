let result = 0
let firstName = ''
let questions

function startQuiz() {
	firstName = document.getElementById('firstName').value
	document.getElementById('quizSection').style.display = 'block'
	loadQuestions()
	displayQuestions()
}

function loadQuestions() {
	questions = [
		{
			question: 'Czym jest JavaScript?',
			answers: ['jezykiem', 'jedzeniem', 'nie wiem'],
			correctAnswer: 'jezykiem',
		},
		{
			question: 'Co oznacza skrót HTML?',
			answers: [
				'HyperText Markup Language',
				'Home Tool Markup Language',
				'Hyperlinks and Text Markup Language',
			],
			correctAnswer: 'HyperText Markup Language',
		},
		{
			question: 'Do czego służy CSS?',
			answers: [
				'Formatowanie prezentacji elementów HTML',
				'Przygotowanie kawy',
				'Programowanie logiki po stronie serwera',
			],
			correctAnswer: 'Formatowanie prezentacji elementów HTML',
		},
	]
}

function displayQuestions() {
	const questionsContainer = document.getElementById('questionsContainer')
	questions.forEach((question, index) => {
		questionsContainer.innerHTML += `<p>${index + 1}. ${question.question}</p>`
		question.answers.forEach((answer, ansIndex) => {
			questionsContainer.innerHTML += `<label>
                        <input type="radio" name="q${index}" value="${answer}" />
                        ${answer}
                    </label>`
		})
		questionsContainer.innerHTML += '<br>'
	})
}

function checkAnswers() {
	result = 0
	questions.forEach((question, index) => {
		const selectedAnswer = document.querySelector(
			`input[name="q${index}"]:checked`
		)
		if (selectedAnswer && selectedAnswer.value === question.correctAnswer) {
			result++
		}
	})
	displayResult()
}

function displayResult() {
	const resultSection = document.getElementById('resultSection')
	let ocena = ''

	switch (result) {
		case 0:
			ocena = 'niema odpowiedzi'
			break
		case 1:
			ocena = 'niedostateczna'
			break
		case 2:
			ocena = 'dostateczna'
			break
		default:
			ocena = 'bardzo dobra'
			break
	}

	resultSection.style.display = 'block'
	resultSection.innerHTML += `<h3>wynik dla ${firstName}:</h3>`
	resultSection.innerHTML += `<h3>twoja ocena: ${ocena}:</h3>`
	resultSection.innerHTML += `<p>Prawidłowe odpowiedzi: ${result} z ${questions.length}</p>`
}
