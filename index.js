function showForm() {
	addNoteButton.classList.add('hidden')
	uploadButton.classList.add('hidden')
	choosen.classList.add('hidden')
	noteForm.classList.remove('hidden')
	submitNoteButton.classList.remove('error')
	noteNameInput.classList.remove('error')
	notePasswordInput.classList.remove('error')
	notePasswordConfirmInput.classList.remove('error')
	formBorder.classList.remove('error')
	noteNameInput.value = ''
	notePasswordConfirmInput.value = ''
	notePasswordInput.value = ''
}

function backFromChoose() {
	submitNoteButton.classList.add('error')
	noteList.classList.add('hidden')
	noteForm.classList.add('hidden')
	choosen.classList.add('hidden')
	headingElement.classList.remove('hidden')
	addNoteButton.classList.remove('hidden')
	uploadButton.classList.remove('hidden')
}
function backFromCreatee() {
	if (bound == true) {
		noteList.classList.add('hidden')
		noteForm.classList.add('hidden')
		choosen.classList.remove('hidden')
		headingElement.classList.remove('hidden')
	} else if (bound == false) {
		noteList.classList.add('hidden')
		noteForm.classList.add('hidden')
		choosen.classList.add('hidden')
		headingElement.classList.remove('hidden')
		addNoteButton.classList.remove('hidden')
		uploadButton.classList.remove('hidden')
		fileInputElement.value = ''
	}

	// headingElement.classList.remove('hidden');
	// addNoteButton.classList.remove('hidden');
	// uploadButton.classList.remove('hidden');
}

function choose() {
	addNoteButton.classList.add('hidden')
	uploadButton.classList.add('hidden')
	choosen.classList.remove('hidden')
	noteNameInput.value = ''
	notePasswordConfirmInput.value = ''
	notePasswordInput.value = ''
	bound = true
	return bound
}
function uploadFile() {
	fileInputElement.click()
	bound = false
	return bound
}
document.getElementById('fileUpload').addEventListener('change', function (el) {
	const reader = new FileReader()
	reader.onload = function () {
		let res = unconbination(reader.result)
		if (res[0] == '~') {
			chekking(res)
		} else {
			headingElement.classList.add('hidden')
			addNoteButton.classList.add('hidden')
			uploadButton.classList.add('hidden')
			noteList.classList.remove('hidden')
			noteTextarea.value = reader.result
			lenghtOfValue()
		}
	}
	reader.readAsText(el.target.files[0])
	fileInputElement.value = ''
})
function read(textt) {
	let res = unconbination(textt)
	if (res[0] == '~') {
		chekking(res)
	} else {
		headingElement.classList.add('hidden')
		addNoteButton.classList.add('hidden')
		uploadButton.classList.add('hidden')
		noteList.classList.remove('hidden')
		noteTextarea.value = textt
		lenghtOfValue()
	}
}

let result
function chekking(res) {
	signInPasswordInput.value = ''
	signInPasswordInput.classList.remove('error')
	signInButton.classList.remove('error')
	signInForm.classList.remove('hidden')
	addNoteButton.classList.add('hidden')
	uploadButton.classList.add('hidden')
	result = String(res)
	return result
}

function checkPassword(el) {
	let lengthh = Number(result[1])
	let passwordForCheck = result.substring(2, lengthh + 2)
	let unmixx = result.substring(Number(result[1]) + 2, result.length)
	if (signInPasswordInput.value == passwordForCheck) {
		signInForm.classList.add('hidden')
		submitNoteButton.classList.remove('error')
		headingElement.classList.add('hidden')
		noteForm.classList.add('hidden')
		noteList.classList.remove('hidden')
		noteTextarea.value = unmixx
	} else {
		signInPasswordInput.classList.add('error')
		signInButton.classList.add('error')
	}
	return false
}

function backToStart() {
	headingElement.classList.remove('hidden')
	addNoteButton.classList.remove('hidden')
	uploadButton.classList.remove('hidden')
	noteList.classList.add('hidden')
	signInForm.classList.add('hidden')
}
document.getElementById('noteText').addEventListener('input', lenghtOfValue)

function lenghtOfValue() {
	const word = noteTextarea.value.split(' ')
	let kol = word.length
	words.innerHTML = 'words: ' + kol
	let len = noteTextarea.value.split(' ').join('').length
	letters.innerHTML = 'letters: ' + len
	if (Number(len) !== 0) {
		saveButton.style.opacity = '1'
		emptyNote = false
	} else {
		saveButton.style.opacity = '0.5'
		emptyNote = true
	}
}
