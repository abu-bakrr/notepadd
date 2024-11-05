from telebot.types import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
import telebot
from telebot import types
import base64
import hashlib

# Токен бота
BOT_TOKEN = '7762304884:AAG0tw0t2r14fwLLl-WznuL9C2QjFFsQaxk'

# URL твоего веб-приложения
WEB_APP_URL = 'https://abu-bakrr.github.io/notepadd/'

bot = telebot.TeleBot(BOT_TOKEN)

# Обработчик команды /start
@bot.message_handler(commands=['start'])
def start(message):
    chat_id = message.chat.id
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True)
    
    web_app_info = types.WebAppInfo(f"{WEB_APP_URL}?chat_id={chat_id}")  # Укажите URL вашего Web App
    web_app_button = types.KeyboardButton(text="Открыть Notepad", web_app=web_app_info)

    markup.add(web_app_button)

    bot.send_message(
        chat_id,    
        "Открыть приложение.",
        reply_markup=markup
    )
@bot.message_handler(content_types=['document'])
def handle_docs(message):
    # Проверяем, что файл имеет расширение .txt
    if message.document.mime_type == 'text/plain':
        file_info = bot.get_file(message.document.file_id)
        downloaded_file = bot.download_file(file_info.file_path)
        
        
        # Декодируем содержимое файла
        fileData = base64.b64encode(downloaded_file).decode("utf-8")
        
        # Отправляем содержимое файла пользователю
        original_filename = message.document.file_name
        with open(original_filename, "wb") as new_file:
            new_file.write(downloaded_file)
        # Создаем инлайн-кнопку
        web_app_info = types.WebAppInfo(f"{WEB_APP_URL}?fileContent={fileData}&chat_id={message.chat.id}&key={generate_encryption_key(message.from_user.id)}")  # Укажите URL вашего Web App
        web_app_button = types.InlineKeyboardButton(text="Открыть Web App", web_app=web_app_info)
        markup = types.InlineKeyboardMarkup()
        markup.add(web_app_button)
        
        # Отправляем обратно файл и инлайн-кнопку
        with open(original_filename, "rb") as file_to_send:
            bot.send_document(message.chat.id, file_to_send, reply_markup=markup)
    else:
        bot.send_message(message.chat.id, "Пожалуйста, отправьте .txt файл.")
def js_btoa(input_string):
    # Кодируем строку в UTF-8
    utf8_bytes = input_string.encode('utf-8')
    # Преобразуем байты в base64
    base64_bytes = base64.b64encode(utf8_bytes)
    # Декодируем байты base64 обратно в строку
    base64_string = base64_bytes.decode('utf-8')
    return base64_string

def generate_encryption_key(user_id):
    # Преобразуем user_id в строку и хэшируем его с помощью SHA-256, чтобы получить 32-байтный (256-битный) ключ
    user_id_str = str(user_id)
    hash_object = hashlib.sha256(user_id_str.encode())  # Хэшируем строку
    encryption_key = hash_object.digest()  # Получаем 32-байтный ключ
    return encryption_key
bot.polling()




