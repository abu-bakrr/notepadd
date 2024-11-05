const path = require('path');
const url = require('url');
const { app, BrowserWindow, dialog } = require('electron');
const fs = require('fs');  // Модуль для работы с файловой системой

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 500,
        height: 800,
        icon: path.join(__dirname, 'img/png.png'),
        backgroundColor: '#222226',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.setMenuBarVisibility(false);
    win.setTitle('nodepad');

    win.loadURL(url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.on('closed', () => {
        win = null;
    });

    // Пример вызова сохранения файла из окна
    win.webContents.on('did-finish-load', () => {
        // Пример сохранения файла
        win.webContents.send('save-file', 'example.txt', 'Это содержимое файла.');
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

// Добавьте обработчик IPC сообщений для сохранения файла
const { ipcMain } = require('electron');

ipcMain.on('save-file', (event, filename, data) => {
    const options = {
        title: 'Сохранить файл',
        defaultPath: filename,
        buttonLabel: 'Сохранить',
        filters: [
            { name: 'Text Files', extensions: ['txt'] }
        ]
    };

    dialog.showSaveDialog(win, options).then(result => {
        if (!result.canceled) {
            const filePath = result.filePath;
            fs.writeFile(filePath, data, (err) => {
                if (err) {
                    console.error('Ошибка при сохранении файла:', err);
                } else {
                    console.log(`Файл успешно сохранён: ${filePath}`);
                }
            });
        }
    }).catch(err => {
        console.error('Ошибка при открытии диалога сохранения файла:', err);
    });
});
