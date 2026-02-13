if (document.getElementById("expenseForm")) {
  document.getElementById("expenseForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let amount = parseFloat(document.getElementById("amount").value);
    let category = document.getElementById("category").value;
    let description = document.getElementById("description").value;

    if (isNaN(amount) || amount <= 0 || category.trim() === "") {
      alert("Please enter valid expense details");
      return;
    }

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push({ amount, category, description, date: new Date().toLocaleDateString() });
    localStorage.setItem("expenses", JSON.stringify(expenses));

    alert("Expense added successfully!");
    document.getElementById("expenseForm").reset();
  });
}

if (document.getElementById("expenseList")) {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let list = document.getElementById("expenseList");
  let total = 0;

  expenses.forEach(exp => {
    let li = document.createElement("li");
    li.textContent = `${exp.date} - ${exp.category}: $${exp.amount} (${exp.description})`;
    list.appendChild(li);
    total += exp.amount;
  });

  document.getElementById("total").textContent = `Total: $${total.toFixed(2)}`;
}

if (document.getElementById("report")) {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let totals = {};

  expenses.forEach(exp => {
    totals[exp.category] = (totals[exp.category] || 0) + exp.amount;
  });

  let reportDiv = document.getElementById("report");
  for (let category in totals) {
    let p = document.createElement("p");
    p.textContent = `${category}: $${totals[category].toFixed(2)}`;
    reportDiv.appendChild(p);
  }
}
