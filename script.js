document.addEventListener("DOMContentLoaded", function () {
    var hotElement = document.querySelector('#hot');
    var hotSettings = {
        data: [
            [1, "Имя", "Фамилия"],
            [2, "Имя", "Фамилия"],
            [, "", ""],
            [4, "Имя", "Фамилия"],
            // ...
        ],
        columns: [
            { data: 0, type: 'numeric', width: 0 },
            { data: 1, type: 'text' },
            { data: 2, type: 'text' }
        ],
        colHeaders: ['ID', 'Имя', 'Фамилия'],
        columnSorting: true,
        filters: true,
        hiddenColumns: {
            columns: [0], // Скрываем столбец с ID
            indicators: false
        }
    };
    
    var hot = new Handsontable(hotElement, hotSettings);

    document.querySelector('#exportButton').addEventListener('click', function () {
        var filteredData = hot.getData().filter(function (row) {
            return row[0] !== null; // Фильтруем, исключаем пустые строки
        }).map(function (row) {
            return row[0]; // Извлекаем ID
        });

        // Отправляем запрос на экспорт данных
        exportFilteredData(filteredData);
    });

    function exportFilteredData(ids) {
        fetch('http://localhost:3000/export', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids: ids })
        })
            .then(response => response.blob())
            .then(blob => {
                // Создаем ссылку на файл и скачиваем его
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = 'exported_data.xlsx';
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => console.error('Ошибка при экспорте данных: ', error));
    }
});
