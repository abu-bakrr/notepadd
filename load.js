document.addEventListener('DOMContentLoaded', () => {
	const urlParams = new URLSearchParams(window.location.search)
	const encodedText = urlParams.get('fileContent')
	key = urlParams.get('key')


	if (encodedText) {
		// Корректное декодирование Base64 с поддержкой кириллицы
		const decodedText = decodeBase64(encodedText)
		console.log('Декодированное содержимое файла: ', decodedText)
		let textInput = document.getElementById('noteText')
		read(decodedText)
		backFromCreate.style.display = 'none'
	}
})


function decodeBase64(encodedText) {
	const binary = atob(encodedText)
	const bytes = Uint8Array.from(binary, c => c.charCodeAt(0))
	return new TextDecoder().decode(bytes)
}
