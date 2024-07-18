// scripts/display_orders.js

document.addEventListener('DOMContentLoaded', function() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    function isSameDate(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    }

    function formatDate(date) {
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    document.getElementById('todayHeader').textContent = `Hoy ${formatDate(today)}`;
    document.getElementById('tomorrowHeader').textContent = `Mañana ${formatDate(tomorrow)}`;

    const todayTotals = { oreo_quantity: 0, chocolate_quantity: 0, cheesecake_quantity: 0, cinnamon_sugar_quantity: 0, coffee_quantity: 0, carrot_quantity: 0, chai_quantity: 0, totalDonuts: 0 };
    const tomorrowTotals = { oreo_quantity: 0, chocolate_quantity: 0, cheesecake_quantity: 0, cinnamon_sugar_quantity: 0, coffee_quantity: 0, carrot_quantity: 0, chai_quantity: 0, totalDonuts: 0 };

    orders.forEach(orderData => {
        const orderDate = new Date(orderData.delivery_date);
        orderDate.setHours(0, 0, 0, 0);

        if (isSameDate(orderDate, today)) {
            todayTotals.oreo_quantity += parseInt(orderData.oreo_quantity);
            todayTotals.chocolate_quantity += parseInt(orderData.chocolate_quantity);
            todayTotals.cheesecake_quantity += parseInt(orderData.cheesecake_quantity);
            todayTotals.cinnamon_sugar_quantity += parseInt(orderData.cinnamon_sugar_quantity);
            todayTotals.coffee_quantity += parseInt(orderData.coffee_quantity);
            todayTotals.carrot_quantity += parseInt(orderData.carrot_quantity);
            todayTotals.chai_quantity += parseInt(orderData.chai_quantity);
            todayTotals.totalDonuts += Object.values(orderData).reduce((acc, val) => acc + (parseInt(val) || 0), 0);
        } else if (isSameDate(orderDate, tomorrow)) {
            tomorrowTotals.oreo_quantity += parseInt(orderData.oreo_quantity);
            tomorrowTotals.chocolate_quantity += parseInt(orderData.chocolate_quantity);
            tomorrowTotals.cheesecake_quantity += parseInt(orderData.cheesecake_quantity);
            tomorrowTotals.cinnamon_sugar_quantity += parseInt(orderData.cinnamon_sugar_quantity);
            tomorrowTotals.coffee_quantity += parseInt(orderData.coffee_quantity);
            tomorrowTotals.carrot_quantity += parseInt(orderData.carrot_quantity);
            tomorrowTotals.chai_quantity += parseInt(orderData.chai_quantity);
            tomorrowTotals.totalDonuts += Object.values(orderData).reduce((acc, val) => acc + (parseInt(val) || 0), 0);
        }
    });

    const todayRow = document.getElementById('todayRow');
    const tomorrowRow = document.getElementById('tomorrowRow');

    todayRow.innerHTML = `<td>Hoy ${formatDate(today)}</td>
                          <td>${todayTotals.oreo_quantity}</td>
                          <td>${todayTotals.chocolate_quantity}</td>
                          <td>${todayTotals.cheesecake_quantity}</td>
                          <td>${todayTotals.cinnamon_sugar_quantity}</td>
                          <td>${todayTotals.coffee_quantity}</td>
                          <td>${todayTotals.carrot_quantity}</td>
                          <td>${todayTotals.chai_quantity}</td>
                          <td>${todayTotals.totalDonuts}</td>`;

    tomorrowRow.innerHTML = `<td>Mañana ${formatDate(tomorrow)}</td>
                             <td>${tomorrowTotals.oreo_quantity}</td>
                             <td>${tomorrowTotals.chocolate_quantity}</td>
                             <td>${tomorrowTotals.cheesecake_quantity}</td>
                             <td>${tomorrowTotals.cinnamon_sugar_quantity}</td>
                             <td>${tomorrowTotals.coffee_quantity}</td>
                             <td>${tomorrowTotals.carrot_quantity}</td>
                             <td>${tomorrowTotals.chai_quantity}</td>
                             <td>${tomorrowTotals.totalDonuts}</td>`;
});

