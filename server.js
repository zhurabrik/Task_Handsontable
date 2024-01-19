const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ExcelJS = require('exceljs');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.get('/export', (req, res) => {
    // Обработка GET-запроса, если понадобится
    res.send('Получен запрос GET для /export');
});

app.post('/export', (req, res) => {
    const ids = req.body.ids;
    console.log('Получен запрос на экспорт с ID:', ids);

    // Создаем новую книгу и лист в Excel
    // const workbook = new ExcelJS.Workbook();
    // const worksheet = workbook.addWorksheet('Отфильтрованные данные');

    // Тут сделать добавление заголовков и данных в Excel, если мне станет интересно попробовать) А пока закомментирую скачивание пустого файла
    // ... 

    // Отправляем Excel файл пользователю
    // res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    // res.setHeader('Content-Disposition', 'attachment; filename=' + 'exported_data.xlsx');

    // workbook.xlsx.write(res).then(() => {
    //     res.end();
    // });
});

app.listen(3000, () => {
    console.log('Сервер запущен: http://localhost:3000/export');
});
