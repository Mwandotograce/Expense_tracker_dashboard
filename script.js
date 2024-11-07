const ctxTotal = document.getElementById('totalExpensesChart').getContext('2d');
const ctxCategory = document.getElementById('categoryChart').getContext('2d');

// Sample data
let totalExpensesData = [200, 300, 400, 500];
let transactions = [];
const categories = {
    Food: 0,
    Utilities: 0,
    'Internet & WiFi': 0,
    Groceries: 0,
    'Dining Out/Entertainment': 0,
    Savings: 0
};

// Total Expenses Chart
const totalExpensesChart = new Chart(ctxTotal, {
    type: 'line',
    data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
            label: 'Total Expenses',
            data: totalExpensesData,
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
        }]
    },
});

// Category Chart
const categoryChart = new Chart(ctxCategory, {
    type: 'pie',
    data: {
        labels: Object.keys(categories),
        datasets: [{
            label: 'Expenses by Category',
            data: Object.values(categories),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40', '#9966FF'],
        }]
    },
});

// Function to update charts
function updateCharts() {
    totalExpensesChart.data.datasets[0].data = totalExpensesData;
    totalExpensesChart.update();

    categoryChart.data.datasets[0].data = Object.values(categories);
    categoryChart.update();
}

// Function to add a new expense
document.getElementById('addExpenseButton').addEventListener('click', function() {
    const expenseName = document.getElementById('expenseName').value;
    const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);

    if (expenseName && !isNaN(expenseAmount) && expenseAmount > 0) {
        // Add to transactions
        transactions.push(`${expenseName}: $${expenseAmount.toFixed(2)}`);
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.appendChild(document.createTextNode(`${expenseName}: $${expenseAmount.toFixed(2)}`));
        document.getElementById('transactionList').appendChild(li);

        // Update total expenses
        totalExpensesData[totalExpensesData.length - 1] += expenseAmount; // Update last week

        // Update category based on expense name
        if (categories[expenseName] !== undefined) {
            categories[expenseName] += expenseAmount;
        } else {
            alert('Please enter a valid category: Food, Utilities, Internet & WiFi, Groceries, Dining Out/Entertainment, or Savings.');
        }

        // Update charts
        updateCharts();

        // Clear input fields
        document.getElementById('expenseName').value = '';
        document.getElementById('expenseAmount').value = '';
    } else {
        alert('Please enter a valid expense name and amount.');
    }
});