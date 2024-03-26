document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    let formData = new FormData(event.target);

    fetch('../server/insert/employee.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // Aquí puedes manejar la respuesta del servidor.
        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});