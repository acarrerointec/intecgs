function applyFilter() {
    const filterValue = document.getElementById('filter-options').value;
    const allContainers = document.querySelectorAll('.table-container');
    
    allContainers.forEach(container => {
        container.classList.remove('active-table');
    });

    if(filterValue === 'all') {
        allContainers.forEach(container => {
            container.classList.add('active-table');
        });
    } else {
        const targetContainer = document.getElementById(`${filterValue}-table`);
        if(targetContainer) {
            targetContainer.classList.add('active-table');
        }
    }
}

window.onload = function() {
    applyFilter();
}

function toggleTimeInput(type, isEnabled) {
    const timeInput = document.getElementById(`${type}-time`);
    timeInput.disabled = !isEnabled;

    if(isEnabled) {
        timeInput.value = type === 'started' ? '02:00' : '03:00';
    }
}

function toggleApplyButton(isEnabled) {
    document.getElementById('save-email').disabled = !isEnabled;
}

// Función para limpiar las opciones después de guardar
function clearSelections() {
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });

    document.querySelectorAll('input[type="time"]').forEach(timeInput => {
        timeInput.value = timeInput.id === 'started-time' ? '02:00' : '03:00';
        timeInput.disabled = true;
    });

    document.getElementById('general-comment').value = '';
}

document.getElementById('save-button').addEventListener('click', function() {
    const currentDateTime = new Date().toLocaleString();
    const generalComment = document.getElementById('general-comment').value;

    const startedStatus = document.getElementById('started-yes').checked ? 'Yes' : 'No';
    const startedTime = document.getElementById('started-time').value;
    const endStatus = document.getElementById('end-yes').checked ? 'Yes' : 'No';
    const endTime = document.getElementById('end-time').value;

    let description = `Started: ${startedStatus}${startedStatus === 'No' ? ` (${startedTime})` : ''}, `;
    description += `Ended: ${endStatus}${endStatus === 'No' ? ` (${endTime})` : ''}`;

    const signalStatus = document.getElementById('signal-yes').checked ? 'Yes' : 'No';
    const satelliteStatus = document.getElementById('satellite-yes').checked ? 'Yes' : 'No';
    description += ` | Signal: ${signalStatus}, Satellite: ${satelliteStatus}`;

    const audioStatus = document.getElementById('audio-yes').checked ? 'Yes' : 'No';
    const batchStatus = document.getElementById('batch-yes').checked ? 'Yes' : 'No';
    description += ` | Audio: ${audioStatus}, Batch: ${batchStatus}`;

    const bottomlineStatus = document.getElementById('bottomline-yes').checked ? 'Yes' : 'No';
    description += ` | Bottomline: ${bottomlineStatus}`;

    if (generalComment) {
        description += ` | Comments: ${generalComment}`;
    }

    const tableBody = document.getElementById('log-body');
    const newRow = tableBody.insertRow();
    
    newRow.innerHTML = `
        <td>${currentDateTime}</td>
        <td>System</td> 
        <td>Operator</td>
        <td>${description}</td>
    `;

    clearSelections();
});


let chartInstance = null;

document.getElementById('toggleChart').addEventListener('click', function() {
    const container = document.getElementById('chartContainer');
    container.style.display = container.style.display === 'none' ? 'block' : 'none';
    if (container.style.display === 'block') {
        updateChart();
    }
});

function updateChart() {
    const ctx = document.getElementById('reportChart').getContext('2d');
    const categories = {
        'Started on time': 0,
        'End on time': 0,
        'Cuts in Signal': 0,
        'Satellite Cut': 0,
        'Audio Ok': 0,
        'The Batch Coincidence': 0,
        'Bottomline with Problems': 0
    };

    document.querySelectorAll('#log-body tr').forEach(row => {
        const desc = row.cells[3].textContent;
        if (desc.includes('Started: Yes')) categories['Started on time']++;
        if (desc.includes('Ended: Yes')) categories['End on time']++;
        if (desc.includes('Signal: Yes')) categories['Cuts in Signal']++;
        if (desc.includes('Satellite: Yes')) categories['Satellite Cut']++;
        if (desc.includes('Audio: Yes')) categories['Audio Ok']++;
        if (desc.includes('Batch: Yes')) categories['The Batch Coincidence']++;
        if (desc.includes('Bottomline: Yes')) categories['Bottomline with Problems']++;
    });

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(categories),
            datasets: [{
                label: 'Incidentes por Categoría',
                data: Object.values(categories),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                    'rgba(201, 203, 207, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(201, 203, 207, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Category'
                    }
                }
            }
        }
    });
}








