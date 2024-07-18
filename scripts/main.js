// scripts/main.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('donutsForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const order = {};
        formData.forEach((value, key) => {
            order[key] = value;
        });

        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        window.location.href = 'confirmation.html';
    });
});

