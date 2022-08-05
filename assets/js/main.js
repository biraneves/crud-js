// Variáveis globais (!!!)
let employees = [];
let roles = [];
let selectedItem;

const listElement = document.querySelector("ul");
const formElement = document.querySelector("form");

const buttonDelete = document.getElementById("bDelete");
const buttonCancel = document.getElementById("bCancel");
const buttonCreate = document.getElementById("bSubmit");

const errorDiv = document.getElementById("errors");

function selectItem(employee, element) {

    clearSelection();
    selectedItem = employee;
    element.classList.add("selected");

    formElement.name.value = employee.name;
    formElement.salary.valueAsNumber = employee.salary;
    formElement.role_id.value = employee.role_id;

    buttonDelete.style.display = "inline";
    buttonCancel.style.display = "inline";
    buttonCreate.textContent = "Update";

}

function clearSelection() {

    selectedItem = undefined;

    let elements = listElement.querySelectorAll(".selected");

    if (elements.length > 0)
        elements.forEach((element) => element.classList.remove("selected"));

    formElement.name.value = "";
    formElement.salary.value = "";
    formElement.role_id.value = "";

    buttonDelete.style.display = "none";
    buttonCancel.style.display = "none";
    buttonCreate.textContent = "Create";

    clearError();

}

function renderData() {

    listElement.innerHTML = "";

    for (const employee of employees) {

        let role = roles.find((role) => role.id == employee.role_id);

        const li = document.createElement("li");

        const divName = document.createElement("div");
        divName.textContent = employee.name;

        const divRole = document.createElement("div");
        divRole.textContent = role.name;

        li.appendChild(divName);
        li.appendChild(divRole);

        listElement.appendChild(li);

        li.addEventListener("click", () => selectItem(employee, li));

    }

}

function renderRoles() {
    for (const role of roles) {

        const option = document.createElement("option");
        option.textContent = role.name;
        option.value = role.id;

        formElement.role_id.appendChild(option);

    }
}

function showError(message, error) {

    document.getElementById("errors").textContent = message;
    errorDiv.classList.add("show");

    if (error) {

        console.log(error);

    }

}

function clearError() {

    document.getElementById("errors").textContent = "";
    errorDiv.classList.remove("show");

}

async function onSubmit(evt) {

    evt.preventDefault();

    const employeeData = {
        name: formElement.name.value,
        salary: formElement.salary.valueAsNumber,
        role_id: +formElement.role_id.value
    };

    if (!employeeData.name || !employeeData.salary || !employeeData.role_id) {

        showError("All form fields must be filled.");

    } else {

        if (selectedItem) {
            
            const updatedItem = await updateEmployee(selectedItem.id, employeeData);
            const i = employees.indexOf(selectedItem);
            employees[i] = updatedItem;
            renderData();
        
            selectItem(updatedItem, listElement.children[i]);
    
        } else {
    
            const createdItem = await createEmployee(employeeData);
            employees.push(createdItem);
            renderData();
            selectItem(createdItem, listElement.lastChild);
            listElement.lastChild.scrollIntoView();
    
        }

    }

}

async function onDelete() {

    if (selectedItem) {

        await deleteEmployee(selectedItem.id);
        
        const i = employees.indexOf(selectedItem);
        employees.splice(i, 1);

        renderData();
        clearSelection();

    }

}

async function init() {

    [employees, roles] = await Promise.all([
        listEmployees(),
        listRoles(),
    ]);

    renderRoles();
    renderData();
    clearSelection();

    buttonCancel.addEventListener("click", clearSelection);
    buttonDelete.addEventListener("click", onDelete);
    formElement.addEventListener("submit", onSubmit);

}

init();