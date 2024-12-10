let logCounter = 1;
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('save-button').addEventListener('click', function() {
        // Obtener la fecha y hora actuales
        const now = new Date();
        const formattedDate = now.toLocaleDateString();
        const formattedTime = now.toLocaleTimeString();


        if (comentarios) {
        // Obtener valores del formulario
        const comentarios = document.querySelector('textarea[name="comentarios"]').value;

        // Crear una nueva fila para la tabla
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${logCounter}</td>
            <td>${formattedDate}</td>
            <td>${formattedTime}</td>
            <td>user@disney.com</td>
            <td>Comments: ${comentarios}</td>
        `;
            logCounter++;
        // Agregar la nueva fila al cuerpo de la tabla
        document.getElementById('log-body').appendChild(newRow);

        // Limpiar los campos del formulario
        document.querySelector('textarea[name="comentarios"]').value = '';

        }else{

            alert("Por favor, complete todos los campos antes de guardar.");
        }
    });
});