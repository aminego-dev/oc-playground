const BACKEND_URL = "http://todo-backend-demo.apps-crc.testing";

async function loadTodos() {
    const list = document.getElementById("todos");
    list.innerHTML = "";

    try {
        const res = await fetch(`${BACKEND_URL}/todos`);
        const todos = await res.json();

        todos.forEach(todo => {
            const li = document.createElement("li");
            li.textContent = todo.title + " ";

            const del = document.createElement("button");
            del.textContent = "❌";
            del.onclick = () => deleteTodo(todo.id);

            li.appendChild(del);
            list.appendChild(li);
        });
    } catch (e) {
        list.innerHTML = "<li>Backend not reachable</li>";
    }
}

async function addTodo() {
    const input = document.getElementById("newTodo");
    const title = input.value.trim();
    if (!title) return;

    await fetch(`${BACKEND_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
    });

    input.value = "";
    loadTodos();
}

async function deleteTodo(id) {
    await fetch(`${BACKEND_URL}/todos/${id}`, {
        method: "DELETE"
    });
    loadTodos();
}

loadTodos();

