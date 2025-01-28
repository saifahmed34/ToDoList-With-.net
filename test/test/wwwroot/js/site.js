const apiUrl = 'http://localhost:5225/api/todoitems/'; // Replace with your API URL

// Fetch all to-do items
async function fetchTodos() {
    const response = await fetch(apiUrl);
    const todos = await response.json();
 
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = ''; // Clear the list
    todos.forEach(todo => {
       
        todo.isCompleted = todo.isCompleted || false;

        const li = document.createElement('li');
        li.className = `todo-item ${todo.isCompleted ? 'complete' : 'incomplete'}`;
        li.innerHTML = `
            <span>${todo.title}</span>
            <div>
                ${todo.isCompleted ? '' : `
                    <button onclick="toggleComplete(${todo.id}, '${todo.title}', true)">
                        Mark Complete
                    </button>
                `}
                <button onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

// Add a new todo item
document.getElementById('add-todo-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('todo-title').value;
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, isCompleted: false })
    });
    if (response.ok) {
        fetchTodos(); // Refresh the list
        document.getElementById('todo-title').value = ''; // Clear the input
    }
});

// Toggle to-do item completion status
async function toggleComplete(id, title, isCompleted) {
    const payload = {
        id: Number(id),
        title: title,
        isCompleted: isCompleted
    };

    console.log('Payload:', payload); 

    const response = await fetch(`${apiUrl}${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        let updatedTodo =  response.json();
        console.log('Updated Todo:', updatedTodo); // Debugging: Check the updated to-do item
        fetchTodos(); // Refresh the list
    } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
    }
}

// Delete a to-do item
async function deleteTodo(id) {
    const response = await fetch(`${apiUrl}${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        fetchTodos(); // Refresh the list
    }
}

// Load to-do items when the page loads
fetchTodos();