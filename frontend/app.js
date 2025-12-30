const API = "/api/todos";

async function loadTodos() {
  const res = await fetch(API);
  const todos = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";
  todos.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t.title;
    list.appendChild(li);
  });
}

async function addTodo() {
  const title = document.getElementById("todo").value;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });

  loadTodos();
}

loadTodos();

