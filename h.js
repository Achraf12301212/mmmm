document.getElementById('transaction-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    updateSummary(amount, type);
    addNotification(description, amount, type);
    provideCoaching(amount, type);

    this.reset();
});

let totalIncome = 0;
let totalExpenses = 0;

function updateSummary(amount, type) {
    if (type === 'income') {
        totalIncome += amount;
    } else {
        totalExpenses += amount;
    }

    const savings = totalIncome - totalExpenses;

    document.getElementById('income').textContent = `${totalIncome.toFixed(2)} €`;
    document.getElementById('expenses').textContent = `${totalExpenses.toFixed(2)} €`;
    document.getElementById('savings').textContent = `${savings.toFixed(2)} €`;
}

function addNotification(description, amount, type) {
    const notifications = document.getElementById('notifications');
    const message = type === 'income'
        ? `Nouveau revenu ajouté : ${description} (+${amount} €)`
        : `Nouvelle dépense ajoutée : ${description} (-${amount} €)`;
    const notification = document.createElement('p');
    notification.textContent = message;
    notifications.appendChild(notification);
}

function provideCoaching(amount, type) {
    const coachMessage = document.getElementById('coach-message');
    if (type === 'expense' && amount > 100) {
        coachMessage.textContent = `Attention ! Cette dépense de ${amount} € est élevée. Pensez à réduire vos frais inutiles.`;
    } else if (type === 'income') {
        coachMessage.textContent = `Super ! Avec ce revenu de ${amount} €, envisagez d'épargner 20% pour vos objectifs.`;
    } else {
        coachMessage.textContent = `Continuez à suivre vos dépenses pour optimiser votre budget !`;
    }
}