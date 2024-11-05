async function encrypt(text, key) {
	const iv = window.crypto.getRandomValues(new Uint8Array(12)) // IV длиной 12 байт
	const encoder = new TextEncoder()
	const encrypted = await window.crypto.subtle.encrypt(
		{
			name: 'AES-GCM',
			iv: iv,
		},
		key,
		encoder.encode(text) // Кодируем текст в байты
	)

	// Кодируем IV и зашифрованный текст в Base64
	return {
		iv: btoa(String.fromCharCode(...iv)),
		data: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
	}
}

async function decrypt(encryptedData, key) {
	const iv = new Uint8Array(
		atob(encryptedData.iv)
			.split('')
			.map(c => c.charCodeAt(0))
	)
	const data = new Uint8Array(
		atob(encryptedData.data)
			.split('')
			.map(c => c.charCodeAt(0))
	)
	const decrypted = await window.crypto.subtle.decrypt(
		{
			name: 'AES-GCM',
			iv: iv,
		},
		key,
		data
	)

	const decoder = new TextDecoder()
	return decoder.decode(decrypted) // Декодируем байты в текст
}

async function runEncryptionExample(text, key) {
	const encryptedData = await encrypt(text, key)
	return encryptedData
}

async function runDecryptionExample(text, key) {
	const decryptedText = await decrypt(text, key)
	return decryptedText
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
