function Expense(name, date, amount) {
    this.name = name;
    this.date = date;
    this.amount = amount;
    this.add = function() {
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

        let deleteIcon = document.createElement("i");
        deleteIcon.setAttribute("class", "fa fa-trash fa-lg");
        deleteIcon.onclick = handleDelete;
        amount.appendChild(deleteIcon);

        elements.tableBody.appendChild(row);
    };
}

function handleAdd() {
    if (!elements.nameInput.value || !elements.dateInput.value || !elements.amountInput.value) {
        instructions.innerHTML = "Please enter a valid input.";
    } else {
        checkEmpty();
        let expense = new Expense(elements.nameInput.value, elements.dateInput.value, elements.amountInput.value);
        expense.add();
    }
}

function handleDelete(e) {
    let icon = e.target;
    let td = icon.parentElement;
    let tr = td.parentElement;
    tr.remove();
    checkEmpty();
}

function handleClear() {
    let children = elements.tableBody.children;
    while (children.length !== 0) {
        children[0].remove();
    }
    checkEmpty();
}

function checkEmpty() {
    let firstChild = elements.tableBody.firstElementChild;
    if (firstChild) {
        if (firstChild.id === "empty") {
        firstChild.parentElement.removeChild(firstChild);
        }
    } else {
        let row = document.createElement("tr");
        row.setAttribute("id", "empty");
        let td = document.createElement("td");
        td.setAttribute("colspan", "3");
        td.innerHTML = "No expenses added yet";

        row.appendChild(td);
        elements.tableBody.appendChild(row);
    }
}

function resetInputs() {
    elements.nameInput.value = "";
    elements.dateInput.value = "";
    elements.amountInput.value = "";
    instructions.innerHTML = "Add an expense below:";
}

let elements = {
    instructions: document.getElementById("instructions"),
    nameInput: document.getElementById("nameInput"),
    dateInput: document.getElementById("dateInput"),
    amountInput: document.getElementById("amountInput"),
    addButton: document.getElementById("addButton"),
    clearButton: document.getElementById("clearButton"),
    tableBody: document.getElementById("tableBody")
};

let expenses = [];

window.onload = function() {
    elements.addButton.onclick = handleAdd;
    elements.clearButton.onclick = handleClear;
};