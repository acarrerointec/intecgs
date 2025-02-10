
// File: graph.js

document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('statusChart').getContext('2d');
    const tableBody = document.getElementById('reportTableBody');

    function fetchData() {
        const dateFrom = document.getElementById('date-from').value;
        const network = document.getElementById('network').value;
        const feed = document.getElementById('feed').value;
        
        // Simulated data based on filters
        let filteredData = {
            labels: ['Completed', 'In Progress', 'Pending', 'Failed'],
            values: [30, 20, 15, 5], // Example data
            colors: ['green', 'yellow', 'gray', 'red']
        };

        updateChart(filteredData);
        updateTable(filteredData);
    }

    function updateChart(data) {
        statusChart.data.labels = data.labels;
        statusChart.data.datasets[0].data = data.values;
        statusChart.update();
    }

    function updateTable(data) {
        tableBody.innerHTML = '';
        data.labels.forEach((label, index) => {
            let row = `<tr>
                <td>${label}</td>
                <td style='color: ${data.colors[index]}'>${data.values[index]}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    }

    document.querySelector('.apply-button').addEventListener('click', fetchData);

    const statusChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Completed', 'In Progress', 'Pending', 'Failed'],
            datasets: [{
                label: 'Report Count',
                data: [30, 20, 15, 5],
                backgroundColor: ['green', 'yellow', 'gray', 'red']
            }]
        }
    });

    document.getElementById('network').addEventListener('change', fetchData);
    document.getElementById('feed').addEventListener('change', fetchData);
});




/*
// Archivo: graph.js

// Incluir Chart.js
document.addEventListener('DOMContentLoaded', function () {
    const ctx1 = document.getElementById('statusChart').getContext('2d');
    const ctx2 = document.getElementById('typeChart').getContext('2d');

    function fetchData() {
        const dateFrom = document.getElementById('date-from').value;
        const network = document.getElementById('network').value;
        const feed = document.getElementById('feed').value;
        
        // Simulación de datos basados en los filtros
        let filteredData = {
            status: [30, 20, 15, 5], // Completado, En proceso, Pendiente, Fallido
            type: [40, 25, 20, 15]   // Técnico, Operación, Origen, Otro
        };

        updateCharts(filteredData);
    }

    function updateCharts(data) {
        statusChart.data.datasets[0].data = data.status;
        statusChart.update();

        typeChart.data.datasets[0].data = data.type;
        typeChart.update();
    }

    document.querySelector('.apply-button').addEventListener('click', fetchData);

    const statusChart = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Completado', 'En proceso', 'Pendiente', 'Fallido'],
            datasets: [{
                label: 'Cantidad de reportes',
                data: [30, 20, 15, 5],
                backgroundColor: ['green', 'yellow', 'gray', 'red']
            }]
        }
    });

    const typeChart = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: ['Técnico', 'Operación', 'Origen', 'Otro'],
            datasets: [{
                data: [40, 25, 20, 15],
                backgroundColor: ['green', 'yellow', 'red', 'gray']
            }]
        }
    });
});
**/