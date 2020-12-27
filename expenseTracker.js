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
        elements.instructions.innerHTML = "Please enter a valid input.";
    } else {
        checkEmpty();
        removeTotalRow();
        let expense = new Expense(elements.nameInput.value, elements.dateInput.value, elements.amountInput.value);
        expense.add();
        updateTotal();
        elements.nameInput.value = "";
        elements.dateInput.value = "";
        elements.amountInput.value = "";
        elements.instructions.innerHTML = "Add an expense below";
    }
}

function handleDelete(e) {
    let icon = e.target;
    let td = icon.parentElement;
    let tr = td.parentElement;
    tr.remove();
    removeTotalRow();
    checkEmpty();

    if (elements.tableBody.firstElementChild.id !== "empty") {
        console.log("HEre's freedyy!")
        updateTotal();
    }
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

function updateTotal() { // called in handleAdd
    let children = elements.tableBody.children;

    let total = 0;
    for (let i = 0; i < children.length; i++) {
        amount = children[i].lastChild.innerText;
        console.log("total: " + total);
        console.log("amount: " + Number(amount.substring(1)));
        total = total + Number(amount.substring(1));
    }

    let tr = document.createElement("tr");
    tr.setAttribute("id", "total");

    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");

    td1.innerHTML = "Total:";
    td3.innerHTML = "$" + total;
    
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    elements.tableBody.appendChild(tr);
}

function removeTotalRow() {
    let children = elements.tableBody.children;

    if (children.length > 1) {
        console.log("length" + children.length);
        children[children.length - 1].remove(); // remove the old total row
    } else if (children.length === 1) {
        if (children[0].id === "total") {
            children[0].remove();
        }
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