document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('orderForm');
    const orderType = document.getElementById('order_type');
    const personalInfo = document.getElementById('personal_info');
    const pointOfSaleContainer = document.getElementById('point_of_sale_container');
    const pointOfSale = document.getElementById('point_of_sale');
    const paymentInfoTitle = document.getElementById('payment_info_title');
    const paymentInfo = document.getElementById('payment_info');
    const deliveryDate = document.getElementById('delivery_date');

    // Disable Sundays
    deliveryDate.addEventListener('input', function() {
        const selectedDate = new Date(this.value);
        if (selectedDate.getDay() === 0) {
            alert('No se realizan entregas los domingos. Por favor, elija otro día.');
            this.value = '';
        }
    });

    // Ensure date is greater than today
    const today = new Date().toISOString().split('T')[0];
    deliveryDate.setAttribute('min', today);

    orderType.addEventListener('change', function() {
        if (this.value === 'personal') {
            personalInfo.style.display = 'block';
            pointOfSale.innerHTML = `
                <option value="Tipi'Oka Lomas">Tipi'Oka Lomas</option>
                <option value="Vegandra">Vegandra</option>`;
            pointOfSale.previousElementSibling.textContent = "Punto de Recolección";
            paymentInfoTitle.style.display = 'block';
            paymentInfo.style.display = 'block';
        } else if (this.value === 'point_of_sale') {
            personalInfo.style.display = 'none';
            pointOfSale.innerHTML = `
                <option value="Café Cortao">Café Cortao</option>
                <option value="Cafista">Cafista</option>
                <option value="El Plantívoro">El Plantívoro</option>
                <option value="JC La Loma">JC La Loma</option>
                <option value="Karma Healthy Bar">Karma Healthy Bar</option>
                <option value="Latente">Latente</option>
                <option value="Marveda">Marveda</option>
                <option value="Mocao">Mocao</option>
                <option value="Mr. Tofu">Mr. Tofu</option>
                <option value="Tec de Monterrey">Tec de Monterrey</option>
                <option value="The Freezewiz">The Freezewiz</option>
                <option value="Tipi'Oka Centro">Tipi'Oka Centro</option>
                <option value="Tipi'Oka Lomas">Tipi'Oka Lomas</option>
                <option value="UVM">UVM</option>
                <option value="Vegandra">Vegandra</option>
                <option value="Wholejuice">Wholejuice</option>`;
            pointOfSale.previousElementSibling.textContent = "Punto de Venta";
            paymentInfoTitle.style.display = 'none';
            paymentInfo.style.display = 'none';
        }
    });

    orderForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(orderForm);
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
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert('Order submitted successfully');
            window.location.href = 'confirmation.html';
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was a problem with your order submission.');
        });
    });
});
