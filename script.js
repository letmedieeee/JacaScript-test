let result = 0;
	let firstName = '';
	let questions;
	let intervalObject = null;

	document.getElementById("canvasBox").style.display = "none"; // Hide canvas initially
	function autoSubmitQuiz() {
        // Программно выбираем правильные ответы
        questions.forEach((question, index) => {
            const correctAnswerIndex = question.answers.indexOf(question.correctAnswer);
            const radioButton = document.querySelector(`input[name="q${index}"][value="${question.answers[correctAnswerIndex]}"]`);
            if (radioButton) {
                radioButton.checked = true;
            }
        });

        // Затем вызываем функцию для проверки ответов и остановки таймера
        checkAnswersAndStopTimer();
    }
		function startQuizAndTimer() {
			startQuiz(); // Start the quiz
			intervalObject = setInterval(function () {
				displayTime(czasomierz);
			}, 10); // Start the timer
			document.getElementById("canvasBox").style.display = "block"; // Show canvas
		}

		function checkAnswersAndStopTimer() {
			checkAnswers(); // Check the answers
			clearInterval(intervalObject); // Stop the timer
			document.getElementById("canvasBox").style.display = "none"; // Hide canvas after displaying the result
		}

	function checkAnswers() {
		result = 0;
		questions.forEach((question, index) => {
			const selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`);
			if (selectedAnswer && selectedAnswer.value === question.correctAnswer) {
				result++;
			}
		});
		displayResult();
		startStopTimer(czasomierz); // Stop the timer when quiz finishes
	}
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
	resultSection.innerHTML += `<p>Czas: ${czasomierz.min}:${czasomierz.sec}.${czasomierz.secHundredth}</p>`;
}
document.getElementById("myCanvas").style.top = "150";
document.getElementById("myCanvas").style.top = "100";

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var scale = 1;
var startXPos = 20;
var startYPos = 20;
var digitsNums = 6;
var digitWidth = 100;
var height = 170;
var horizontalSegmentWidth = 60;
var horizontalSegmentHeight = 10;
var verticalSegmentWidth = 10;
var verticalSegmentHeight = 60;
var colonSize = 40;
var colonNum = 2;
var colonWidth = 10;

height *= scale;
horizontalSegmentWidth *= scale;
horizontalSegmentHeight *= scale;
verticalSegmentHeight *= scale;
verticalSegmentWidth *= scale;
colonSize *= scale;

var width = (digitWidth * digitsNums + colonSize * colonNum) * scale;

document.getElementById("myCanvas").width = width;
document.getElementById("myCanvas").height = height;
var czasomierz = new stoper(0, 0, 0);

drawBackground();

displayNumWithColon(czasomierz.min);
displayNumWithColon(czasomierz.sec);
displayNumWithoutColon(czasomierz.secHundredth)

function displayNumWithColon(num)
{
	displayNumWithoutColon(num);

	drawColon();

	startXPos += colonSize;
}

function displayNumWithoutColon(num)
{
	var firstNum = Math.floor(num / 10);
	var secondNum = num % 10;

	displayNum(firstNum);

	startXPos += digitWidth;

	displayNum(secondNum);

	startXPos += digitWidth;
}

function drawBackground()
{
	var background = ctx.createLinearGradient(0, 0, 0, height);
	background.addColorStop(0, "#A0A0A0");
	background.addColorStop(0.6, "#606060");
	ctx.fillStyle = background;

	ctx.fillRect(0, 0, width, height);
}

function displayNum(num)
{








	var segmentsArray = [true, true, true, true, true, true, true];

	switch(num)
	{
		case 0: segmentsArray[3] = false;
			break;
		case 1: segmentsArray[0] = false;
				segmentsArray[1] = false;
				segmentsArray[3] = false;
				segmentsArray[4] = false;
				segmentsArray[6] = false;
				break;

		case 2: segmentsArray[1] = false; 
				segmentsArray[5] = false;
				break;

		case 3: segmentsArray[1] = false;
				segmentsArray[4] = false;
				break;

		case 4: segmentsArray[0] = false;
				segmentsArray[4] = false;       
				segmentsArray[6] = false;
				break;

		case 5: segmentsArray[2] = false;
				segmentsArray[4] = false;
				break;

		case 6: segmentsArray[2] = false;
			break;

		case 7: segmentsArray[1] = false;
				segmentsArray[3] = false;
				segmentsArray[4] = false;
				segmentsArray[6] = false;
				break;

		case 9: segmentsArray[4] = false;
				break;         
	}

	drawNum(segmentsArray);
}

function drawNum(segmentsArray)
{
	ctx.lineWidth = 1;
	ctx.strokeStyle = "Black";
	ctx.fillStyle = "Lime";

	var leftXPos = startXPos * scale;
	var leftVerticalXPos = leftXPos - verticalSegmentWidth;
	var topHorizontalYPos = (startYPos * scale) / 2;
	var rightXPos = startXPos * scale + horizontalSegmentWidth;
	var topVerticalYPos = startYPos * scale;
	var middleHorizontalYPos = (height - horizontalSegmentHeight) / 2;
	var bottomVerticalYPos = (height + horizontalSegmentHeight) / 2;
	var bottomHorizontalYPos = height - startYPos * scale;
	
	if(segmentsArray[0])
	{
		drawSegment(leftXPos, topHorizontalYPos, horizontalSegmentWidth, horizontalSegmentHeight);
	}

	if(segmentsArray[1])
	{
		drawSegment(leftVerticalXPos, topVerticalYPos, verticalSegmentWidth, verticalSegmentHeight);
	}
	
	if (segmentsArray[2])
	{
		drawSegment(rightXPos, topVerticalYPos, verticalSegmentWidth, verticalSegmentHeight);
	}

	if (segmentsArray[3])
	{
		drawSegment(leftXPos, middleHorizontalYPos, horizontalSegmentWidth, horizontalSegmentHeight);
	}

	if (segmentsArray[4])
	{
		drawSegment(leftVerticalXPos, bottomVerticalYPos, verticalSegmentWidth, verticalSegmentHeight);
	}

	if (segmentsArray[5])
	{
		drawSegment(rightXPos, bottomVerticalYPos, verticalSegmentWidth, verticalSegmentHeight);
	}

	if (segmentsArray[6])
	{
		drawSegment(leftXPos, bottomHorizontalYPos, horizontalSegmentWidth, horizontalSegmentHeight);
	}
}

function drawSegment(segmentXPos, segmentYPos, segmentWidth, segmentHeight)
{
	drawRect(segmentXPos, segmentYPos, segmentWidth, segmentHeight);
}

function drawColon()
{
	var X = startXPos * scale - colonWidth / 2;
	var Y = height / 2 - colonWidth * 3;

	drawRect(X, Y, colonWidth, colonWidth);

	Y = height / 2 + colonWidth * 2;

	drawRect(X, Y, colonWidth, colonWidth);
}

function drawRect(x, y, width, height)
{
	ctx.strokeRect(x, y, width, height);
	ctx.fillRect(x, y, width - 1 * scale, height - 1 * scale);
}

function stoper(min, sec, secHundredth) {
	var Sixty = 60;
	var Hundred = 100;
	var tempValue;

	this.secHundredth = secHundredth % Hundred;

	tempValue = sec + Math.floor(secHundredth / Hundred);

	this.sec = tempValue % Sixty;

	this.min = min + Math.floor(tempValue / Sixty);

	this.addMin = function () {
		++this.min;
	}
	this.addSec = function () {
		++this.sec;

		if (this.sec == Sixty) {
			this.addMin();
			this.sec = 0;
		}
	}
	this.addSecHundredth = function () {
		++this.secHundredth;

		if (this.secHundredth == Hundred) {
			this.addSec();
			this.secHundredth = 0;
		}
	}
}

function displayTime(timer){
	startXPos = 20;
	startYPos = 20;

	drawBackground();

	displayNumWithColon(timer.min);
	displayNumWithColon(timer.sec);
	displayNumWithoutColon(timer.secHundredth);

	timer.addSecHundredth();
}

function startStopTimer(timer)
{
	if(intervalObject != null)
	{
		clearInterval(intervalObject);
		intervalObject = null;
		document.getElementById("startStopButton").innerHTML = "START";
	}
	else
	{
		intervalObject = setInterval(function(){ displayTime(timer)}, 10);
		document.getElementById("startStopButton").innerHTML = "STOP"
	}
}

function resetTimer(timer)
{
	timer.secHundredth = 0;
	timer.sec = 0;
	timer.min = 0;

	displayTime(timer);
}
function restartQuiz() {
        clearInterval(intervalObject); // Stop the timer if running
        document.getElementById('resultSection').style.display = 'none'; // Hide result section
        document.getElementById('quizSection').style.display = 'none'; // Hide quiz section
        document.getElementById('canvasBox').style.display = 'none'; // Hide canvas

        // Reset input fields
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('className').value = '';

        // Clear questions container
        document.getElementById('questionsContainer').innerHTML = '';

        // Reset timer
        czasomierz = new stoper(0, 0, 0);

        // Draw the initial timer state
        displayTime(czasomierz);
    }