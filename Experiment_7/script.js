function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const taskList = document.getElementById("taskList");

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.className = "task-text";
    span.innerText = taskText;

    const actionsDiv = document.createElement("div");

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.className = "btn-edit";
    editBtn.onclick = function() {
        const parentLi = this.parentElement.parentElement;
        const currentText = parentLi.querySelector(".task-text").innerText;
        const newText = prompt("Edit task:", currentText);
        
        if (newText !== null && newText.trim() !== "") {
            parentLi.querySelector(".task-text").innerText = newText.trim();
        }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "btn-delete";
    deleteBtn.onclick = function() {
        const parentLi = this.parentElement.parentElement;
        parentLi.parentElement.removeChild(parentLi);
    };

    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actionsDiv);

    taskList.appendChild(li);

    taskInput.value = "";
}