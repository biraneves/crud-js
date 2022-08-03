const baseUrl = "http://localhost:3000";

function fetchJson(url, options) {

    return fetch(url, options).then((resp) => {
        if (resp.ok) {
            return resp.json();
        } else {
            throw new Error(`Error: ${resp.status} - ${resp.statusText}`);
        }
    }).catch(error => {

        showError("Error loading data.", error);
        throw error;

    });

}

function listEmployees() {

    return fetchJson(`${baseUrl}/employees`);

}

function listRoles() {

    return fetchJson(`${baseUrl}/roles`);

}

function updateEmployee(id, employee) {

    return fetchJson(`${baseUrl}/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
    });

}

function createEmployee(employee) {

    return fetchJson(`${baseUrl}/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
    });

}

function deleteEmployee(id) {

    return fetchJson(`${baseUrl}/employees/${id}`, {
        method: "DELETE"
    });

}