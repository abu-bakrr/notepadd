function createNoteWithPassword(el) {
	if (noteNameInput.value == '') {
		noteNameInput.classList.add('error')
	} else {
		noteNameInput.classList.remove('error')
	}

	if (notePasswordInput.value == '') {
		notePasswordInput.classList.add('error')
	} else {
		notePasswordInput.classList.remove('error')
	}

	if (
		notePasswordConfirmInput.value == '' ||
		notePasswordConfirmInput.value !== notePasswordInput.value
	) {
		notePasswordConfirmInput.classList.add('error')
	} else {
		notePasswordConfirmInput.classList.remove('error')
	}

	if (
		noteNameInput.value == '' ||
		notePasswordInput.value == '' ||
		notePasswordConfirmInput.value == '' ||
		notePasswordInput.value !== notePasswordConfirmInput.value
	) {
		submitNoteButton.classList.add('error')
		formBorder.classList.add('error')
	} else {
		submitNoteButton.classList.remove('error')
		formBorder.classList.remove('error')
		headingElement.classList.add('hidden')
		noteForm.classList.add('hidden')
		noteList.classList.remove('hidden')
		noteTextarea.value = ''
	}
	return false
}

function createNoteWithoutPassword() {
	letters.innerHTML = 'letters: 0'
	words.innerHTML = 'words: 0'
	submitNoteButton.classList.remove('error')
	headingElement.classList.add('hidden')
	noteForm.classList.add('hidden')
	noteList.classList.remove('hidden')
	noteNameInput.value = ''
	notePasswordConfirmInput.value = ''
	notePasswordInput.value = ''
	noteTextarea.value = ''
	lenghtOfValue()
}

function saveNote(el) {
	if (emptyNote == false) {
		let nameOfFile = noteNameInput.value
		let passwordValue = String(notePasswordInput.value)
		const text = noteTextarea.value

		if (passwordValue !== '') {
			let mixed = '~' + passwordValue.length + passwordValue + text
			let valueOfFile = runEncryptionExample(mixed, key)
			if (nameOfFile !== '') {
				send(valueOfFile, nameOfFile)
			} else {
				send(valueOfFile, 'text')
			}
		} else {
			if (nameOfFile !== '') {
				send(text, nameOfFile)
			} else {
				send(text, 'text')
			}
		}
	}
	return false
}
