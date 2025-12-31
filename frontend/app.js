const input = document.getElementById('new-todo');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// API URL (Relative path, so Nginx proxies it correctly)
const API_URL = '/api/todos';

// 1. LOAD: Fetch todos from server when page loads
async function loadTodos() {
    const res = await fetch(API_URL);
    const todos = await res.json();
    todoList.innerHTML = ''; // Clear list
    todos.forEach(todo => renderTodo(todo));
}

// 2. RENDER: specific function to draw one item
function renderTodo(todo) {
    const li = document.createElement('li');
    li.innerHTML = `${todo.title} <button class="remove-btn">×</button>`;
    
    // Handle Delete
    const removeBtn = li.querySelector('.remove-btn');
    removeBtn.addEventListener('click', async () => {
        await fetch(`${API_URL}/${todo.id}`, { method: 'DELETE' });
        li.remove();
    });

    todoList.appendChild(li);
}

// 3. CREATE: Send new todo to server
addBtn.addEventListener('click', async () => {
    const text = input.value.trim();
    if (!text) return;

    // Send to Backend
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: text })
    });

    if (res.ok) {
        const newTodo = await res.json();
        renderTodo(newTodo); // Update UI with the *real* item from DB
        input.value = '';
    }
});

// Start the app
loadTodos();
