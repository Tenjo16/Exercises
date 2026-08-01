let todos = [];

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const taskText = todoInput.value;
    if (taskText !== "") {
        const newTodo = { text: taskText, completed: false };
        todos.push(newTodo);
        todoInput.value = "";
        render();
    }
});

function render() {
    todoList.innerHTML = "";
    const fragment = document.createDocumentFragment();
    todos.forEach(function (todo, index) {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        const span = document.createElement('span');
        span.textContent = todo.text;

        li.setAttribute('data-item-index', index);
        li.appendChild(checkbox);
        li.appendChild(span);

        fragment.appendChild(li);

    });
    todoList.appendChild(fragment);
}
todoList.addEventListener('click', function (event) {
    if (event.target.type == "checkbox") {
        const li = event.target.closest('li');
        const index = li.getAttribute("data-item-index");
        todos.splice(index, 1);
        render();
    }
});
render();