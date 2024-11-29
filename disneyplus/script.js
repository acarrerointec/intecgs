document.addEventListener('DOMContentLoaded', () => {
    const routineTab = document.getElementById('routine-tab');
    const routineSection = document.getElementById('routine-section');
    const reportTab = document.getElementById('report-tab');
    const reportSection = document.getElementById('report-section');
    const dynamicTableBody = document.querySelector('#dynamic-table tbody');
    const rows = document.querySelectorAll('.clickable-row');
    
    // Listener para las filas de la tabla principal
    rows.forEach((row) => {
        row.addEventListener('click', () => {
            // Activar botones de Routine y Report
            routineTab.classList.add('active');
            reportTab.classList.add('active');
     
            // Mostrar secciones correspondientes
            routineSection.classList.remove('hidden');
            reportSection.classList.remove('hidden');

            // Clonar la fila seleccionada en la tabla dinámica
            const newRow = row.cloneNode(true);
            newRow.classList.remove('clickable-row'); // Remover la funcionalidad de click en las filas clonadas
            dynamicTableBody.appendChild(newRow);
        });
    });

    // Redirección para el botón Routine
    routineTab.addEventListener('click', () => {
        window.location.href = '/rutine/rutine4/routine4.html';
    });

    // Redirección para el botón Report
    reportTab.addEventListener('click', () => {
        window.location.href = '/report/report2/report3.html';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const contextMenu = document.getElementById('contextMenu');
    
    document.querySelectorAll('.main-table td').forEach(cell => {
        cell.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            const { clientX: mouseX, clientY: mouseY } = event;

            contextMenu.style.display = 'block';
            contextMenu.style.left = `${mouseX}px`;
            contextMenu.style.top = `${mouseY}px`;
        });
    });

    document.addEventListener('click', () => {
        contextMenu.style.display = 'none';
    });

    // Cerrar menú contextual al hacer clic fuera
    document.addEventListener('click', (event) => {
        if (!contextMenu.contains(event.target)) {
            contextMenu.style.display = 'none';
        }
    });
});



/* tabla dinamica */
function toggleConfigPanel() {
    const configPanel = document.getElementById('configPanel');
    configPanel.classList.toggle('open');
}

function saveConfiguration() {
    const configPanel = document.getElementById('configPanel');
    const checkboxes = configPanel.querySelectorAll('.column-toggle');
    const newOrder = Array.from(configPanel.querySelectorAll('.draggable'));
    const mainTable = document.getElementById('mainTable');

    // Obtener datos actuales de la tabla
    const currentHeaders = Array.from(mainTable.querySelectorAll('thead th')).map(th => th.textContent.trim());
    const rowsData = Array.from(mainTable.querySelectorAll('tbody tr')).map(row =>
        Array.from(row.querySelectorAll('td')).map(td => td.textContent.trim())
    );

    // Actualizar encabezados y filas según la nueva configuración
    const headerRow = mainTable.querySelector('thead tr');
    const rows = mainTable.querySelectorAll('tbody tr');
    headerRow.innerHTML = '';
    rows.forEach(row => row.innerHTML = '');

    newOrder.forEach((col, index) => {
        const isVisible = checkboxes[index].checked;
        const colName = col.textContent.trim();
        const colIndex = currentHeaders.indexOf(colName);

        if (isVisible) {
            // Crear encabezado
            const th = document.createElement('th');
            th.textContent = colName;
            headerRow.appendChild(th);

            // Añadir datos a cada fila
            rows.forEach((row, rowIndex) => {
                const td = document.createElement('td');
                td.textContent = rowsData[rowIndex][colIndex]; // Mantener el dato original
                row.appendChild(td);
            });
        }
    });

    configPanel.classList.remove('open');
}

// Arrastre de elementos
const draggables = document.querySelectorAll('.draggable');
const configPanel = document.getElementById('configPanel');

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    });
});

configPanel.addEventListener('dragover', e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(configPanel, e.clientY);
    const dragging = document.querySelector('.dragging');
    if (afterElement == null) {
        configPanel.appendChild(dragging);
    } else {
        configPanel.insertBefore(dragging, afterElement);
    }
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
