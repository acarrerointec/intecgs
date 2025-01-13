// JavaScript functionality for managing versions and interacting with tables

// Selecting elements
const newVersionButton = document.getElementById('new-version');
const editVersionButton = document.getElementById('edit-version');
const saveButton = document.getElementById('save');
const cancelButton = document.getElementById('cancel');

const programBlocksTable = document.getElementById('program-blocks');
const versionBlocksTable = document.getElementById('version-blocks');

// Event listeners
newVersionButton.addEventListener('click', createNewVersion);
editVersionButton.addEventListener('click', editVersion);
saveButton.addEventListener('click', saveChanges);
cancelButton.addEventListener('click', cancelChanges);

// Functions
function createNewVersion() {
    alert('New version creation initiated. Add your logic here.');
}

function editVersion() {
    alert('Edit version functionality activated. Implement your logic here.');
}

function saveChanges() {
    alert('Changes have been saved. Implement your save logic here.');
}

function cancelChanges() {
    alert('Action cancelled. Revert changes here if needed.');
}

// Example functionality: Highlight selected row in the table
versionBlocksTable.addEventListener('click', (event) => {
    const targetRow = event.target.closest('tr');
    if (targetRow && targetRow.nodeName === 'TR') {
        clearTableSelection(versionBlocksTable);
        targetRow.classList.add('selected');
    }
});

// Clear selection
function clearTableSelection(table) {
    const rows = table.querySelectorAll('tr');
    rows.forEach(row => row.classList.remove('selected'));
}

// Additional functionality can be added as needed.
// Select all delete buttons
const deleteButtons = document.querySelectorAll('.delete-btn');

// Add event listeners to each delete button
deleteButtons.forEach(button => {
  button.addEventListener('click', function () {
    // Find the parent row of the clicked button
    const row = this.closest('tr');
    // Remove the row from the table
    row.remove();
  });
});
