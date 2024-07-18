document.addEventListener('DOMContentLoaded', function() {
    const orders = JSON.parse(localStorage.getItem('orders'));
    
    // Define the flavors array globally
    const flavors = ['oreo_quantity', 'chocolate_quantity', 'cheesecake_quantity', 'cinnamon_sugar_quantity', 'coffee_quantity', 'carrot_quantity', 'chai_quantity'];

    // Function to check if two dates are the same
    function isSameDate(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    }

    // Function to format the date as "MMM DD"
    function formatDate(date) {
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    }

    if (orders) {
        // Get today's and tomorrow's dates
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        console.log('Today:', today);
        console.log('Tomorrow:', tomorrow);

        // Update the summary table headers
        document.getElementById('todayHeader').textContent = `Hoy ${formatDate(today)}`;
        document.getElementById('tomorrowHeader').textContent = `Mañana ${formatDate(tomorrow)}`;

        // Initialize totals for today and tomorrow
        const todayTotals = {
            oreo_quantity: 0,
            chocolate_quantity: 0,
            cheesecake_quantity: 0,
            cinnamon_sugar_quantity: 0,
            coffee_quantity: 0,
            carrot_quantity: 0,
            chai_quantity: 0,
            totalDonuts: 0
        };

        const tomorrowTotals = {
            oreo_quantity: 0,
            chocolate_quantity: 0,
            cheesecake_quantity: 0,
            cinnamon_sugar_quantity: 0,
            coffee_quantity: 0,
            carrot_quantity: 0,
            chai_quantity: 0,
            totalDonuts: 0
        };

        // Sort orders by delivery date in ascending order
        orders.sort((a, b) => new Date(a.delivery_date) - new Date(b.delivery_date));

        const tableBody = document.querySelector('#orderTable tbody');

        console.log("Retrieved and sorted orders from local storage:", orders); // For debugging

        orders.forEach(orderData => {
            const orderDateUTC = new Date(orderData.delivery_date);
            const orderDate = new Date(orderDateUTC.getFullYear(), orderDateUTC.getMonth(), orderDateUTC.getDate());
            orderDate.setHours(0, 0, 0, 0);
            orderDate.setDate(orderDate.getDate() + 1);

            console.log('Order Date:', orderDate);

            const row = document.createElement('tr');

            // Highlight today's orders
            if (isSameDate(orderDate, today)) {
                row.classList.add('highlight');
            }

            // Add delivery date
            const deliveryDateCell = document.createElement('td');
            deliveryDateCell.textContent = orderData.delivery_date;
            row.appendChild(deliveryDateCell);

            // Add order type
            const orderTypeCell = document.createElement('td');
            orderTypeCell.textContent = orderData.order_type === 'personal' ? 'Personal' : 'Punto de Venta';
            row.appendChild(orderTypeCell);

            // Add personal info if order type is personal, otherwise leave cells empty
            const fullNameCell = document.createElement('td');
            const emailCell = document.createElement('td');
            const phoneCell = document.createElement('td');

            if (orderData.order_type === 'personal') {
                fullNameCell.textContent = orderData.full_name || '';
                emailCell.textContent = orderData.email || '';
                phoneCell.textContent = orderData.phone || '';
            } else {
                fullNameCell.textContent = '';
                emailCell.textContent = '';
                phoneCell.textContent = '';
            }

            row.appendChild(fullNameCell);
            row.appendChild(emailCell);
            row.appendChild(phoneCell);

            // Add point of sale or collection point
            const pointOfSaleCell = document.createElement('td');
            pointOfSaleCell.textContent = orderData.order_type === 'personal' ? 'Punto de Recolección' : orderData.point_of_sale;
            row.appendChild(pointOfSaleCell);

            // Add each flavor quantity, skip if the quantity is 0
            let totalDonuts = 0;
            flavors.forEach(flavor => {
                const flavorCell = document.createElement('td');
                const quantity = parseInt(orderData[flavor], 10); // Parse the quantity to remove leading zeros
                flavorCell.textContent = quantity > 0 ? quantity : '';
                row.appendChild(flavorCell);
                totalDonuts += quantity;

                // Add to today's or tomorrow's totals
                if (isSameDate(orderDate, today)) {
                    console.log('Adding to today totals:', orderDate);
                    todayTotals[flavor] += quantity;
                    todayTotals.totalDonuts += quantity;
                } else if (isSameDate(orderDate, tomorrow)) {
                    console.log('Adding to tomorrow totals:', orderDate);
                    tomorrowTotals[flavor] += quantity;
                    tomorrowTotals.totalDonuts += quantity;
                }
            });

            // Add total donuts
            const totalDonutsCell = document.createElement('td');
            totalDonutsCell.textContent = totalDonuts;
            row.appendChild(totalDonutsCell);

            tableBody.appendChild(row);
        });

        // Populate summary table for today and tomorrow
        const todayRow = document.getElementById('todayRow');
        const tomorrowRow = document.getElementById('tomorrowRow');

        flavors.forEach(flavor => {
            const todayCell = document.createElement('td');
            todayCell.textContent = todayTotals[flavor] || 0;
            todayRow.appendChild(todayCell);

            const tomorrowCell = document.createElement('td');
            tomorrowCell.textContent = tomorrowTotals[flavor] || 0;
            tomorrowRow.appendChild(tomorrowCell);
        });

        // Add total donuts cells
        const todayTotalCell = document.createElement('td');
        todayTotalCell.textContent = todayTotals.totalDonuts || 0;
        todayRow.appendChild(todayTotalCell);

        const tomorrowTotalCell = document.createElement('td');
        tomorrowTotalCell.textContent = tomorrowTotals.totalDonuts || 0;
        tomorrowRow.appendChild(tomorrowTotalCell);
    } else {
        console.log("No orders found in local storage."); // For debugging
    }
});
