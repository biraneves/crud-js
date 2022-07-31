function fetchJson(url) {

    return fetch(url).then((resp) => {
        if (resp.ok) {
            return resp.json();
        } else {
            throw new Error(`Error: ${resp.status} - ${resp.statusText}`);
        }
    });

}

function renderTable(employees, roles) {

    let rows = employees.map((employee) => {
        let role = roles.find((role) => role.id == employee.role_id);
        return `<tr>
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${role.name}</td>
        </tr>`;
    });

    return `<table>${rows.join('')}</table>`;

}

function showError(error) {

    document.getElementById("app").innerHTML = "Erro ao carregar dados.";
    console.log(error);

}

async function init() {

    try {

        let [employees, roles] = await Promise.all([
            fetchJson("http://localhost:3000/employees"),
            fetchJson("http://localhost:3000/roles")
        ]);

        let table = renderTable(employees, roles);

        document.getElementById("app").innerHTML = table;

    } catch (error) {

        showError(error);

    }

}

init();