async function loadTodos() {
  const res = await fetch("/api/todos");
  const todos = await res.json();

  const list = document.getElementById("todos");
  list.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.textContent = todo.title;

    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = () => deleteTodo(todo.id);

    li.appendChild(btn);
    list.appendChild(li);
  });
}

async function addTodo() {
  const input = document.getElementById("task");

  if (!input.value) return;

  await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: input.value })
  });

  input.value = "";
  loadTodos();
}

async function deleteTodo(id) {
  await fetch(`/api/todos/${id}`, { method: "DELETE" });
  loadTodos();
}

loadTodos();
