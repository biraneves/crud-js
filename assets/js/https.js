function fetchJson(url) {

    return fetch(url).then((resp) => {
        if (resp.ok) {
            return resp.json();
        } else {
            throw new Error(`Error: ${resp.status} - ${resp.statusText}`);
        }
    });

}

function listEmployees() {

    return fetchJson("http://localhost:3000/employees");

}

function listRoles() {

    return fetchJson("http://localhost:3000/roles");

}

// // Cria novo funcionário
// fetch(`http://localhost:3000/employees`, {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify(employee),
// });

// // Atualiza funcionário
// fetch(`http://localhost:3000/employees/${id}`, {
//     method: "PUT",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify(employee),
// });

// // Exclui funcionário
// fetch(`http://localhost:3000/employees/${id}`, {
//     method: "DELETE",
// });