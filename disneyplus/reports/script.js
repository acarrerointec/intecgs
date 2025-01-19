
    // Función para activar/desactivar los inputs de hora
    function toggleTimeInput(type) {
        const checkbox = document.getElementById(`${type}-switch`);
        const status = document.getElementById(`${type}-status`);
        const timeInput = document.getElementById(`${type}-time`);

        if (checkbox.checked) {
            status.textContent = "Yes";
            timeInput.disabled = false;
        } else {
            status.textContent = "No";
            timeInput.disabled = true;
        }
    }

    // Función para activar/desactivar las opciones de los selectores
    function toggleSwitch(type) {
        const checkbox = document.getElementById(`${type}-switch`);
        const status = document.getElementById(`${type}-status`);
        const select = document.getElementById(`${type}-time-options`);

        if (checkbox.checked) {
            status.textContent = "Yes";
            if (select) select.disabled = false;
        } else {
            status.textContent = "No";
            if (select) select.disabled = true;
        }
    }

    // Función para agregar un registro a la tabla de informes consolidados
    function addRecordToTable() {
        // Obtener los valores de los campos
        const startedStatus = document.getElementById('started-status').textContent;
        const startedTime = document.getElementById('started-time').value;
        const endStatus = document.getElementById('end-status').textContent;
        const endTime = document.getElementById('end-time').value;
        const bottomlineStatus = document.getElementById('bottomline-status').textContent;
        const bottomStatus = document.getElementById('bottomline-time-options').value;
        const batchStatus = document.getElementById('batch-status').textContent;
        const batchOption = document.getElementById('batch-time-options').value;
        const audioStatus = document.getElementById('audio-status').textContent;
        const audioOptions = document.getElementById('audio-time-options').value;
        const signalStatus = document.getElementById('signal-status').textContent;
        const signalOptions = document.getElementById('signal-time-options').value;
        const satelliteStatus = document.getElementById('satellite-status').textContent;
        const satelliteOption = document.getElementById('satellite-time-options').value;

        const comentarios1 = document.querySelector('textarea[name="comentarios1"]').value;
        const comentarios2 = document.querySelector('textarea[name="comentarios2"]').value;
        const comentarios3 = document.querySelector('textarea[name="comentarios3"]').value;

        // Obtener la fecha y hora actuales
        const currentDate = new Date();
        const dateString = currentDate.toLocaleDateString();
        const timeString = currentDate.toLocaleTimeString();

        // Crear una nueva fila para la tabla
        const newRow = document.createElement('tr');

        // Crear las celdas con los valores obtenidos
        const dateCell = document.createElement('td');
        const reported = document.createElement('td');
        const operatorCell = document.createElement('td');
        const descriptionCell = document.createElement('td');

        // Asignar valores a las celdas
        dateCell.textContent = currentDate.toLocaleString(); // Formato de fecha y hora
        reported.textContent = 'Operator';
        operatorCell.textContent = 'user@disney.com';  // Aquí puedes agregar el nombre real del operador
        descriptionCell.textContent = `Started on time: ${startedTime}, End on time: ${endTime}, Bottomline report: ${bottomStatus}, 
                                       Batch report: ${batchOption}, Audio report: ${audioOptions}, Signal report: ${signalOptions}, 
                                       Satellite report: ${satelliteOption}, Emission comments - Origin: ${comentarios1}, Technical: ${comentarios2}, 
                                       Operation: ${comentarios3}`;

        // Agregar las celdas a la fila
        newRow.appendChild(dateCell);
        newRow.appendChild(reported);
        newRow.appendChild(operatorCell);
        newRow.appendChild(descriptionCell);

        // Insertar la nueva fila en la tabla
        document.getElementById('log-body').appendChild(newRow);

        // Limpiar los campos después de guardar el registro
        clearFields();
    }

    // Función para limpiar los campos del formulario
    function clearFields() {
        // Limpiar las áreas de texto de comentarios
        document.querySelector('textarea[name="comentarios1"]').value = '';
        document.querySelector('textarea[name="comentarios2"]').value = '';
        document.querySelector('textarea[name="comentarios3"]').value = '';

        // Limpiar los estados de los switches y las selecciones de los time-options
        const switches = document.querySelectorAll('.switch input');
        switches.forEach(switchElement => {
            switchElement.checked = false;
        });

        const statuses = document.querySelectorAll('.status-text');
        statuses.forEach(status => {
            status.textContent = "No";
        });

        const timeInputs = document.querySelectorAll('input[type="time"]');
        timeInputs.forEach(timeInput => {
            timeInput.value = "02:00";
            timeInput.disabled = true;
        });

        const selects = document.querySelectorAll('select');
        selects.forEach(select => {
            select.value = "0";
            select.disabled = true;
        });
    }

    // Asociar la función al evento de clic del botón "Save"
    document.getElementById('save-button').addEventListener('click', addRecordToTable);
    document.getElementById('save-email').addEventListener('click', addRecordToTable);
