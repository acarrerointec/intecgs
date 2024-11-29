document.getElementById('applyButton').addEventListener('click', function() {
            // Obtener la opción seleccionada
            const selectedOption = document.getElementById('options').value;

            // Verificar si la opción seleccionada es 'Broadcast Coordinator'
            if (selectedOption === 'Broadcast Operator') {
                // Redirigir a la página especificada
                window.location.href = '/report/report2/report2.html';
            } else {
                // Mostrar la opción seleccionada en el div para otras opciones
                document.getElementById('selectedOption').textContent = 'Selected: ' + selectedOption;
            }
            if (selectedOption ==='Broadcast Coordinator'){
                // Redirigir a la página especificada
                window.location.href = '/report/report2/report1.html';
            }
            else {
                // Mostrar la opción seleccionada en el div para otras opciones
                document.getElementById('selectedOption').textContent = 'Selected: ' + selectedOption;
            }
            if (selectedOption ==='Anticipado'){
                // Redirigir a la página especificada
                window.location.href = '/report/report2/anticipado/anticipado.html';
            }
            else {
                // Mostrar la opción seleccionada en el div para otras opciones
                document.getElementById('selectedOption').textContent = 'Selected: ' + selectedOption;
            }
            if (selectedOption ==='Artistic'){
                // Redirigir a la página especificada
                window.location.href = '/report/report2/artistica/artistic.html';
            }
            else {
                // Mostrar la opción seleccionada en el div para otras opciones
                document.getElementById('selectedOption').textContent = 'Selected: ' + selectedOption;
            }
            
        });