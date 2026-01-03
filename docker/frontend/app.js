const input = document.getElementById('new-todo');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// API URL (Relative path, Nginx handles the rest)
const API_URL = '/api/todos';

async function loadTodos() {
    const res = await fetch(API_URL);
    if (res.ok) {
        const todos = await res.json();
        todoList.innerHTML = '';
        todos.forEach(todo => renderTodo(todo));
    }
}

function renderTodo(todo) {
    const li = document.createElement('li');
    li.innerHTML = `${todo.title} <button class="remove-btn" style="color:red;margin-left:10px;">×</button>`;
    li.querySelector('.remove-btn').addEventListener('click', async () => {
        await fetch(`${API_URL}/${todo.id}`, { method: 'DELETE' });
        li.remove();
    });
    todoList.appendChild(li);
}

addBtn.addEventListener('click', async () => {
    const text = input.value.trim();
    if (!text) return;
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: text })
    });
    if (res.ok) {
        const newTodo = await res.json();
        renderTodo(newTodo);
        input.value = '';
    }
});
loadTodos();
