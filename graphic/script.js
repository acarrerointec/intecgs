// Data and initial configuration
let emissionTypeChart = null;
let programStatusChart = null;
let originalData = [];

// Colors for emission types
const emissionTypeColors = {
    'Live': 'rgba(255, 0, 0, 0.8)', // Red
    'Recorded': 'rgba(0, 255, 0, 0.8)', // Green
    'Replay': 'rgba(0, 0, 255, 0.8)', // Blue
    'Delayed': 'rgba(255, 255, 0, 0.8)', // Yellow
    'Short Turnaround': 'rgba(0, 191, 255, 0.8)' // Light Blue
};

// Colors for program statuses
const programStatusColors = {
    'Canceled': 'rgba(255, 0, 0, 0.8)', // Red
    'Approved': 'rgba(255, 255, 0, 0.8)', // Yellow
    'Draft': 'rgba(128, 128, 128, 0.8)', // Gray
    'Published': 'rgba(0, 255, 0, 0.8)' // Green
};

// Generate random data
function generateRandomData() {
    const statuses = ['Canceled', 'Approved', 'Draft', 'Published'];
    const emissionTypes = ['Live', 'Recorded', 'Replay', 'Delayed', 'Short Turnaround'];
    const feeds = ['A', 'B', 'C'];
    const networks = ['706', '315', '420'];
    const startDate = new Date(2023, 0, 1);
    const endDate = new Date(2023, 11, 31);

    return Array.from({ length: 50 }, () => ({
        status: statuses[Math.floor(Math.random() * statuses.length)],
        count: Math.floor(Math.random() * 10) + 1,
        feed: feeds[Math.floor(Math.random() * feeds.length)],
        network: networks[Math.floor(Math.random() * networks.length)],
        emissionType: emissionTypes[Math.floor(Math.random() * emissionTypes.length)],
        programStatus: statuses[Math.floor(Math.random() * statuses.length)], // Same as status
        date: new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())).toISOString().split('T')[0]
    }));
}

// Load initial data
function loadInitialData() {
    originalData = generateRandomData();
    applyFilters();
}

// Validate dates
function validateDates() {
    const dateFrom = document.getElementById('date-from').value;
    const dateTo = document.getElementById('date-to').value;

    if (dateFrom && dateTo && new Date(dateFrom) > new Date(dateTo)) {
        alert('Start date cannot be later than end date.');
        return false;
    }
    return true;
}

