document.addEventListener('DOMContentLoaded', function() {
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQbBpbllHqZEeuZcybobIAwq4EAy4f4YZ2TTkUoUiuxegr5Sqz0juw6cSCAfWpjWSvja2uB56bVFbBu/pubhtml')
        .then(response => response.json())
        .then(data => {
            const orders = data.values.slice(1); // Remove header row
            
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
                const orderDate = new Date(orderData[5]); // Assuming the delivery date is the 6th column
                orderDate.setHours(0, 0, 0, 0);

                if (isSameDate(orderDate, today)) {
                    todayTotals.oreo_quantity += parseInt(orderData[7]);
                    todayTotals.chocolate_quantity += parseInt(orderData[8]);
                    todayTotals.cheesecake_quantity += parseInt(orderData[9]);
                    todayTotals.cinnamon_sugar_quantity += parseInt(orderData[10]);
                    todayTotals.coffee_quantity += parseInt(orderData[11]);
                    todayTotals.carrot_quantity += parseInt(orderData[12]);
                    todayTotals.chai_quantity += parseInt(orderData[13]);
                    todayTotals.totalDonuts += Object.values(orderData.slice(7, 14)).reduce((acc, val) => acc + (parseInt(val) || 0), 0);
                } else if (isSameDate(orderDate, tomorrow)) {
                    tomorrowTotals.oreo_quantity += parseInt(orderData[7]);
                    tomorrowTotals.chocolate_quantity += parseInt(orderData[8]);
                    tomorrowTotals.cheesecake_quantity += parseInt(orderData[9]);
                    tomorrowTotals.cinnamon_sugar_quantity += parseInt(orderData[10]);
                    tomorrowTotals.coffee_quantity += parseInt(orderData[11]);
                    tomorrowTotals.carrot_quantity += parseInt(orderData[12]);
                    tomorrowTotals.chai_quantity += parseInt(orderData[13]);
                    tomorrowTotals.totalDonuts += Object.values(orderData.slice(7, 14)).reduce((acc, val) => acc + (parseInt(val) || 0), 0);
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
});
