// Variáveis globais (!!!)
let employees = [];
let roles = [];
let selectedItem;

const listElement = document.querySelector("ul");
const formElement = document.querySelector("form");

const buttonDelete = document.getElementById("bDelete");
const buttonCancel = document.getElementById("bCancel");
const buttonCreate = document.getElementById("bSubmit");

function selectItem(employee, element) {

    clearSelection();
    selectedItem = employee;
    element.classList.add("selected");

    formElement.name.value = employee.name;
    formElement.salary.valueAsNumber = employee.salary;
    formElement.role_id.value = employee.role_id;

    buttonDelete.style.display = "inline";
    buttonCancel.style.display = "inline";

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

}

function renderData() {

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

function showError(error) {

    document.getElementById("errors").textContent = "Erro ao carregar dados.";
    console.log(error);

}

async function init() {

    try {

        [employees, roles] = await Promise.all([
            listEmployees(),
            listRoles(),
        ]);

        renderData();
        buttonCancel.addEventListener("click", clearSelection);

    } catch (error) {

        showError(error);

    }

}

init();