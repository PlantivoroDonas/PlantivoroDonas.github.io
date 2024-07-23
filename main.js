document.getElementById('donutsForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const order = {};
    formData.forEach((value, key) => {
        order[key] = value;
    });
    fetch('https://script.google.com/macros/s/AKfycbyilAVNewaJDlwbLoVd49dZnq_qKCr8gqFvf39CLjT6ewjDuxleRQpW_8Q0eTOCy_4h/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    })
    .then(response => response.json())
    .then(data => {
        alert('Order submitted successfully');
        window.location.href = 'confirmation.html';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