/*
function applyFilter() {
    const filterValue = document.getElementById('filter-options').value;
    const allContainers = document.querySelectorAll('.table-container');
    
    // Ocultar todas las tablas primero
    allContainers.forEach(container => {
        container.classList.remove('active-table');
    });

    // Mostrar la selección
    if(filterValue === 'all') {
        allContainers.forEach(container => {
            container.classList.add('active-table');
        });
    } else {
        const targetContainer = document.getElementById(`${filterValue}-table`);
        if(targetContainer) {
            targetContainer.classList.add('active-table');
        }
    }
}

// Mostrar todas las tablas al cargar inicialmente
window.onload = function() {
    applyFilter(); // Muestra todas las tablas por defecto
}

// Función para habilitar/deshabilitar inputs de tiempo
function toggleTimeInput(type, isEnabled) {
    const timeInput = document.getElementById(`${type}-time`);
    timeInput.disabled = isEnabled;
    
    // Restablecer valor original si se vuelve a seleccionar "Yes"
    if(isEnabled) {
        timeInput.value = type === 'started' ? '02:00' : '03:00';
    }
}

// limpiar las opciones de incidents


document.getElementById('save-button').addEventListener('click', function() {
    const currentDateTime = new Date().toLocaleString();
    const reportedBy = document.getElementById('reported-time-options').value;
    const generalComment = document.getElementById('general-comment').value;

    // Obtener tiempos modificados
    const startedTime = document.getElementById('started-time').value;
    const endTime = document.getElementById('end-time').value;

    let description = '';

    // Manejar started time
    const startedStatus = document.getElementById('started-yes').checked ? 'Yes' : 'No';
    description += `Started: ${startedStatus}`;
    if(startedStatus === 'No') {
        description += ` (${startedTime})`;
    }

    // Manejar end time
    const endStatus = document.getElementById('end-yes').checked ? 'Yes' : 'No';
    description += `, Ended: ${endStatus}`;
    if(endStatus === 'No') {
        description += ` (${endTime})`;
    }

    // Resto de las secciones (se mantienen igual)
    const signalStatus = document.getElementById('signal-yes').checked ? 'Yes' : 'No';
    const satelliteStatus = document.getElementById('satellite-yes').checked ? 'Yes' : 'No';
    description += ` | Signal: ${signalStatus}, Satellite: ${satelliteStatus}`;

    const audioStatus = document.getElementById('audio-yes').checked ? 'Yes' : 'No';
    const batchStatus = document.getElementById('batch-yes').checked ? 'Yes' : 'No';
    description += ` | Audio: ${audioStatus}, Batch: ${batchStatus}`;

    const bottomlineStatus = document.getElementById('bottomline-yes').checked ? 'Yes' : 'No';
    description += ` | Bottomline: ${bottomlineStatus}`;

    if(generalComment) {
        description += ` | Comments: ${generalComment}`;
    }

    const tableBody = document.getElementById('log-body');
    const newRow = tableBody.insertRow();
    
    newRow.innerHTML = `
        <td>${currentDateTime}</td>
        <td>${reportedBy}</td>
        <td>Operator</td>
        <td>${description}</td>
    `;

    document.getElementById('general-comment').value = '';
});
*/

/* Graficos de los reportes v1 
document.addEventListener("DOMContentLoaded", function() {
    let reportCounts = {
        Time: 0,
        Origin: 0,
        Technical: 0,
        Operation: 0
    };

    let chart;
    function updateChart() {
        const ctx = document.getElementById('reportChart').getContext('2d');
        if (chart) chart.destroy();
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(reportCounts),
                datasets: [{
                    label: 'Number of Reports',
                    data: Object.values(reportCounts),
                    backgroundColor: ['red', 'blue', 'green', 'yellow']
                }]
            }
        });
    }

    function logReport(category) {
        if (reportCounts.hasOwnProperty(category)) {
            reportCounts[category]++;
            updateChart();
        }
    }

    document.getElementById("toggleChart").addEventListener("click", function() {
        let chartContainer = document.getElementById("chartContainer");
        chartContainer.style.display = chartContainer.style.display === "none" ? "block" : "none";
    });

    document.getElementById("save-button").addEventListener("click", function() {
        if (document.getElementById("started-no").checked) logReport("Time");
        if (document.getElementById("end-no").checked) logReport("Time");
        if (document.getElementById("signal-yes").checked) logReport("Origin");
        if (document.getElementById("satellite-yes").checked) logReport("Origin");
        if (document.getElementById("audio-no").checked) logReport("Technical");
        if (document.getElementById("batch-no").checked) logReport("Technical");
        if (document.getElementById("bottomline-yes").checked) logReport("Operation");
    });

    updateChart();
});
*/