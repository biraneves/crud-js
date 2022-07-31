// Variáveis globais (!!!)
let employees = [];
let roles = [];

const listElement = document.querySelector("ul");
const formElement = document.querySelector("form");

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

    } catch (error) {

        showError(error);

    }

}

init();