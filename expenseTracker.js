function Expense(name, date, amount) {
    this.name = name;
    this.date = date;
    this.amount = amount;
    this.add = function() {
        console.log(this.name);
        console.log(this.date);
        console.log(this.amount);
        let row = document.createElement("tr");

        let name = document.createElement("td");
        name.innerHTML = this.name;
        row.appendChild(name);

        let date = document.createElement("td");
        date.innerHTML = this.date;
        row.appendChild(date);

        let amount = document.createElement("td");
        amount.innerHTML = "$" + this.amount;
        row.appendChild(amount);

        elements.tableBody.appendChild(row);
    };
    this.remove = function() {

    };
}

function handleAdd() {
    if (!elements.nameInput.value || !elements.dateInput.value || !elements.amountInput.value) {
        // error handle
    } else {
        let expense = new Expense(elements.nameInput.value, elements.dateInput.value, elements.amountInput.value);
        expense.add();
    }
}

elements = {
    nameInput: document.getElementById("nameInput"),
    dateInput: document.getElementById("dateInput"),
    amountInput: document.getElementById("amountInput"),
    addButton: document.getElementById("addButton"),
    tableBody: document.getElementById("tableBody")
};

window.onload = function() {
    elements.addButton.onclick = handleAdd;
};