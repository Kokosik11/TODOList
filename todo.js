let todos = JSON.parse(localStorage.getItem("storedTodos")) || [];

function deleteTodo(id) {
    todos = todos.filter(n => n.id !== id);
    storageData();
}

function createTodo() {
    let todo = document.getElementById("inpText").value;
    if(todo) {
        if(todos.length > 0) {
            todos.push({ id: todos[todos.length-1].id + 1, chacked: false, content: todo  });
        } else {
            todos.push({ id: 0, checked: false, content: todo  });
        }
        storageData();
        document.getElementById("inpText").value = "";
    }
}

function checkboxChange(todoId){
    todos.map(todo => {
        if(todo.id == todoId) {
            todo.checked = !todo.checked;
        }
    })
    localStorage.setItem("storedTodos", JSON.stringify(todos));
    console.log("be checked")
}

function renderTodo() {
    let check = document.getElementById("check");
    check.innerText = "";
    todos.map(todo => {
        let forms = ` 
        <div class="todo-goal-check">
            <input ${(todo.checked)?"checked":""} onchange="checkboxChange(${todo.id})" class="checkbox" type="checkbox" id="check${todo.id}">
            <label class="check-text-l" for="check${todo.id}">
                <span id="todoContent${todo.id}">${todo.content}</span>
            </label>
            <div class="btns">
                <button onclick="deleteTodo(${todo.id})" class="close">X</button>
                <button onclick="editTodo(${todo.id})" class="edit"><i class="fas fa-edit"></i></button>
            </div>
        </div>`;
        check.insertAdjacentHTML("afterbegin", forms);
    })
}

function storageData() {
    renderTodo();
    localStorage.setItem("storedTodos", JSON.stringify(todos));
}

const todo = document.getElementById("todo");

todo.addEventListener("onload", renderTodo());

window.onload = () => {
    renderTodo();
}

const input = document.getElementById("inpText");

function onKeyPress(event) {
    if(event.key == "Enter") {
        createTodo();
    }
}

input.addEventListener("focus", () => {
    console.log("focus");
    document.addEventListener("keydown" , onKeyPress);
})

input.addEventListener("blur", () => {
    console.log("blur")
    document.removeEventListener("keydown", onKeyPress);
})

function editTodo(id) {
    const content = document.getElementById("todoContent"+id);
    content.innerHTML = `
    <div>
        <input id="inp${id}" class="content-input" type="text" placeholder="Enter text..."></input>
        <button onclick="saveEdit(${id})" class="done"><i class="fas fa-check"></i></button>
        <button onclick="closeEdit(${id})" class="cancel"><i class="fas fa-ban"></i></button>
    </div>
    `;
}

function saveEdit(id) {
    const input = document.getElementById("inp"+id);

    if(input.value != "") {
        todos[id].content = input.value;
        storageData();
    }
}

function closeEdit(id) {
    const content = document.getElementById("todoContent"+id);
    content.innerHTML = todos[id].content;
}