// Update Emission Type Chart
function updateEmissionTypeChart(data) {
    const ctx = document.getElementById('emissionTypeChart').getContext('2d');
    const groupedData = groupData(data, 'emissionType');

    if (emissionTypeChart) emissionTypeChart.destroy();

    emissionTypeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: groupedData.labels,
            datasets: [{
                label: 'Count by Emission Type',
                data: groupedData.counts,
                backgroundColor: groupedData.labels.map(label => emissionTypeColors[label]),
                borderColor: groupedData.labels.map(label => emissionTypeColors[label].replace('0.8', '1')),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Update Program Status Chart
function updateProgramStatusChart(data) {
    const ctx = document.getElementById('programStatusChart').getContext('2d');
    const groupedData = groupData(data, 'programStatus');

    if (programStatusChart) programStatusChart.destroy();

    programStatusChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: groupedData.labels,
            datasets: [{
                label: 'Count by Program Status',
                data: groupedData.counts,
                backgroundColor: groupedData.labels.map(label => programStatusColors[label]),
                borderColor: groupedData.labels.map(label => programStatusColors[label].replace('0.8', '1')),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Group data for the chart
function groupData(data, groupBy) {
    const groups = {};
    data.forEach(item => {
        const key = item[groupBy];
        groups[key] = (groups[key] || 0) + item.count;
    });

    return {
        labels: Object.keys(groups),
        counts: Object.values(groups)
    };
}

// Update table
function updateTable(data) {
    const tbody = document.getElementById('reportTableBody');
    tbody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.status}</td>
            <td>${item.count}</td>
            <td>${item.feed}</td>
            <td>${item.network}</td>
            <td>${item.emissionType}</td>
            <td>${item.programStatus}</td>
            <td>${item.date}</td>
        `;
        tbody.appendChild(row);
    });
}

// Apply filters
function applyFilters() {
    if (!validateDates()) return;

    const filters = {
        dateFrom: document.getElementById('date-from').value,
        dateTo: document.getElementById('date-to').value,
        network: document.getElementById('network').value,
        feed: document.getElementById('feed').value,
        emissionType: document.getElementById('emission-type').value,
        programStatus: document.getElementById('program-status').value
    };

    const filteredData = originalData.filter(item => {
        return Object.entries(filters).every(([key, value]) => {
            if (!value || value === 'select') return true;
            if (key === 'dateFrom') return item.date >= value;
            if (key === 'dateTo') return item.date <= value;
            return item[key] === value;
        });
    });

    updateEmissionTypeChart(filteredData);
    updateProgramStatusChart(filteredData);
    updateTable(filteredData);
}

// Clear filters
function clearFilters() {
    document.querySelectorAll('.search-bar select').forEach(select => {
        select.value = 'select';
        $(select).trigger('change');
    });
    document.getElementById('date-from').value = '';
    document.getElementById('date-to').value = '';
    applyFilters();
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Select2
    $('#network, #feed, #emission-type, #program-status').select2({
        minimumResultsForSearch: Infinity
    });

    // Load initial data
    loadInitialData();

    // Set up event listeners
    document.querySelectorAll('.search-bar input, .search-bar select').forEach(element => {
        element.addEventListener('change', applyFilters);
    });
});

/*
// Data and initial configuration
let chart = null;
let originalData = [];

// Colors for emission types
const emissionTypeColors = {
    'Live': 'rgba(255, 0, 0, 0.8)', // Red
    'Recorded': 'rgba(0, 255, 0, 0.8)', // Green
    'Replay': 'rgba(0, 0, 255, 0.8)', // Blue
    'Delayed': 'rgba(255, 255, 0, 0.8)', // Yellow
    'Short Turnaround': 'rgba(0, 191, 255, 0.8)' // Light Blue
};

// Colors for program statuses
const programStatusColors = {
    'Canceled': 'rgba(255, 0, 0, 0.8)', // Red
    'Approved': 'rgba(255, 255, 0, 0.8)', // Yellow
    'Draft': 'rgba(128, 128, 128, 0.8)', // Gray
    'Published': 'rgba(0, 255, 0, 0.8)' // Green
};

// Generate random data
function generateRandomData() {
    const statuses = ['Canceled', 'Approved', 'Draft', 'Published'];
    const emissionTypes = ['Live', 'Recorded', 'Replay', 'Delayed', 'Short Turnaround'];
    const feeds = ['A', 'B', 'C'];
    const networks = ['706', '315', '420'];
    const startDate = new Date(2023, 0, 1);
    const endDate = new Date(2023, 11, 31);

    return Array.from({ length: 50 }, () => ({
        status: statuses[Math.floor(Math.random() * statuses.length)],
        count: Math.floor(Math.random() * 10) + 1,
        feed: feeds[Math.floor(Math.random() * feeds.length)],
        network: networks[Math.floor(Math.random() * networks.length)],
        emissionType: emissionTypes[Math.floor(Math.random() * emissionTypes.length)],
        programStatus: statuses[Math.floor(Math.random() * statuses.length)], // Same as status
        date: new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())).toISOString().split('T')[0]
    }));
}

// Load initial data
function loadInitialData() {
    originalData = generateRandomData();
    applyFilters();
}

// Validate dates
function validateDates() {
    const dateFrom = document.getElementById('date-from').value;
    const dateTo = document.getElementById('date-to').value;

    if (dateFrom && dateTo && new Date(dateFrom) > new Date(dateTo)) {
        alert('Start date cannot be later than end date.');
        return false;
    }
    return true;
}

// Update chart
function updateChart(data) {
    const ctx = document.getElementById('statusChart').getContext('2d');
    const groupedData = groupData(data);

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: groupedData.labels,
            datasets: [{
                label: 'Count by Status',
                data: groupedData.counts,
                backgroundColor: groupedData.labels.map(label => programStatusColors[label]),
                borderColor: groupedData.labels.map(label => programStatusColors[label].replace('0.8', '1')),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Group data for the chart
function groupData(data) {
    const groups = {};
    data.forEach(item => {
        groups[item.status] = (groups[item.status] || 0) + item.count;
    });

    return {
        labels: Object.keys(groups),
        counts: Object.values(groups)
    };
}

// Update table
function updateTable(data) {
    const tbody = document.getElementById('reportTableBody');
    tbody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.status}</td>
            <td>${item.count}</td>
            <td>${item.feed}</td>
            <td>${item.network}</td>
            <td>${item.emissionType}</td>
            <td>${item.programStatus}</td>
            <td>${item.date}</td>
        `;
        tbody.appendChild(row);
    });
}

// Apply filters
function applyFilters() {
    if (!validateDates()) return;

    const filters = {
        dateFrom: document.getElementById('date-from').value,
        dateTo: document.getElementById('date-to').value,
        network: document.getElementById('network').value,
        feed: document.getElementById('feed').value,
        emissionType: document.getElementById('emission-type').value,
        programStatus: document.getElementById('program-status').value
    };

    const filteredData = originalData.filter(item => {
        return Object.entries(filters).every(([key, value]) => {
            if (!value || value === 'select') return true;
            if (key === 'dateFrom') return item.date >= value;
            if (key === 'dateTo') return item.date <= value;
            return item[key] === value;
        });
    });

    updateChart(filteredData);
    updateTable(filteredData);
}

// Clear filters
function clearFilters() {
    document.querySelectorAll('.search-bar select').forEach(select => {
        select.value = 'select';
        $(select).trigger('change');
    });
    document.getElementById('date-from').value = '';
    document.getElementById('date-to').value = '';
    applyFilters();
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Select2
    $('#network, #feed, #emission-type, #program-status').select2({
        minimumResultsForSearch: Infinity
    });

    // Load initial data
    loadInitialData();

    // Set up event listeners
    document.querySelectorAll('.search-bar input, .search-bar select').forEach(element => {
        element.addEventListener('change', applyFilters);
    });
});

/*

// Data and initial configuration
let chart = null;
let originalData = [];

// Colors for emission types
const emissionTypeColors = {
    'Live': 'rgba(255, 0, 0, 0.8)', // Red
    'Recorded': 'rgba(0, 255, 0, 0.8)', // Green
    'Replay': 'rgba(0, 0, 255, 0.8)', // Blue
    'Delayed': 'rgba(255, 255, 0, 0.8)', // Yellow
    'Short Turnaround': 'rgba(0, 191, 255, 0.8)' // Light Blue
};

// Colors for program statuses
const programStatusColors = {
    'Canceled': 'rgba(255, 0, 0, 0.8)', // Red
    'Approved': 'rgba(255, 255, 0, 0.8)', // Yellow
    'Draft': 'rgba(128, 128, 128, 0.8)', // Gray
    'Published': 'rgba(0, 255, 0, 0.8)' // Green
};

// Generate random data
function generateRandomData() {
    const statuses = ['Canceled', 'Approved', 'Draft', 'Published'];
    const emissionTypes = ['Live', 'Recorded', 'Replay', 'Delayed', 'Short Turnaround'];
    const feeds = ['A', 'B', 'C'];
    const networks = ['706', '315', '420'];
    const startDate = new Date(2023, 0, 1);
    const endDate = new Date(2023, 11, 31);

    return Array.from({ length: 50 }, () => ({
        status: statuses[Math.floor(Math.random() * statuses.length)],
        count: Math.floor(Math.random() * 10) + 1,
        feed: feeds[Math.floor(Math.random() * feeds.length)],
        network: networks[Math.floor(Math.random() * networks.length)],
        emissionType: emissionTypes[Math.floor(Math.random() * emissionTypes.length)],
        programStatus: statuses[Math.floor(Math.random() * statuses.length)], // Same as status
        date: new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())).toISOString().split('T')[0]
    }));
}

// Load initial data
function loadInitialData() {
    originalData = generateRandomData();
    applyFilters();
}

// Validate dates
function validateDates() {
    const dateFrom = document.getElementById('date-from').value;
    const dateTo = document.getElementById('date-to').value;

    if (dateFrom && dateTo && new Date(dateFrom) > new Date(dateTo)) {
        alert('Start date cannot be later than end date.');
        return false;
    }
    return true;
}

// Update chart
function updateChart(data) {
    const ctx = document.getElementById('statusChart').getContext('2d');
    const groupedData = groupData(data);

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: groupedData.labels,
            datasets: [{
                label: 'Count by Status',
                data: groupedData.counts,
                backgroundColor: groupedData.labels.map(label => programStatusColors[label]),
                borderColor: groupedData.labels.map(label => programStatusColors[label].replace('0.8', '1')),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Group data for the chart
function groupData(data) {
    const groups = {};
    data.forEach(item => {
        groups[item.status] = (groups[item.status] || 0) + item.count;
    });

    return {
        labels: Object.keys(groups),
        counts: Object.values(groups)
    };
}

// Update table
function updateTable(data) {
    const tbody = document.getElementById('reportTableBody');
    tbody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.status}</td>
            <td>${item.count}</td>
            <td>${item.feed}</td>
            <td>${item.network}</td>
            <td>${item.emissionType}</td>
            <td>${item.programStatus}</td>
            <td>${item.date}</td>
        `;
        tbody.appendChild(row);
    });
}

// Apply filters
function applyFilters() {
    if (!validateDates()) return;

    const filters = {
        dateFrom: document.getElementById('date-from').value,
        dateTo: document.getElementById('date-to').value,
        network: document.getElementById('network').value,
        feed: document.getElementById('feed').value,
        emissionType: document.getElementById('emission-type').value,
        programStatus: document.getElementById('program-status').value
    };

    const filteredData = originalData.filter(item => {
        return Object.entries(filters).every(([key, value]) => {
            if (!value || value === 'select') return true;
            if (key === 'dateFrom') return item.date >= value;
            if (key === 'dateTo') return item.date <= value;
            return item[key] === value;
        });
    });

    updateChart(filteredData);
    updateTable(filteredData);
}

// Clear filters
function clearFilters() {
    document.querySelectorAll('.search-bar select').forEach(select => {
        select.value = 'select';
        $(select).trigger('change');
    });
    document.getElementById('date-from').value = '';
    document.getElementById('date-to').value = '';
    applyFilters();
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Select2
    $('#network, #feed, #emission-type, #program-status').select2({
        minimumResultsForSearch: Infinity
    });

    // Load initial data
    loadInitialData();

    // Set up event listeners
    document.querySelectorAll('.search-bar input, .search-bar select').forEach(element => {
        element.addEventListener('change', applyFilters);
    });
});
/*
// Datos y configuración inicial
let chart = null;
let originalData = [];

// Cargar datos iniciales
async function loadInitialData() {
    try {
        const response = await fetch('https://api.example.com/data'); // Reemplazar con tu API
        originalData = await response.json();
        applyFilters();
    } catch (error) {
        console.error('Error loading data:', error);
        // Datos de ejemplo si falla la API
        originalData = [
            { status: 'Canceled', count: 5, feed: 'A', network: '706', emissionType: 'live', programStatus: 'canceled', date: '2023-10-01' },
            { status: 'Draft', count: 3, feed: 'B', network: '315', emissionType: 'recorded', programStatus: 'draft', date: '2023-10-02' },
            { status: 'Approved', count: 10, feed: 'A', network: '706', emissionType: 'replay', programStatus: 'approved', date: '2023-10-03' },
            { status: 'Published', count: 7, feed: 'B', network: '315', emissionType: 'delayed', programStatus: 'published', date: '2023-10-04' },
        ];
        applyFilters();
    }
}

// Validación de fechas
function validateDates() {
    const dateFrom = document.getElementById('date-from').value;
    const dateTo = document.getElementById('date-to').value;
    
    if (dateFrom && dateTo && new Date(dateFrom) > new Date(dateTo)) {
        alert('Start date cannot be later than end date');
        return false;
    }
    return true;
}

// Actualizar gráfico
function updateChart(data) {
    const ctx = document.getElementById('statusChart').getContext('2d');
    const groupedData = groupData(data);
    
    if (chart) chart.destroy();
    
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: groupedData.labels,
            datasets: [{
                label: 'Count by Status',
                data: groupedData.counts,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Agrupar datos para el gráfico
function groupData(data) {
    const groups = {};
    data.forEach(item => {
        groups[item.status] = (groups[item.status] || 0) + item.count;
    });
    
    return {
        labels: Object.keys(groups),
        counts: Object.values(groups)
    };
}

// Actualizar tabla
function updateTable(data) {
    const tbody = document.getElementById('reportTableBody');
    tbody.innerHTML = '';
    
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.status}</td>
            <td>${item.count}</td>
            <td>${item.feed}</td>
            <td>${item.network}</td>
            <td>${item.date}</td>
        `;
        tbody.appendChild(row);
    });
}

// Aplicar filtros
function applyFilters() {
    if (!validateDates()) return;
    
    const filters = {
        dateFrom: document.getElementById('date-from').value,
        dateTo: document.getElementById('date-to').value,
        network: document.getElementById('network').value,
        feed: document.getElementById('feed').value,
        emissionType: document.getElementById('emission-type').value,
        programStatus: document.getElementById('program-status').value
    };

    const filteredData = originalData.filter(item => {
        return Object.entries(filters).every(([key, value]) => {
            if (!value || value === 'select') return true;
            if (key === 'dateFrom') return item.date >= value;
            if (key === 'dateTo') return item.date <= value;
            return item[key] === value;
        });
    });

    updateChart(filteredData);
    updateTable(filteredData);
}

// Limpiar filtros
function clearFilters() {
    document.querySelectorAll('.search-bar select').forEach(select => {
        select.value = 'select';
        $(select).trigger('change');
    });
    document.getElementById('date-from').value = '';
    document.getElementById('date-to').value = '';
    applyFilters();
}

// Toggle sidebar
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('collapsed');
    document.querySelector('main').classList.toggle('expanded');
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar Select2
    $('#network, #feed, #emission-type, #program-status').select2({
        minimumResultsForSearch: Infinity
    });
    
    // Cargar datos iniciales
    loadInitialData();
    
    // Configurar eventos
    document.querySelectorAll('.search-bar input, .search-bar select').forEach(element => {
        element.addEventListener('change', applyFilters);
    });
});

// Logout (ejemplo)
document.getElementById('logout-button').addEventListener('click', () => {
    // Lógica de logout aquí
    window.location.href = '/login';
});
*/