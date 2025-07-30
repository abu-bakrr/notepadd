function mix(str) {
	let encryptedText = ''

	for (let char of str) {
		if (letterToSymbol[char]) {
			encryptedText += letterToSymbol[char]
		} else if (specialToLetter[char]) {
			encryptedText += specialToLetter[char]
		} else {
			encryptedText += char // если символ не в словаре, оставляем его как есть
		}
	}
	return encryptedText
}

function unmix(str) {
	let decryptedText = ''

	for (let char of str) {
		if (symbolToLetter[char]) {
			decryptedText += symbolToLetter[char]
		} else if (letterToSpecial[char]) {
			decryptedText += letterToSpecial[char]
		} else {
			decryptedText += char // если символ не в словаре, оставляем его как есть
		}
	}
	return decryptedText
}

const letterToSymbol = {
	A: '@',
	B: '#',
	C: '$',
	D: '%',
	E: '^',
	F: '&',
	G: '*',
	H: '(',
	I: ')',
	J: '-',
	K: '=',
	L: '+',
	M: '[',
	N: ']',
	O: '{',
	P: '}',
	Q: '\\',
	R: '|',
	S: ';',
	T: ':',
	U: '"',
	V: '<',
	W: '>',
	X: ',',
	Y: '.',
	Z: '/',
	a: '!',
	b: '1',
	c: '2',
	d: '3',
	e: '4',
	f: '5',
	g: '6',
	h: '7',
	i: '8',
	j: '9',
	k: '0',
	l: 'q',
	m: 'w',
	n: 'e',
	o: 'r',
	p: 't',
	q: 'y',
	r: 'u',
	s: 'i',
	t: 'o',
	u: 'p',
	v: 'a',
	w: 's',
	x: 'd',
	y: 'f',
	z: 'g',
	А: 'ш',
	Б: 'щ',
	В: 'з',
	Г: 'х',
	Д: 'ц',
	Е: 'ч',
	Ё: 'й',
	Ж: 'к',
	З: 'л',
	И: 'м',
	Й: 'н',
	К: 'б',
	Л: 'ю',
	М: 'я',
	Н: 'р',
	О: 'д',
	П: 'т',
	Р: 'у',
	С: 'и',
	Т: 'о',
	У: 'п',
	Ф: 'а',
	Х: 'с',
	Ц: 'г',
	Ч: 'в',
	Ш: 'ь',
	Щ: 'ы',
	Ъ: 'э',
	Ы: 'ж',
	Ь: 'ф',
	Э: 'ё',
	Ю: 'х',
	Я: 'ц',
	а: 'Ш',
	б: 'Щ',
	в: 'З',
	г: 'Х',
	д: 'Ц',
	е: 'Ч',
	ё: 'Й',
	ж: 'К',
	з: 'Л',
	и: 'М',
	й: 'Н',
	к: 'Б',
	л: 'Ю',
	м: 'Я',
	н: 'Р',
	о: 'Д',
	п: 'Т',
	р: 'У',
	с: 'И',
	т: 'О',
	у: 'П',
	ф: 'А',
	х: 'С',
	ц: 'Г',
	ч: 'В',
	ш: 'Ь',
	щ: 'Ы',
	ъ: 'Э',
	ы: 'Ж',
	ь: 'Ф',
	э: 'Ё',
	ю: 'Х',
	я: 'Ц',
}

const specialToLetter = {
	' ': 'X',
	'.': 'Y',
	',': 'Z',
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
const BOT_TOKEN = '7762304884:AAG0tw0t2r14fwLLl-WznuL9C2QjFFsQaxk'

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
					text: 'Открыть в редакторе',
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
