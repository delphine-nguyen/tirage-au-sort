// Random =======================================

function getRandomInt(max) {
	return Math.round(Math.random() * max);
}

// Choose student  =============================

function getValidStudents(students) {
	let validStudents = [];
	students.forEach((student) => {
		if (student.correction == false) {
			validStudents.push(student);
		}
	});
	return validStudents;
}

function chooseRandomStudent(students) {
	let validStudents = getValidStudents(students);

	if (checkNeedReset(validStudents)) {
		// Full round
		resetCorrection(students);
		validStudents = students;
	}

	let randomIndex = getRandomInt(validStudents.length - 1);
	randomStudentName = validStudents[randomIndex].name;

	logChosen(randomStudentName, students);
	return randomStudentName;
}

// Log status ==================================

function logChosen(chosenStudentName, students) {
	for (let index in students) {
		let student = students[index];
		if (student.name == chosenStudentName) {
			student.correction = true;
		}
	}
}

// Reset =======================================

function checkNeedReset(validStudents) {
	if (validStudents.length == 0) {
		return true;
	}
	return false;
}

function resetCorrection(students) {
	for (let index in students) {
		let student = students[index];
		if (student.correction == true) {
			let studentCard = document.querySelector(`#${student.name}`);
			resetDisplay(studentCard);

			student.correction = false;
		}
	}
}

// Display ======================================

function createCardNames(students) {
	const cardsSection = document.querySelector("section.cards");
	students.forEach((student) => {
		let card = document.createElement("button");
		card.classList.add("card");
		card.classList.add("colorOnMainBg");

		card.setAttribute("id", student.name);
		card.innerText = student.name;

		cardsSection.appendChild(card);
	});
}

function displayChosenStudent(studentName, previousStudentName) {
	if (previousStudentName != null) {
		unDisplayPreviousStudent(previousStudentName);
	}
	let cardChosenStudent = document.querySelector(`#${studentName}`);
	cardChosenStudent.classList.toggle("current");
}

function unDisplayPreviousStudent(previousStudentName) {
	let cardPreviousStudent = document.querySelector(`#${previousStudentName}`);
	cardPreviousStudent.classList.remove("current");
	cardPreviousStudent.classList.add("invalid");
}

function resetDisplay(studentCard) {
	studentCard.classList.remove("invalid");
	studentCard.classList.remove("current");
}

// Main ===========================================

let students = [
	{
		name: "STEEVE",
		correction: false,
	},
	{
		name: "LINA",
		correction: false,
	},
	{
		name: "AYMERICK",
		correction: false,
	},
	{
		name: "NELSON",
		correction: false,
	},
	{
		name: "MARIUS",
		correction: false,
	},
	{
		name: "LUCAS",
		correction: false,
	},
	{
		name: "HAFTOM",
		correction: false,
	},
	{
		name: "NADIR",
		correction: false,
	},
	{
		name: "MOHAMED",
		correction: false,
	},
	{
		name: "NICOLAS",
		correction: false,
	},
	{
		name: "AURELIEN",
		correction: false,
	},
	{
		name: "JAYSON",
		correction: false,
	},
	{
		name: "MALIKA",
		correction: false,
	},
	{
		name: "DELPHINE",
		correction: false,
	},
	{
		name: "AMJAD",
		correction: false,
	},
];

createCardNames(students);

const chooseBtn = document.querySelector("#choose");
const resetBtn = document.querySelector("#reset");
const cards = document.querySelector(".cards");

let previousStudentName;

chooseBtn.addEventListener("click", () => {
	let randomStudentName = chooseRandomStudent(students);
	// console.log(`Chosen : ${randomStudentName}`);
	displayChosenStudent(randomStudentName, previousStudentName);
	previousStudentName = randomStudentName;

	console.log(students);
});

cards.addEventListener("click", (event) => {
	chosenStudent = event.target.id;
	logChosen(chosenStudent);
	displayChosenStudent(chosenStudent, previousStudentName);
	previousStudentName = chosenStudent;

	console.log(students);
});

resetBtn.addEventListener("click", () => {
	resetCorrection(students);

	console.log("==============================");
});
