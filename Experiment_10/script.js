const apiUrl = 'https://jsonplaceholder.typicode.com/users';
const table = document.getElementById('dataTable');
const tableBody = document.getElementById('tableBody');
const statusMsg = document.getElementById('statusMsg');

function renderTable(users) {
    tableBody.innerHTML = '';
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.address.city}</td>
        `;
        tableBody.appendChild(row);
    });
    statusMsg.style.display = 'none';
    table.style.display = 'table';
}

function loadUsingFetch() {
    table.style.display = 'none';
    statusMsg.style.display = 'block';
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => renderTable(data.slice(0, 5))) 
        .catch(error => {
            statusMsg.innerText = 'Error fetching data.';
            console.error(error);
        });
}

$('#jqBtn').click(function() {
    $('#dataTable').hide();
    $('#statusMsg').text('Loading data...').show();

    $.getJSON(apiUrl, function(data) {
        renderTable(data.slice(5, 10)); 
    }).fail(function() {
        $('#statusMsg').text('Error fetching data.');
    });
});