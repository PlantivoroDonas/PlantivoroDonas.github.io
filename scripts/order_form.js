document.getElementById('order_type').addEventListener('change', function(event) {
    const orderType = event.target.value;
    const personalInfo = document.getElementById('personal_info');
    const paymentInfoTitle = document.getElementById('payment_info_title');
    const paymentInfo = document.getElementById('payment_info');
    const pointOfSaleLabel = document.querySelector('#point_of_sale_container label');
    const pointOfSale = document.getElementById('point_of_sale');

    if (orderType === 'personal') {
        personalInfo.style.display = 'block';
        paymentInfoTitle.style.display = 'block';
        paymentInfo.style.display = 'block';
        document.getElementById('full_name').required = true;
        document.getElementById('email').required = true;
        document.getElementById('phone').required = true;
        // Change the label to "Punto de Recolección" and set the options for personal orders
        pointOfSaleLabel.textContent = 'Punto de Recolección:';
        pointOfSale.innerHTML = `
            <option value="Tipi'Oka Lomas">Tipi'Oka Lomas</option>
            <option value="Vegandra">Vegandra</option>
        `;
    } else {
        personalInfo.style.display = 'none';
        paymentInfoTitle.style.display = 'none';
        paymentInfo.style.display = 'none';
        document.getElementById('full_name').required = false;
        document.getElementById('email').required = false;
        document.getElementById('phone').required = false;
        // Change the label to "Punto de Venta" and set all options for point of sale orders
        pointOfSaleLabel.textContent = 'Punto de Venta:';
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
            <option value="Wholejuice">Wholejuice</option>
        `;
    }
});

document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting in the default way

    const inputs = document.querySelectorAll('#orderForm input[type="number"]');
    let sum = 0;
    let formData = {};
    let validOrder = true;

    inputs.forEach(input => {
        const quantity = Number(input.value);
        sum += quantity;
        formData[input.name] = quantity;

        // Check if any quantity is 1, which is not allowed
        if (quantity === 1) {
            validOrder = false;
        }
    });

    if (!validOrder) {
        alert('Pedido mínimo de 2 donas por sabor.');
    } else if (sum < 6) {
        alert('Pedido mínimo de 6 donas.');
    } else {
        const orderType = document.getElementById('order_type').value;

        if (orderType === 'personal') {
            formData.full_name = document.getElementById('full_name').value;
            formData.email = document.getElementById('email').value;
            formData.phone = document.getElementById('phone').value;
        }

        formData.point_of_sale = document.getElementById('point_of_sale').value;
        formData.delivery_date = document.getElementById('delivery_date').value;
        formData.order_type = orderType;

        console.log("Form data to store:", formData);

        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(formData);
        localStorage.setItem('orders', JSON.stringify(orders));

        console.log("Stored orders in local storage:", JSON.parse(localStorage.getItem('orders')));

        alert('¡El pedido ha sido realizado con éxito!');
        // Redirect to confirmation page
        window.location.href = 'confirmation.html';
    }
});

// Ensure date is greater than today
document.addEventListener('DOMContentLoaded', function() {
    const deliveryDateInput = document.getElementById('delivery_date');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0'); // Months start at 0!
    const dd = String(tomorrow.getDate()).padStart(2, '0');

    deliveryDateInput.min = `${yyyy}-${mm}-${dd}`;
});
