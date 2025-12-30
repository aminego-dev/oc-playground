const input = document.getElementById('new-todo');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;

    const li = document.createElement('li');
    li.innerHTML = `${text} <button class="remove-btn">×</button>`;
    
    const removeBtn = li.querySelector('.remove-btn');
    removeBtn.addEventListener('click', () => li.remove());

    todoList.appendChild(li);
    input.value = '';
});

