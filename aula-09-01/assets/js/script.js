const ul = document.querySelector("ul");
const input = document.querySelector("input");

async function search(query) {

    if (query) {
        
        const employees = await fetch(`http://localhost:3000/employees?q=${encodeURIComponent(query)}`)
            .then((resp) => resp.json());
        
        ul.innerHTML = employees.map(employee => `<li>${employee.name}</li>`)
            .join("");

    } else {

        ul.innerHTML = "";

    }

}

function onQueryChange() {

    search(input.value);

}

function withDelay(fn, delay) {

    let timeout;

    return function() {

        clearTimeout(timeout);
        timeout = setTimeout(fn, delay);

    }

}

input.addEventListener("input", withDelay(onQueryChange, 500));