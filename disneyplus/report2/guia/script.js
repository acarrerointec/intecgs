let logCounter = 1;

document.getElementById('save-button').addEventListener('click', function () {
    // Capturando los valores de los inputs
    const seed = document.getElementById('seed').value;
    const quadrant = document.getElementById('quadrant').value;
    const general = document.getElementById('comentariosGeneral').value;
    const note = document.getElementById('comentariosNote').value;

    // Obtener la hora actual
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();

    // Verificar que todos los campos estén completos
    if (seed && quadrant && general && note) {
        // Crear una nueva fila
        const tableBody = document.getElementById('log-body');
        const newRow = tableBody.insertRow(); // Crea una nueva fila

        // Agregar las celdas con la información
        newRow.insertCell(0).textContent = logCounter;
        newRow.insertCell(1).textContent = formattedDate; // Fecha actual
        newRow.insertCell(2).textContent = formattedTime; // Hora actual
        newRow.insertCell(3).textContent = 'user@diney.com'; // Operador

        // Celda con detalles
        const detailCell = newRow.insertCell(4);
        detailCell.innerHTML = `
            <strong>Seed:</strong> ${seed}<br>
            <strong>Quadrant:</strong> ${quadrant}<br>
            <strong>General:</strong> ${general}<br>
            <strong>Note:</strong> ${note}
        `;

        // Incrementar el contador de log
        logCounter++;

        // Limpiar los campos de entrada después de guardar los datos
        document.getElementById('seed').value = '';
        document.getElementById('quadrant').value = '';
        document.getElementById('comentariosGeneral').value = '';
        document.getElementById('comentariosNote').value = '';
    } else {
        alert('Por favor, complete todos los campos antes de guardar.');
    }
});
