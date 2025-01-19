let logCounter = 1;

document.getElementById('save-button').addEventListener('click', function() {
            
            // Capturando los valores de los inputs
            const coordinador = document.getElementById('coordinador').value;
            const operador = document.getElementById('operador').value;
            const motivo = document.getElementById('motivo').value;
            const horaAprox = document.getElementById('hora-aproximada').value;
            const comentarios = document.querySelector('textarea[name="comentarios"]').value;

            
                    // Obtener la hora actual
                    const now = new Date();
                    const formattedDate = now.toLocaleDateString();
                    const formattedTime = now.toLocaleTimeString();

        
            // Verificar que todos los campos estén completos
            if (coordinador && operador && motivo && horaAprox && comentarios) {
                // Crear una nueva fila
                const tableBody = document.getElementById('log-body');

                const newRow = tableBody.insertRow();  // Crea una nueva fila
                
                // Agregar las celdas con la información
                const currentDate = new Date();
            
                newRow.insertCell(0).textContent = currentDate; // Fecha actual
                
                newRow.insertCell(1).textContent = 'user@diney.com';   // Operador
                
                newRow.insertCell(2).textContent = `
                    Time: ${horaAprox},
                    Reason: ${motivo}, 
                    Coordinator: ${coordinador},
                    Operator: ${operador}
        `;          logCounter++;


       
                // Limpiar los campos de entrada después de guardar los datos
                document.getElementById('coordinador').value = '';
                document.getElementById('operador').value = '';
                document.getElementById('motivo').value = '';
                document.getElementById('hora-aproximada').value = '';
                document.querySelector('textarea[name="comentarios"]').value = '';
                
            } else {
                alert("Por favor, complete todos los campos antes de guardar.");
            }
        });
       