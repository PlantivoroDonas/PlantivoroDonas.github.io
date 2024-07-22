document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('orderForm');
    const orderType = document.getElementById('order_type');
    const personalInfo = document.getElementById('personal_info');
    const pointOfSaleContainer = document.getElementById('point_of_sale_container');
    const pointOfSale = document.getElementById('point_of_sale');
    const paymentInfoTitle = document.getElementById('payment_info_title');
    const paymentInfo = document.getElementById('payment_info');

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
        fetch('YOUR_SCRIPT_URL', {
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
});
