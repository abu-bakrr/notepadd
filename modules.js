function mix(str) {
	let encryptedText = ''
	for (let char of str) {
		if (letterToSymbol[char]) {
			encryptedText += letterToSymbol[char]
		} else if (specialToLetter[char]) {
			encryptedText += specialToLetter[char]
		} else {
			encryptedText += char
		}
	}
	return encryptedText
}

function unmix(str) {
	let decryptedText = ''
	let i = 0
	while (i < str.length) {
		if (str[i] === '#') {
			const code = str.slice(i, i + 3)
			if (symbolToLetter[code]) {
				decryptedText += symbolToLetter[code]
				i += 3
				continue
			}
		}
		if (letterToSpecial[str[i]]) {
			decryptedText += letterToSpecial[str[i]]
		} else {
			decryptedText += str[i]
		}
		i++
	}
	return decryptedText
}


const letterToSymbol = {}
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя'

letters.split('').forEach((char, index) => {
	// Уникальные значения вида #00, #01, ..., #99, #a0, ...
	const encoded = '#' + index.toString(36).padStart(2, '0') // 36-ричная система, чтобы уместить до ~1296 символов
	letterToSymbol[char] = encoded
})
const symbolToLetter = {}
for (const [letter, symbol] of Object.entries(letterToSymbol)) {
	symbolToLetter[symbol] = letter
}

const symbolToLetter = {}
for (const [letter, symbol] of Object.entries(letterToSymbol)) {
	symbolToLetter[symbol] = letter
}

const letterToSpecial = {}
for (const [special, letter] of Object.entries(specialToLetter)) {
	letterToSpecial[letter] = special
}

function combination(text) {
	let chars = text.split('')
	for (let i = 0; i < chars.length - 1; i += 2) {
		swap(chars, i, i + 1)
	}
	return chars.join('')
}

function unconbination(text) {
	return combination(text)
}

function swap(arr, i, j) {
	let temp = arr[i]
	arr[i] = arr[j]
	arr[j] = temp
}

const urlParams = new URLSearchParams(window.location.search)
const chatId = urlParams.get('chat_id')
console.log('Chat ID: ', chatId)
const BOT_TOKEN = '7991289522:AAFnI59hJWf4EM7YhLCNmKkzSXARkmFqPmc'

// Проверка наличия chatId
if (!chatId) {
	alert('Chat ID не найден! Убедитесь, что вы запустили WebApp через Telegram.')
}
function send(text, name) {
	const inputText = text

	// Преобразуем текст в Base64 для правильной передачи кириллицы
	const encodedText = btoa(unescape(encodeURIComponent(inputText)))

	// Создаем Blob на основе Base64 данных
	const byteCharacters = atob(encodedText)
	const byteNumbers = new Array(byteCharacters.length)
	for (let i = 0; i < byteCharacters.length; i++) {
		byteNumbers[i] = byteCharacters.charCodeAt(i)
	}
	const byteArray = new Uint8Array(byteNumbers)
	const blob = new Blob([byteArray], { type: 'text/plain;charset=UTF-8' })
	const file = new File([blob], name + '.txt', {
		type: 'text/plain;charset=UTF-8',
	})

	const formData = new FormData()
	formData.append('chat_id', chatId)
	formData.append('document', file)

	const replyMarkup = {
		inline_keyboard: [
			[
				{
					text: 'Открыть в Flove',
					web_app: {
						url: `https://abu-bakrr.github.io/notepadd/?fileContent=${encodedText}&chat_id=${chatId}&key=${key}`,
					},
				},
			],
		],
	}
	formData.append('reply_markup', JSON.stringify(replyMarkup))

	// Отправляем файл через Telegram API
	fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
		method: 'POST',
		body: formData,
	})
		.then(response => response.json())
		.then(result => {
			if (!result.ok) {
				alert('Ошибка при отправке файла: ' + result.description)
			}
		})
		.catch(error => {
			console.error('Ошибка:', error)
			alert('Произошла ошибка.')
		})
}
