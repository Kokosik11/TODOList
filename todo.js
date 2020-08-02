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
                <span>${todo.content}</span>
            </label>
            <button onclick="deleteTodo(${todo.id})" class="close">X</button> 
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