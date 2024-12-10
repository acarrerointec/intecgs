document.addEventListener('DOMContentLoaded', function() {
    const clickableRows = document.querySelectorAll('.clickable-row');
  
    clickableRows.forEach(row => {
      row.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const extraInfoRow = document.querySelector(targetId);
        const icon = this.querySelector('.toggle-icon');
  
        // Alternar la visibilidad de la fila secundaria
        if (extraInfoRow.style.display === "none" || extraInfoRow.style.display === "") {
          extraInfoRow.style.display = "table-row";
          icon.textContent = 'arrow_drop_up'; // Cambia el ícono a flecha hacia arriba
        } else {
          extraInfoRow.style.display = "none";
          icon.textContent = 'arrow_drop_down'; // Cambia el ícono a flecha hacia abajo
        }
      });
    });
  });
  
  