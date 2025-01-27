
   /*
   
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
        descriptionCell.textContent = `Started on time:${startedTime}, End on time: ${endTime}, Bottomline report: ${bottomStatus}, 
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

*/
// deplegables

function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const content = section.querySelector('.section-content');
    const icon = section.querySelector('.section-header i');

    if (content.classList.contains('active')) {
        content.classList.remove('active');
        icon.style.transform = 'rotate(0deg)';
    } else {
        content.classList.add('active');
        icon.style.transform = 'rotate(180deg)';
    }
}

function toggleCommentBox(commentType, enable, commentId) {
    const commentBox = document.getElementById(commentId);
    if (commentBox) {
        commentBox.disabled = !enable;
    }
}


// modificacion de horario 

function toggleTimeInput(prefix, enable) {
    const timeInput = document.getElementById(`${prefix}-time`);
    timeInput.disabled = !enable; // Habilita o deshabilita el campo de tiempo
    if (enable) {
        timeInput.focus(); // Enfoca el campo de tiempo si se habilita
    }
}

// boton email
/*
function toggleEmailInput(name, isYes) {
    if (isYes) {
        // Lógica para cuando se selecciona "Yes"
        console.log("Send Email: Yes");
    } else {
        // Lógica para cuando se selecciona "No"
        console.log("Send Email: No");
    }
}
*/

document.getElementById("save-button").addEventListener("click", () => {
    const logBody = document.getElementById("log-body");

    // Recopilar datos de las secciones
    const startTime = document.getElementById("started-time").value;
    const endTime = document.getElementById("end-time").value;

    const signalComment = document.getElementById("signal-comment").value || "N/A";
    const satelliteComment = document.getElementById("satellite-comment").value || "N/A";

    const audioComment = document.getElementById("audio-comment").value || "N/A";
    const batchComment = document.getElementById("batch-comment").value || "N/A";

    const bottomlineComment = document.getElementById("bottomline-comment").value || "N/A";

    // Crear una nueva fila en la tabla
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${new Date().toLocaleString()}</td> <!-- Fecha y hora actuales -->
        <td>Operator</td>
        <td>user@disney.com</td>
        <td>
            Start: ${startTime} - End: ${endTime}<br>
            Signal: ${signalComment}<br>
            Satellite: ${satelliteComment}<br>
            Audio: ${audioComment}<br>
            Batch: ${batchComment}<br>
            Bottomline: ${bottomlineComment}
        </td>
    `;

    // Añadir la nueva fila al cuerpo de la tabla
    logBody.appendChild(newRow);
});

// generar reporte send email
document.getElementById("save-email").addEventListener("click", () => {
    // Comprobar si la opción "Yes" está seleccionada
    const emailYes = document.getElementById("send-email-yes").checked;

    if (emailYes) {
        const logBody = document.getElementById("log-body");

        // Recopilar información para el registro
        const dateTime = new Date().toLocaleString();
        const reportedBy = "Operator"; // Puedes cambiarlo según el usuario activo
        const operator = "Email Sent"; // Estado que refleja el envío del correo
        const description = "Report sent via email successfully."; // Descripción fija o personalizada

        // Crear una nueva fila para la tabla
        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td>${dateTime}</td>
            <td>${reportedBy}</td>
            <td>${operator}</td>
            <td>${description}</td>
        `;

        // Añadir la nueva fila al cuerpo de la tabla
        logBody.appendChild(newRow);

        // Mostrar confirmación (opcional)
        alert("Email sent and logged successfully.");
    } else {
        alert("Please select 'Yes' to send the email.");
    }
});

const successMessage = document.getElementById("email-success");

successMessage.style.display = "block";
setTimeout(() => {
    successMessage.style.display = "none";
}, 3000);