

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
    
    document.querySelectorAll('.open-popup').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const url = this.href;

            // Abrir ventana emergente
            const popup = window.open(
                url,
                'popupWindow',
                'width=1024,height=768,left=100,top=50,resizable=yes,scrollbars=yes'
            );

            if (popup) {
                // Configurar confirmación al cerrar la ventana
                popup.onbeforeunload = function () {
                    return "¿Estás seguro de que deseas cerrar esta ventana?";
                };
            }
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
